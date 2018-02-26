---
layout: default
title: news
---
# news page
This is news list.

{% for post in site.categories.en %}
- {{post.date | date_to_string}}
  [{{post.title}}]({{post.url | prepend: site.baseurl}})
{% include post_meta.html %}
{% endfor %}

[日本語](index.html)
English