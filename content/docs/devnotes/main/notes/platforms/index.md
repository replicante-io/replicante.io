---
title: "Platforms and discovery"
date: 2022-12-12T12:50:48+01:00
draft: false
group: notes
weight: 6
---

Replicante Core uses platforms to discover and manage nodes.

Platforms are "registered" with Core by applying `Platform` objects pointing to a service
implementing the platform specification.

## Platform discoveries

Clusters to be managed by Replicante Core are discovered from platforms themselves.
The platform discovery process takes advantage of dynamic provisioning to find the clusters it
should manage and to manage nodes that make them up.

So how does platform's cluster discovery work?

{{< img "discovery.png" "Overview: platform's cluster discovery" >}}

0. Users apply one or more `Platform` objects though the API.
1. The platform `discovery` component periodically runs at fixed intervals.
2. The `discovery` run looks for any platform with an **expected** next schedule time in the past.
   If no platform needs to be discovered the `discovery` run does nothing.
3. The `discovery` run schedules a discovery task for each platform that needs one.
4. The **expected** next schedule time is updated to `now() + discovery.interval`.
5. A task worker picks up the discovery task.
6. The discovery task fetches discovery records from the Platform as described in the specification.
7. Discovery records are updated in the primary store.

Platform `discovery` is configurable:

* The `discovery` component interval: the interval should be short as it determines the delay
  between platform discovery tasks needing to run and them being scheduled.
* The Platform discovery interval: platform-specific interval between scheduling of discovery tasks.

### Deleting clusters and nodes

When clusters and nodes are automatically discovered they can also automatically go away.

{{% notice class="warning" %}}
This feature is not currently available and is yet to be designed in full.
{{% /notice %}}
