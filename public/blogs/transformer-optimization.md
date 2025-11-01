## A Hitchhiker’s Guide to Training Deep Learning Models

Hellooo, so this is my first blog, I wanted to make this on some of the optimizations that I came across mainly via unsloth, and from my experience of pretraining/finetuning big models in a GPU poor environment.

This blog will not have a definite structure, each optimisation can be applied independently and sequentially as well


## Index
    - `LoRA`
    - `Gradient Checkpointing`
    - `Cut Cross Entropy` (WIP)
    - `FSDP` (WIP)


### LoRA (Low Rank Adapters):

**Intuition:**

In this day and age, where models are humongous in billions and trillions of parameters, Full Finetuning is not considered Ideal. Thus, came LoRA this technique changes the finetuning process very simply.

The intuiton behind this technique is quite simple and easy to understand.

When finetuning our job is to find the `ΔW` matrix.

```bash
W_updated = W + ΔW
```

Now ideally if the number of params of W is around 7B, then when we are finetuning `ΔW` is also of similar magnitude.
Now here comes LoRA, what we propose is to decompose the original `W` matrice into two low rank matrices `A` and `B`,  

```bash
W_updated = W + ΔW = W + A.B
```

The amount of parameters being updated previously were let us assume W being 20,000 x 80,000, were 16 * 10^8 and post LoRA
with r, it comes down to 20,000 * r + 80,000 * r, now as we can see the the number of parameters being updated has come down a lot, which brings down the VRAM consumption by a lot.

**Implementation (taken for @rasbt github) for LLMs:**

```python
class LoRALayer(torch.nn.Module):
    def __init__(self, in_dim, out_dim, rank, alpha):
        super().__init__()
        std_dev = 1 / torch.sqrt(torch.tensor(rank).float())
        self.A = torch.nn.Parameter(torch.randn(in_dim, rank) * std_dev)
        self.B = torch.nn.Parameter(torch.zeros(rank, out_dim))
        self.alpha = alpha

    def forward(self, x):
        x = self.alpha * (x @ self.A @ self.B)
        return x
```

Example for nn.Linear()
```python
class LinearWithLoRA(torch.nn.Module):
    def __init__(self, linear, rank, alpha):
        super().__init__()
        self.linear = linear
        self.lora = LoRALayer(
            linear.in_features, linear.out_features, rank, alpha
        )

    def forward(self, x):
        return self.linear(x) + self.lora(x)
```

In the benchmarking below, we use the `peft` module.

**Benchmarking against FFT with different ranks for Qwen2.5-1.5B Instruct with `bfloat16`:**

Alpha here is taken with (α = 2 * r)

| Model          | Params (≈) | FFT | LoRA rank 4 | LoRA rank 8 | LoRA rank 16 | LoRA rank 32 |
| :------------- | ---------: | --------------------: | ----------: | ----------: | -----------: | -----------: |
| **Qwen2.5-1.5B** |      1.5 B |           **20.31 GB** | **9.68 GB** | **9.78 GB** |  **9.93 GB** | **9.98 GB** |
| **Qwen2.5-7B** |      7.0 B |           **OOM** | **24.77 GB** | **24.95 GB** |  **24.94 GB** |  **25.98 GB** |

### Activation Checkpointing:
So in pytorch and most dl frameworks activations are stored in memory to avoid recomputation during backward passes, if we don't store the activations, with a increased time for training we can train a big model with a lower vram consumption.

**Intuition:**

This is vanilla backprop notice how the forward pass blobs are stored.
![Vanilla Backprop](https://github.com/cybertronai/gradient-checkpointing/blob/master/img/output.gif?raw=True)

Notice how when computing backward passes we have to run the forward pass again to get the activations.
![Memory Poor Backprop](https://github.com/cybertronai/gradient-checkpointing/blob/master/img/output_poor.gif?raw=true)

This is a graph which shows the forward and backward passes when training a model and the cuda memory allocated, accordingly.Now here what our objective is to reduce the peak cuda memory allocated by recomputing our activations.
![GPU Profiling Image](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/train_memory/colorized_training_profile.png)

**Implementation for LLMs or Any Layer/Forward Pass for that matter:**

Here we use the `torch.utils.checkpoint` for checkpointing you can use your own checkpointing algorithm here as well, for example the unsloth's gradient checkpointing algorithm, which just moves the hidden states to the cpu and gets them back to cuda device when backward pass is computed.

This is a wrapper which we are going to use to apply gradient checkpointing to our model.
```python
class ModelWGradCkpt(nn.Module):
    def __init__(self, model) -> None:
        super().__init__()
        self.model = model

    def forward(self, *args, **kwargs):
        # print('Check')
        def forward_fn(*inputs):
            return self.model(*inputs, **kwargs)
        
        return torch.utils.checkpoint.checkpoint(forward_fn, *args, use_reentrant=False)
```

This is the helper function which enables us to do so. (This is more or less aligned with most architectures, but you can make changes as per your convenience).

```python
def apply_grad_ckpt(model: AutoModelForCausalLM):
    # Decoder Layers
    for layer in model.model.layers:
        layer.self_attn = ModelWGradCkpt(layer.self_attn)
        layer.mlp = ModelWGradCkpt(layer.mlp)

    return model
```

**Benchmarking against FFT w Gradient Checkpointing `bfloat16`:**


| Model           | Params (≈) | FFT (no GC) | FFT (+GC) |
| :-------------- | ----------: | -----------: | ----------: |
| **Qwen2.5-1.5B** | 1.5 B       | **20.31 GB** | **18.12 GB** |


**Benchmarking against LoRA w Gradient Checkpointing `bfloat16`:**

| Model           | Params (≈) | FFT (no GC) | FFT (+GC) | LoRA (no GC) | LoRA (+GC) |
| :-------------- | ----------: | -----------: | ----------: | ------------: | -----------: |
| **Qwen2.5-1.5B** | 1.5 B | **20.31 GB** | **18.12 GB** | **9.68 GB** | **7.068 GB** |
| **Qwen2.5-7B**   | 7.0 B | **OOM** | **OOM** | **24.77 GB** | **19.9 GB** |


With just LoRA and Gradient Checkpointing without quantizing our model we are able to finetune a 1.5B Model with bs = 1, 1024 Sequence length with just 7GB of VRAM, from 20.31GB, which shows a reduction of about 65-70% reduction in VRAM.

### Cut Cross Entropy

(Coming soon) WIP

### FSDP 

(Coming Sooonn) WIP

### References
1. [LoRA: Low Rank Adaptation of Large Language Models](https://medium.com/@tayyibgondal2003/loralow-rank-adaptation-of-large-language-models-33f9d9d48984)  
2. [Code LoRA from scratch](https://lightning.ai/lightning-ai/environments/code-lora-from-scratch?view=public&section=featured)   
3. [Gradient Checkpointing Animations](https://github.com/cybertronai/gradient-checkpointing)
4. [Unsloth: Finetuning LLMs](https://github.com/unslothai/unsloth)
