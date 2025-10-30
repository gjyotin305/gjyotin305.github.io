# A Hitchhiker’s Guide to Training Deep Learning Models

Hellooo, so this is my first blog, I wanted to make this on some of the optimizations that I came across mainly via unsloth, and from my experience of pretraining/finetuning big models in a GPU poor environment.

This blog will not have a definite structure, each optimisation can be applied independently and sequentially as well


## Index
    - LoRA
    - Activation Checkpointing
    - Cut Cross Entropy
    - FSDP


### LoRA (Low Rank Adapters):

#### Intuition:


#### Implementation (taken for @rasbt github):


#### Benchmarking against FFT with different ranks for Qwen2.5-1.5B Instruct with bfloat16


