---
title: "Cluster refresh"
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

Additionally traking state changes can tell us what is happening to our system
and what we need to change as well as what our actions on the system lead to.

The cluster state refresh process continuously evaluates the state of clusters
so decisions can be taken, progress tracked and (re)actions triggered.

So how does cluster refresh work?

{{< img "refresh.png" "Overview: cluster refresh" >}}

  1. The cluster `refresh` component periodically runs at fixed intervals.
     The interval should be short as it determines the delay between cluster
     needing to refresh and the refresh being scheduled.
  2. The `refresh` run looks for any cluster with an **expected** next refresh time in the past.
     If no cluster needs to be refreshed the `refresh` run does nothing.
  3. The `refresh` run schedules a refresh tasks for each cluster that needs to run.
  4. The **expected** next refresh time is updated to `now() + refresh interval`.
  5. A task worker picks up the refresh task.
  6. The refresh task invoke the Agent API to refresh the agent state.
  7. Events are emitted for state changes.
  8. Persist agent state and aggregated cluster state to the primary store.

## Avoid concurrent refresh tasks

Because events are generated from differences in observed states, refreshing the state of
a node from multiple processes at once may lead to duplicate and/or missing events as well
as confused and inconsistent aggregations.

Distributed locks are used to ensure a cluster is refreshed by only one process at a time.
Any cluster refresh operation attempted while another operation is already running will be discarded.

## A cluster view

The newly fetched agents information is aggregated to generate an
[approximate cluster view]({{< ref "../cluster-view.md" >}}).
This cluster view is compared to the last known view to generate events describing changes
in the view of the system.

Because the cluster view is approximate node events are always based on reporting from the node themselves
(we do not report a node as down if we see it up, even if another node in the cluster think it is down).

Only cluster level events are generated off the top of this views.
Actions will have to check if the state of the system matches the expectations before they are applied.
