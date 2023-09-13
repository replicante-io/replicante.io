---
title: "Test Actions"
date: 2022-09-03T15:03:05+01:00
draft: false
group: nodeactref
weight: 302
---

Available as the `agent.replicante.io/test.*` family of identifiers, these actions focus
on testing and understanding the agents.

None of these action do much useful work but they can be used to:

* Test and explore the node actions system and connection to the agent.
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
  action: agent.replicante.io/test.${ACTION}
  args: null
```

Each test action supports different `args` as detailed below.

## Fail

| | |
| --------------- | - |
| Action ID       |`agent.replicante.io/test.fail` |
| Summary         | Action that always fails |

This action always returns an error when executed.
Mainly useful to test and explore how errors during action execution are handled.

Any `args` specified for the action are ignored.

## Loop

| | |
| --------------- | - |
| Action ID       |`agent.replicante.io/test.loop` |
| Summary         | Action that increments a counter until a total is reached |

The action implementation increments a counter (tracked in the execution state) every loop.
Once the counter reaches the total count the action succeeds.

The target count to reach can be set with the `args.target` attribute.

## Success

| | |
| --------------- | - |
| Action ID       |`agent.replicante.io/test.success` |
| Summary         | Action that always succeed |

The action succeeds as soon as it is invoked and any `args` to it are ignored.
