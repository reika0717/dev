---
layout: default
title: news
---
# news page
以下、最近のニュースです。

{% for post in site.posts %}
- {{post.date | date_to_string}}
  [{{post.title}}]({{post.url | prepend: site.baseurl }})
{% include post_meta.html %}
{% endfor %}