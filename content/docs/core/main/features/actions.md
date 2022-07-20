---
title: "Actions"
date: 2020-02-24T21:12:57Z
draft: false
group: feature
weight: 102
---

Actions are a way to describe some task that needs to be performed by some component of the larger system.

Actions progress from start to finish across states.  
More details about the states an action goes through are documented in the
[Developers Notebook]({{% docs-link "devnotes" "stable" "notes/scheduling-actions#action-states" %}}).

Actions are scheduled by applying a YAML object using the `replictl` tool
(yes, this intentionally mirrors [kubernetes.io](https://kubernetes.io/) approach):

```bash
$ replictl apply -f path/to/action.yaml
Object applied successfully
```

The YAML object depends on what kind of action you are scheduling.

## Node Actions

Node actions (also known as Agent actions) are defined in the
[specification]({{% docs-link "spec" "stable" "agent/intro#actions" %}})
and are executed on a specific nodes, generally by Replicante Agents.

The YAML object for agent actions has the following specification:

```yaml
apiVersion: replicante.io/v0
kind: NodeAction

metadata:
  # Can override the namespace with --namespace=test-namespace
  namespace: default
  # Can override the cluster with --cluster=test-cluster
  cluster: target-cluster-id
  # Can override the namespace with --node=test-node
  node: target-node-id

spec:
  # Trigger a debug action that executes two dummy steps and then successfully completes.
  action: agent.replicante.io/debug.progress
  # Pass additional arguments as structured data.
  args:
    options: 'available options change based on the action'
    format: 'any structured YAML object is fine'
```

### Scheduling Approval

Node actions require approval for scheduling by default when they are applied.

This means that actions will NOT be scheduled until they are approved using `replictl` or the API.
Requiring approval for an action means that an action can be created without
executing it and someone else can approve it after review.
The action executed on approval is exactly the one applied with no change allowed.

To skip the approval step and schedule an action as soon as possible after it is applied
you can set the `approval` metadata attribute to `granted`.

```yaml
metadata:
  # Don't require explicit approval before the action is scheduled.
  approval: granted
```

## Orchestrator Actions

Some times actions operate or impact multiple nodes or the full cluster.
These actions generally are about orchestrating changes to the cluster or day to day operations.
They don't even need to be around orchestrating work but that is the most common case.

To support these use cases Replicante Core provides Orchestrator Actions.
These are actions that are executed outside of the datastore they target and at the control
plane level (either as part of Replicante Core or as a stateless service invoked by Core).

TODO: orchestrator action schema.

TODO: approval of orchestrator actions.

## Actions concurrency and scheduling priorities

When Replicante Core schedules actions it follows defined rules around which actions can be
scheduled, when and where.

The aim of actions is to change the state of the system.

Running multiple actions at the same time is therefore risky as it means difference changes
possibly going into different directions.
On the other hand many activities can be safely performed while other changes are happening.

Replicante Core defines a strict set of rules around action scheduling
to ensure things behave as expected:

1. Any running (node or orchestrator) action executes until the end once it is started,
   even if it means violating the other rules.
2. Node actions can be scheduled in parallel to any other node, but execute serially on each node.
3. Orchestrator actions have a scheduling mode that determine when actions can be scheduled as
   shown in the table below.

Rule 1 exists mainly for safety and simplicity:

* While clashing actions should not happen stopping one after the fact may be more harmful.
* And even if safe to do, which action should we stop?
* And can actions even stop and resume? If an index is being built it has to finish ...

As for orchestrator action scheduling modes: no, you can choose the mode.
Scheduling modes are a property of actions and not action invocations.
If a task is not safe to perform in parallel with others it is never safe and not sometimes.

The exception to this would be running actions in more restrictive modes,
which may be supported in the future.

### Scheduling Priority

To enforce the above rules Replicante Core will schedule actions only when no higher priority
action is waiting to be scheduled.
Additionally, running actions are taken into account to decide if scheduling is allowed.

In the table below:

* Rows indicate the presence of one or more actions in the named state.
* Columns indicate the existence of actions of the given class waiting to be scheduled.
* Cells in the table indicate scheduling of actions is blocked (if the cell is marked)
  or allowed (if the cell is empty)

{{% table-wrapper striped=true %}}
|   | Node | Orchestrator (Exclusive) | Orchestrator (ClusterExclusiveNodeParallel) |
| - | ---- | ------------------------ | ------------------------------------------- |
| \[Running\] Node                                        |   | X |   |
| \[Running\] Orchestrator (Exclusive)                    | X | X | X |
| \[Running\] Orchestrator (ClusterExclusiveNodeParallel) |   | X | X |
| \[Pending\] Node                                        |   | X |   |
| \[Pending\] Orchestrator (Exclusive)                    |   |   | X |
| \[Pending\] Orchestrator (ClusterExclusiveNodeParallel) |   |   |   |
{{% /table-wrapper %}}
