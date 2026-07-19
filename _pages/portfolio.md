---
title: Portfolio
layout: single
permalink: /portfolio/
classes: page-full
toc: false
---

<div class="work__grid">
  {% assign items = site.portfolio | sort: "weight" %}
  {% for item in items %}
    {% include project-card.html item=item %}
  {% endfor %}
</div>
