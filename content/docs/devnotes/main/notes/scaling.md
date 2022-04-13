---
title: "Scaling"
date: 2020-02-11T22:25:44Z
draft: false
group: notes
weight: 11
---

Replicante is a highly available and scalable service.

In Replicante Core the horizontal scaling unit is the cluster.
This means scaling focuses on managing a large number of clusters rather than few large clusters.

The current thinking is that even the largest clusters can be managed with commodity hardware
and that code can be improved when limits on cluster size are reached.
This position can be re-evaluated should this assumption be proved incorrect or stretched to its limit.

## High availability

High availability is achieved by running multiple instances of the same process.
Replicante uses a coordinator service (Zookeeper) to ensure that processes do not
interfere with each other and that tasks assigned to failed process are taken over.

## Scaling

Replicante uses sharding techniques to scale: each cluster is a "shard" operated on independently.

Replicante assumes a cluster can be managed by a single process.
The code attempts to process each node individuality in a lazy fashion when possible
to further reduce the impact of processing large clusters.

Details of scaling are provided in the
[admin manual]({{< docs-link "admin" "stable" >}}).

## Dependencies

All services Replicante depends on can be configured to be highly available and scale as well.
It is the user's task to configure all services to provide high availability and scale as desired.

Dependency services that support sharding should be configured to shard data on cluster ID.
**NOTE: this is likely to change!!!**

* Organisations may be introduced sooner or later, allowing Replicante to become a multi-tenanted
  platform, which would likely change the shard key from cluster ID to organisation ID
  (plus cluster ID for instances that need to deal with large organisations).
