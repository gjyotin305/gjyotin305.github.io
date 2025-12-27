# A Technical Deep Dive on Moondream2 (fav VLM):

## Index

1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
   - [Vision Encoder](#vision-encoder)
   - [Text Decoder](#text-decoder)
   - [Region Module](#region-module)
3. [What makes Moondream different ?](#novelty)
4. [Finetuning Moondream2](#finetuning-moondream2)
   - [Core Training Objectives](#core-training-objectives)
   - [Task-Specific Finetuning](#task-specific-finetuning)
5. [Benchmark Results](#benchmark-results)
6. [Conclusion](#conclusion)
7. [References](#references)


## Introduction

Moondream2 is one of the most capable **small-scale Vision–Language Models (VLMs)** available today. Despite having only around **1–2 billion parameters**, it performs remarkably well across a wide range of tasks such as **object detection, image captioning, visual question answering (VQA), and spatial reasoning**.

What makes Moondream2 especially interesting is its **modular and purpose-driven architecture**. It combines:

* **SigLIP** as the vision encoder for extracting rich visual representations,
* **Phi** as the text decoder for language understanding and generation, and
* A custom **Region Module**, built with an encoder–decoder design, that explicitly models **spatial information like object positions and sizes**. This module is central to tasks such as localization, segmentation, and region-aware reasoning.

Unlike many modern VLMs that rely on heavyweight architectures or implicit spatial reasoning, Moondream2 takes a more **explicit and efficient approach**. By directly encoding coordinates and region features, it avoids a lot of unnecessary complexity while remaining highly effective.

You can think of Moondream2 as a **practical hybrid of YOLO-style detection and LLaVA-style multimodal reasoning**. The result is a model that is not only lightweight and fast, but also surprisingly robust and versatile—making it far more usable in real-world settings than many larger VLMs.

---

## Architecture Overview

![Moondream Architecture overview](/Moondream_2.png)

Moondream’s architecture comprises three primary components: a Vision Encoder, a Text Decoder, and a Region Module. The Vision Encoder is implemented as a SigLIP-based Vision Transformer (ViT) and is responsible for extracting high-level visual representations from the input image. These representations are subsequently consumed by the Text Decoder, which is based on the Phi language model and performs multimodal reasoning as well as text generation. In addition, Moondream incorporates a dedicated Region Module that explicitly models spatial information. This module employs Fourier feature–parameterized multilayer perceptrons (MLPs) to encode object coordinates and size attributes, enabling precise localization and supporting downstream tasks such as object detection and region-aware reasoning.

### Vision Encoder

![Moondream Vision Encoder](/moondream_patch.png)

A key architectural feature of Moondream is its hybrid strategy for handling image resolution, which enables the model to preserve fine-grained visual information without incurring the full computational cost of processing large images end-to-end. For a standard input resolution of 378 × 378, the image is partitioned into 14 × 14 patches, producing 729 visual tokens that are subsequently processed by the SigLIP Vision Transformer (ViT) blocks.

For higher-resolution inputs, such as 756 × 756, Moondream adopts a tiling-based approach. The image is decomposed into multiple 378 × 378 tiles, each of which is processed independently using the same patchification and ViT pipeline. In parallel, the full image is downsampled to 378 × 378 and processed to obtain a global, scene-level representation.

The resulting tile-level features and global image features are then concatenated prior to the final vision projection layer. This explicit concatenation allows the model to jointly reason over local high-resolution details and global contextual information, improving performance on tasks that require precise spatial understanding while remaining computationally efficient.

### Text Decoder

![Moondream Attention Mech and Decoder](/moondream_text.png)

In most vision–language models, multimodal training is framed as standard causal language modeling (CLM), where the model attends autoregressively over a sequence composed of image embeddings followed by instruction and text tokens. While effective, this formulation treats visual context in a strictly left-to-right manner, which can limit the model’s ability to fully exploit rich image representations.

Moondream instead adopts a Prefix Language Modeling (Prefix-LM) objective, similar to the approach used in PaLI-Gemma. Under this formulation, the model applies full bidirectional attention over the image embedding prefix, allowing all visual tokens to attend to one another without causal masking. Causal masking is introduced only after the image tokens, when generating text.

As illustrated in the figure, this design allows the language decoder to condition on a globally coherent visual representation before beginning autoregressive text generation. By decoupling visual understanding from textual causality, Moondream captures finer-grained visual details and more robust spatial relationships.

Empirically, this prefix-based attention mechanism leads to improved performance on image captioning, visual querying, and OCR-style tasks, where holistic visual context and precise detail retention are critical.

### Region Module

![Moondream Region Module](/moondream_region.png)

Now comes the most unconventional part of Moondream’s design: **how it represents spatial coordinates**.

Accurately modeling coordinates is surprisingly difficult in vision–language systems. While the text decoder is well suited for discrete token generation, it is inherently ill-equipped for **high-precision continuous values** such as bounding box coordinates. Even small numerical errors can lead to large perceptual mistakes, which makes naive coordinate regression ineffective.

A key limitation here lies in **standard MLPs with ReLU activations**. Such networks are known to suffer from **spectral bias**, meaning they preferentially learn **low-frequency functions** while struggling to represent high-frequency variations. In practice, this implies that vanilla MLPs can distinguish coarse spatial differences but fail to capture fine-grained detail.

An intuitive analogy is to think of a ruler. A standard MLP can reliably distinguish distances on the order of **centimeters**, but it struggles to resolve differences at the **millimeter scale**. To capture such fine detail, the model needs a form of magnification.

![Visual Representation of Spectral Bias](/spectral_bias.png)

Moondream addresses this by encoding coordinates using **Fourier features**, following the approach introduced in *“Fourier Features Let Networks Learn High Frequency Functions in Low Dimensional Domains”* by **Tancik et al. (2020)**. Instead of feeding raw coordinates directly into the network, the inputs are projected into a **higher-dimensional space using sinusoidal basis functions** at multiple frequencies. This transformation effectively amplifies small variations in the input, making high-frequency spatial information linearly accessible to downstream MLPs.

By operating in this Fourier-embedded space, Moondream’s Region Module can represent **minute differences in position and size** with far greater precision. This design choice is critical for tasks such as **object detection, localization, and region-level reasoning**, where spatial accuracy directly impacts downstream performance.

---

## Finetuning Moondream2 for object detection

Now, we come to the interesting part, the finetuning of our teensy model for object detection, for this I am going to use the DOTA dataset, where plain moondream's performance is okayishh, but after finetuning, you could tell me the difference :).

### Core Training Objectives

The training objective is somewhat, similar to how we do it with normal CE loss for causal language modeling except, we only focus on the encoded position and size embeddings. One key thing which I forgot to mention is that the region module handles the coordinates in 3 ways, [x, y are encoded seperately while w,h are encoded together]. Now during finetuning we mask all other tokens except these positional and size embeddings and we then apply the cross entropy loss.

For more details, you can check out my fork of Moondream.The code will be given at the bottom. Till then enjoy the blog and the results.

---

## Finetuning Results

![Post Finetuning Results](/post_finetuning.png)

Now, as you can see this is the performance of `Detect: small-vehicles` and `Detect: ship harbours`, previously moondream skipped most vehicles before finetuning, but after finetuning it was able to detect correct vehicles, though not all. Ship harbours as well it had decent perf pre finetuning, but most finetuning, it had perfect performance on that.This goes to show that Moondream's approach towards detection via Natural Language is quite powerful and robust, it is able to get very good performance even in aerial images.

---


## Conclusion

Moondream demonstrates that strong vision–language performance does not require ever-larger models or increasingly complex monolithic architectures. Instead, it shows that **careful architectural choices and explicit inductive biases** can yield a system that is both lightweight and highly capable.

Rather than treating vision as a flat sequence of tokens and forcing the language model to implicitly learn spatial reasoning, Moondream **explicitly decomposes the problem**. Visual understanding is handled through a SigLIP-based Vision Transformer with resolution-aware tiling, spatial precision is delegated to a dedicated Region Module with Fourier feature encodings, and multimodal reasoning is performed via prefix language modeling in the text decoder. Each component is designed to do what it is best suited for.

This approach stands in contrast to many contemporary VLMs that rely on brute-force scaling or implicit learning of spatial structure. By explicitly modeling coordinates, preserving high-frequency spatial detail, and decoupling visual comprehension from causal text generation, Moondream achieves strong performance across detection, captioning, querying, and OCR tasks—while remaining small enough to be practical.

Overall, Moondream represents a compelling alternative direction for VLM design: **smaller, modular, and spatially aware**, with architectural transparency that makes both reasoning and training behavior easier to understand and extend.

The code for this can be found in my fork specifically in the finetune folder: [GITHUB](https://github.com/gjyotin305/moondream/tree/feat/finetune_final)

---

## References

* **Moondream2 (Model Card & Weights)**
  [https://huggingface.co/vikhyatk/moondream2](https://huggingface.co/vikhyatk/moondream2)

* **Moondream (Official GitHub Repository)**
  [https://github.com/vikhyat/moondream](https://github.com/vikhyat/moondream)

* **SigLIP: Signal-preserving Contrastive Language–Image Pretraining**
  Zhai et al., 2023
  [https://arxiv.org/abs/2303.15343](https://arxiv.org/abs/2303.15343)

* **Phi Language Models**
  Microsoft Research
  [https://arxiv.org/abs/2306.11644](https://arxiv.org/abs/2306.11644)

* **Fourier Features Let Networks Learn High Frequency Functions in Low Dimensional Domains**
  Tancik et al., NeurIPS 2020
  [https://arxiv.org/abs/2006.10739](https://arxiv.org/abs/2006.10739)

* **PaLI-Gemma / Prefix Language Modeling**
  Google Research
  [https://arxiv.org/abs/2403.20330](https://arxiv.org/abs/2403.20330)

* **LLaVA: Large Language and Vision Assistant**
  Liu et al., 2023
  [https://arxiv.org/abs/2304.08485](https://arxiv.org/abs/2304.08485)

* **YOLO: You Only Look Once**
  Redmon et al., 2016
  [https://arxiv.org/abs/1506.02640](https://arxiv.org/abs/1506.02640)

---