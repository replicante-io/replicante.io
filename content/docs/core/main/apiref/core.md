---
title: "Core"
date: 2020-03-06T18:58:48Z
draft: false
group: apiref
weight: 602
---
<!-- markdownlint-disable MD033 -->

Core endpoints are related to the essential features of Replicante Core.

<div class="rest">
  <div class="method post">POST</div>
  <div class="url post">/api/unstable/core/apply</div>
  <div class="desc post rtl"></div>
</div>

Apply a new or updated configuration.

The body of the request must be a JSON object with the following attributes:

* `apiVersion`: identifier of the group and version of the configuration to apply.
* `kind`: identifier of the class of configuration object to apply.
* `metadata`: additional metadata relevant for the object.
* Additional attributes may be required based on what the object being applied is.

Response:

* `ok`: set to 1 on success.
* `response`: an optional JSON response based on the object `apiVersion` and `kind`.

```json
{
  "ok": 1,
  "response": "any"
}
```

<div class="rest">
  <div class="method post">POST</div>
  <div class="url post">/api/unstable/core/cluster/:cluster_id/orchestrate</div>
  <div class="desc post rtl"></div>
</div>

Request the orchestration of a cluster.

URL parameters:

* `:cluster_id`: the ID of the cluster to orchestrate.

Body: None

Response:

* `task_id`: the internal ID of the [task]({{< ref "../admin/tasks.md" >}})
  that will perform the orchestration (for debugging).

```json
{
  "task_id": "dfe270e070ca03b4a07de43383997b31"
}
```
