---
title: "The Cluster View"
date: 2020-02-09T22:53:23Z
draft: false
group: notes
weight: 2
---

There is a fundamental limit to observing a distributed system: it is not possible to have a
consistent, point in time, view of the entire system.
Such a view would provide a false illusion anyway: by the time we do anything with it
the state of the system will have changed.

Replicante Core accepts the intrinsic unreliability of the cluster view so it can build on the
idea of "the cluster" while not thinking "we know what the state of the system is".

This means:

* Views are considered approximate and observations need to be checked or confirmed.
* Actions performed by any component of the system will have preconditions.

Confirming views of the system depends on exactly what part we are looking at but
most likely revolve around observing the same state for multiple orchestration cycles.

Action preconditions allow the system to confirm the expected state before changing the system.
They enable cases where an action targeting a shard secondary will not execute if the shard
has become primary by the time the action starts executing.

On the upside:

* The approximate views can be generated even though exact ones can't.
* We don't fall trap of the illusion that transactions can help with (certain) observation guarantees.

We can't rely on [ACID transaction](https://en.wikipedia.org/wiki/ACID) across observation,
processing, action scheduling, action execution as the cluster changes around our fixed view.

{{% notice class="warning" %}}
Preconditions are not yet part of Replicante Core or the Agents SDK.
{{% /notice %}}

## Orchestration Logic

Orchestration logic is not part of the Cluster View but instead built on it.

Where the logic is implemented will depend on what the aim of the logic is and will move
over time around the code base.

Separation of data from business logic has long been a cornerstone of software development
because it keeps both data and logic simpler and cleaner and allows logic to evolve and expand
faster and more easily.
