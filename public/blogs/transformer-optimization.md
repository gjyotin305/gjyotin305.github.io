# A Hitchhiker’s Guide to Training Deep Learning Models

Hellooo, so this is my first blog, I wanted to make this on some of the optimizations that I came across mainly via unsloth, and from my experience of pretraining/finetuning big models in a GPU poor environment.

This blog will not have a definite structure, each optimisation can be applied independently and sequentially as well


## Index
    - LoRA
    - Gradient Checkpointing
    - Cut Cross Entropy
    - FSDP


### LoRA (Low Rank Adapters):

*Intuition:*

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

*Implementation (taken for @rasbt github) for LLMs:*

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

*Benchmarking against FFT with different ranks for Qwen2.5-1.5B Instruct with `bfloat16`:*

Alpha here is taken with (α = 2 * r)

| Model          | Params (≈) | FFT | LoRA rank 4 | LoRA rank 8 | LoRA rank 16 | LoRA rank 32 |
| :------------- | ---------: | --------------------: | ----------: | ----------: | -----------: | -----------: |
| **Qwen2.5-1.5B** |      1.5 B |           **20.31 GB** | **9.68 GB** | **9.78 GB** |  **9.93 GB** | **9.98 GB** |
| **Qwen2.5-7B** |      7.0 B |           **40.68 GB** | **24.77 GB** | **24.95 GB** |  **24.94 GB** |  **25.98 GB** |

### Activation Checkpointing:
Free VRAM more or less


<u>*Intuition:*</u>


