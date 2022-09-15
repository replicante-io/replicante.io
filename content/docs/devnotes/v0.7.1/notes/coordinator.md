---
title: "Distributed Coordination"
date: 2020-02-11T22:17:59Z
draft: false
group: notes
weight: 9
---

Replicante Core uses a distributed coordinator for a variety of reasons.

This page aims to keep track of all uses of coordination.
Distributed coordination (especially locks) is a delicate thing, and are *very* easy to get wrong!

## Component election

Some components are special and must be executed exclusively across the cluster.
Yet we want more then one instance of them running so if one process fails another can take over.

Distributed coordination is used to achieve this:

* Each component that needs it attempts to acquire exclusive primary role.
* If a primary exists the process does nothing and watches the primary in case it fails.
* If a primary does not exist the process becomes primary and starts performing its function.
* Before acting, and within reason, the primary process should check if it is still primary.
  This is to make sure that connection issues to the coordinator do not lead to double primary.
  * For example a process based on a periodic loop can check its status at the start of each run.

{{% notice class="warning" %}}
Changes to move to a single primary in the cluster running all exclusive components are planned.

While this would reduce the distribution of work across instances it will greatly simplify
the primary/secondary system to mirror other common patterns.
{{% /notice %}}

The implementation details may very over time and based on backends (Consul vs Zookeeper).

### Uses of component election

* Cluster discovery process (find discovery backend to poll and push tasks to workers).
* Cluster orchestration scheduling (find clusters to orchestrate and push tasks to workers).
* Zookeeper coordinator has a clean up background thread to "implement" container nodes
  in zookeeper versions below 3.5

## Exclusive operations (locks)

Some operations require the guarantee that only one processes operates on the same inputs
at any one time.

To handle these cases operations attempt to acquire a lock before they begin:

* If the lock is acquired, the operation proceeds as normal.
* If the lock is already taken, the operation is skipped or delayed.

### Uses for exclusive operations

* Cluster orchestration tasks (exclusive per cluster).
