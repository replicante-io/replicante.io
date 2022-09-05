---
title: "Cluster discovery"
date: 2020-07-18T10:54:48+01:00
draft: false
group: notes
weight: 6
---

The cluster discovery process aims to keep administration and management overheads at a minimum
and take advantage of the highly dynamic platforms and tools available today ("The Cloud").

So how does cluster discovery work?

{{< img "discovery.png" "Overview: cluster discovery" >}}

0. Users apply one or more `DiscoverySetting` objects though the API.
1. The cluster `discovery` component periodically runs at fixed intervals.
   The interval should be short as it determines the delay between
   discoveries needing to run and them being scheduled.
2. The `discovery` run looks for any discoveries with an **expected** next schedule time in the past.
   If no cluster discovery needs to run the `discovery` run does nothing.
3. The `discovery` run schedules a discovery task for each discovery that needs to be performed.
4. The **expected** next schedule time is updated to `now() + discovery interval`.
5. A task worker picks up the discovery task.
6. The discovery task fetches discovery records from the given discovery.
7. Discovery records are updated in the primary store.

## Deleting clusters and nodes

When clusters and nodes are automatically discovered they can also automatically go away.

{{% notice class="warning" %}}
This feature is not currently available and is yet to be designed in full.
{{% /notice %}}

## Why discover clusters?

The primary use case for Replicante is part of an automated, distributed, dynamic infrastructure
that scales from a small number of small clusters to a large number of large clusters.

It is assumed that managing a list of nodes is at best impractical, but may even be impossible
in combination with tools such as auto scaling groups and automated instance provisioners.

The idea of cluster discovery was inspired by [Prometheus](https://prometheus.io/).
Cluster discovery has several advantages:

* A single source of truth as to which instances should exist in which clusters.
* Automatic detection of node creation and retirement.
* Nodes are "checked" against some form of trusted server inventory
  (nodes can't just add themselves to a cluster).
