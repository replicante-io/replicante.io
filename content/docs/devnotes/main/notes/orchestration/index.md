---
title: "Cluster orchestration"
date: 2020-07-18T10:55:09+01:00
draft: false
group: notes
weight: 7
---

At the essence of Replicante Core is an event driven engine: when a state change is
detected actions are taken to return the system to a desired state.

The idea of orchestration built on an event driven engine is not new:

* It is an easy model to understand for humans (physics is based on the action-reaction paradigm).
* It is easy enough to implement (at least compared to other options).
* It allows us to focus on the triggers of an event and the consequences of an action without
  having to look at the entire history of the full system.

Additionally tracking state changes can tell us what is happening to our system
and what we need to change as well as what our actions on the system lead to.

The cluster orchestration process continuously evaluates the state of clusters
so decisions can be taken, progress tracked and (re)actions triggered.

So how does cluster orchestration work?

{{< img "orchestration.png" "Overview: cluster orchestration" >}}

  1. The cluster `orchestrate` component periodically runs at fixed intervals.
     The interval should be short as it determines the delay between cluster
     needing orchestration and the orchestration being scheduled.
  2. The `orchestrate` run looks for any cluster with an **expected** next orchestration time in the past.
     If no cluster needs to be orchestrated the `orchestrate` run does nothing.
  3. The `orchestrate` run schedules an orchestrate task for each cluster that needs to run.
  4. The **expected** next orchestration time is updated to `now() + orchestrate interval`.
  5. A task worker picks up the orchestration task.
  6. The orchestration task performs all orchestration logic (see below).
  7. Events are emitted for state changes.
  8. Persist agent state and aggregated cluster state to the primary store.

## Avoid concurrent orchestration tasks

Because events are generated from differences in observed states, orchestrating the state of
a node from multiple processes at once may lead to duplicate and/or missing events as well
as inconsistent aggregations.

Distributed locks are used to ensure a cluster is orchestrated by only one task at a time.
Any cluster orchestration attempted while another operation is already running will be discarded.

## Cluster orchestration logic

The above covers how Replicante Core manages orchestration tasks.
This section covers how an orchestration task works against an individual cluster.

### Logic overview

The orchestration logic performs the following steps sequentially:

1. Build a cluster view (see below) from existing data about the cluster.
2. Process each node in the cluster discovery record:
   1. Fetch updated information from the cluster nodes.
   2. Use this information to create an incremental updated view.
   3. Use this information and the starting cluster view to emit events.
   4. The information is also saved to the primary store.
   5. [Schedule actions]({{< ref "../scheduling-actions/index.md" >}}) not already scheduled.
3. Perform data aggregation to report on the cluster as a whole:
   1. Report on cluster level metadata such as number of nodes, versions, etc ...

### A cluster view

The newly fetched agents information is aggregated to generate an
[approximate cluster view]({{< ref "../cluster-view.md" >}}).
This cluster view is compared to a view based on the last known cluster data
to generate events describing changes in the view of the system.

Because the cluster view is approximate node events are always based on reporting from the node
themselves (we do not report a node as down if we see it up, even if another node in the cluster
think it is down).

Only cluster level events are generated off the top of this views.
Actions will have to check if the state of the system matches the expectations before they are executed.
