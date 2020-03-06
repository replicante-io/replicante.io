---
title: "Core"
date: 2020-03-06T18:58:48Z
draft: false
group: apiref
weight: 602
---

Core endpoints are related to the essential features of Replicante Core.


<div class="rest">
  <div class="method post">POST</div>
  <div class="url post">/api/unstable/core/cluster/:cluster_id/refresh</div>
  <div class="desc post rtl"></div>
</div>

Request the refresh of the state of a cluster.

URL parameters:

  * `:cluster_id`: the ID of the cluster to refresh.

Body: None

Response:

  * `task_id`: the internal ID of the [task]({{< ref "../admin/tasks.md" >}})
    that will perform the refresh (for debugging).

```json
{
  "task_id": "dfe270e070ca03b4a07de43383997b31"
}
```
