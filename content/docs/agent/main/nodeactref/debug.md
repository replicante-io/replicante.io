---
title: "Debug Actions"
date: 2022-09-03T15:03:05+01:00
draft: false
group: nodeactref
weight: 301
---

Available as the `agent.replicante.io/debug.*` family of identifiers, these actions focus
on debugging, testing and understanding an agent.

None of these action do much useful work but they can be used to:

* Test the node actions system and the agent.
* Understand how node actions work, execute and impact the agent.
* Provide a a way to write demos and examples that actually run without risk to the node.

Node actions can be scheduled directly through the specification API or through Replicante Core.
As a reminder, the is the YAML to apply new node actions to Replicante Core:

```yaml
apiVersion: replicante.io/v0
kind: NodeAction

metadata:
  # Can override the namespace with --namespace=test-namespace
  namespace: default
  # Can override the cluster with --cluster=test-cluster
  cluster: target-cluster-id
  # Can override the cluster with --node=test-node
  node: target-node-id

spec:
  action: agent.replicante.io/debug.${ACTION}
  args: null
```

Each debug action supports different `args` as detailed below.

## Fail

| | |
| --------------- | - |
| Action ID       |`agent.replicante.io/debug.fail` |
| Summary         | Debugging action that always fails |

This action handler always returns an error from its `Action::invoke` implementation.
Mainly useful to test and explore how errors during action execution are handled.

Any `args` specified for the action are ignored.

## Progress

| | |
| --------------- | - |
| Action ID       |`agent.replicante.io/debug.progress` |
| Summary         | Debugging action that progresses over time |

This action will move from the `NEW` state to `RUNNING` on first invocation and then
from `RUNNING` to `DONE` the invocation after.

## Success

| | |
| --------------- | - |
| Action ID       |`agent.replicante.io/debug.success` |
| Summary         | Debugging action that always succeed |

The action succeeds as soon as it is invoked and any `args` to it are ignored.
