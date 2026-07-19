---
title: Patient Opinion Mining from Feedback Comments
kind: "NLP research · NHS (UK)"
problem: "NHS trusts collect thousands of free-text patient comments but had no scalable way to tell which aspects of care — staff attitude, waiting time, environment — patients were praising or complaining about."
stack:
  - Machine learning
  - NLP
  - n-gram features
  - Topic classification
  - R
result: "NHS Study"
result_label: "Corpus & methods published in Health and Social Care Delivery Research"
repo: "https://github.com/hkayesh/depend_clean"
featured: true
weight: 2
excerpt: "Machine learning that detects patient sentiment on different aspects of hospital care — corpus and methods published in the NHS DEPEND study."
header:
  teaser: /assets/images/depend_model.png
---

This project explores how far machine learning can automatically classify patient
comments into key topics — staff attitude, care quality, environment and
waiting time, among others. I present an annotated gold-standard corpus developed in two NHS settings
in the UK (a general hospital and a mental health trust) and two modelling approaches based on segment- and
comment-level representations. The models use various machine learning methods and rely on n-gram features.

The corpus and methods were published as part of the
[DEPEND mixed-methods study](https://scholar.google.com/citations?view_op=view_citation&hl=en&user=oqlGWy4AAAAJ&citation_for_view=oqlGWy4AAAAJ:W7OEmFMy1HYC)
(*Health and Social Care Delivery Research*, 2020).

[![](https://img.shields.io/badge/Github-View%20Source%20Code-green?logo=Github)](https://github.com/hkayesh/depend_clean)

![](/assets/images/depend_model.png)
