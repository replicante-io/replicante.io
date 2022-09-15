---
title: "Debug Actions"
date: 2022-09-02T21:45:36+01:00
draft: false
group: orcactref
weight: 901
---

Available as the `core.replicante.io/debug.*` family of action kinds, these actions focus
on debugging, testing and understanding the system.

None of these action do much useful work but they can be used to:

* Test the orchestrator actions system.
* Understand how orchestrator actions work, execute and impact the rest of the system.
* Provide a a way to write demos and examples that actually run without risk to any cluster.

As a reminder, the is the YAML to apply new actions:

```yaml
apiVersion: replicante.io/v0
kind: OrchestratorAction

metadata:
  # Can override the namespace with --namespace=test-namespace
  namespace: default
  # Can override the cluster with --cluster=test-cluster
  cluster: target-cluster-id

spec:
  action: core.replicante.io/debug.${ACTION}
  args: null
```

Each debug action supports different `args` as detailed below.

## Counting

| | |
| --------------- | - |
| Action ID       |`core.replicante.io/debug.counting` |
| Summary         | Increment a counter every progression before completing |
| Default Timeout | 24 hours |
| Scheduling Mode | Exclusive |

Increment a counter every orchestration cycle, starting from 0 up to the provided `count`.

The action has the following `args`:

* `count`: REQUIRED - `int` - The target to count to.

## Fail

| | |
| --------------- | - |
| Action ID       |`core.replicante.io/debug.fail` |
| Summary         | Fail at the first progression |
| Default Timeout | 1 hour |
| Scheduling Mode | Exclusive |

This action handler always returns an error from its `OrchestratorAction::progress` implementation.
Mainly useful to test and explore how errors during action execution are handled.

The action has the following `args`:

* `wrapped`: OPTIONAL - `bool` - If true the error returned is wrapped in a context.

## Ping

| | |
| --------------- | - |
| Action ID       |`core.replicante.io/debug.ping` |
| Summary         | Return as output the given arguments and complete immediately |
| Default Timeout | 1 hour |
| Scheduling Mode | Exclusive |

The action succeeds as soon as it executes but also "returns" its arguments as part
of it `state_payload` attribute:

```json
{
  "pong": {..args}
}
```

## Success

| | |
| --------------- | - |
| Action ID       |`core.replicante.io/debug.success` |
| Summary         | Complete at first progression |
| Default Timeout | 1 hour |
| Scheduling Mode | Exclusive |

The action succeeds as soon as it executes and any `args` to it are ignored.
