---
title: "Scaling"
date: 2020-02-11T22:25:44Z
draft: false
group: notes
weight: 10
---

Replicante Core is a highly available and scalable service.

In Replicante Core the horizontal scaling unit is the managed cluster.
This means scaling focuses on increasing the number of managed clusters rather then their size.

**NOTE**: the size of a managed cluster is not about the amount of data it managed but
more about the number of nodes and shards involved.

The current thinking is that even the largest clusters can be managed with commodity hardware
and that code can be improved when limits on cluster size are reached.
This idea can be re-evaluated should this assumption be proved incorrect or stretched to its limit.

## High availability

High availability is achieved by running multiple instances of the same process.
Replicante Core uses a distributed coordinator to ensure that processes do not
interfere with each other and that duties assigned to failed processes are taken over.

## Scaling

Replicante Core processes are stateless and obtain records to operate on from their dependencies.
If Replicante Core can't keep up with the number of managed clusters additional processes can
be added to support the growth in managed clusters.

It is expected that scaling will be limited by Replicante Core dependencies more then
Replicante Core processes.

Details of scaling dependencies are provided in the [admin manual]({{< docs-link "admin" "stable" >}}).
