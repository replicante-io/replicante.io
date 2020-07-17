---
title: "Store migration backend"
date: 2020-02-13T18:59:08Z
draft: false
group: dreams
weight: 210
---


{{% notice class="danger" %}}
This sounds extremely complex, inefficient and hacky.

If the sync features to support "Upgrade by replacement" (which are simpler and more usefull) this becomes redundant.
{{% /notice %}}

Provide a special store backend that wraps two other stores.
This would allow online migrations from one store to another.

Primary concerns are:

  * Re-sharding collections in the event of storage format changes (i.e, organisations are added).
  * Move to other technologies: SQL solutions like [Vitess](https://vitess.io/).


## Challenges

  * Obviously the complexity in guaranteeing no data loss or corruption.
  * How to deal with mostly read-only data?
    * Assumed a copy on write system, should it become a copy on read?
    * Iterate through data and insert if missing?
