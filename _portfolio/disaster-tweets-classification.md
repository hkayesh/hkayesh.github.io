---
title: Disaster Tweets Classification
kind: "Kaggle · Live demo"
problem: "During a crisis, disaster-related tweets drown in noise. Responders need them filtered automatically — but short, unstructured text makes that a hard classification problem."
stack:
  - DistilBERT
  - Transfer learning
  - Transformers
  - Python
result: "83%+"
result_label: "Test accuracy · live demo on Hugging Face"
repo: "https://www.kaggle.com/code/hkayesh/twitter-disaster-nlp-with-fine-tuned-distilbert"
demo: "https://huggingface.co/spaces/hkayesh/twitter-disaster-nlp"
featured: true
weight: 1
excerpt: "Fine-tuned DistilBERT to detect disaster-related tweets with 83%+ accuracy — try the live demo on Hugging Face."
header:
  teaser: /assets/images/disaster-tweets-demo.gif
---

Twitter is a popular social media platform where users share short posts to express their feelings. Such
tweets often contain useful information about critical situations such as disasters. If that information is extracted and
processed efficiently, it can drive faster, better-informed responses. However, separating disaster-related tweets
from the rest is challenging due to the unstructured nature of text data.

In this project, I developed a transfer learning-based approach to detect whether a tweet is about a disaster.
I fine-tuned a pretrained DistilBERT model on the
Kaggle ["Natural Language Processing with Disaster Tweets"](https://www.kaggle.com/c/nlp-getting-started) dataset.
The model achieves more than 83% accuracy on the test set.

> [Try the model yourself](https://huggingface.co/spaces/hkayesh/twitter-disaster-nlp) on Hugging Face, or
> read the [source notebook](https://www.kaggle.com/code/hkayesh/twitter-disaster-nlp-with-fine-tuned-distilbert) on Kaggle.

![](/assets/images/disaster-tweets-demo.gif)
