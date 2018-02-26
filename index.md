---
layout: default
title: news
---
日本語
[English](index-en.html)

# news page
以下、最近のニュースです。

{% for post in site.categories.ja %}
- {{post.date | date_to_string}}
  [{{post.title}}]({{post.url | prepend: site.baseurl}})
{% include post_meta.html %}
{% endfor %}