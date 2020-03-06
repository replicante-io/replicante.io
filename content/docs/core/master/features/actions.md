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


## Agent Actions
Agent actions are defined in the [specification]({{% docs-link "spec" "stable" "agent/intro#actions" %}})
and are executed on a specific agents.

The YAML object for agent actions has the following specification:
```yaml
apiVersion: replicante.io/v0
kind: AgentAction

metadata:
  # Can override the namespace with --namespace=test-namespace
  namespace: default
  # Can override the cluster with --cluster=test-cluster
  cluster: target-cluster-id
  # Can override the namespace with --node=test-node
  node: target-node-id

spec:
  # Trigger a debug action that executes two dummy steps and then successfully completes.
  action: replicante.debug.progress
  # Pass additional arguments as structured data.
  args:
    options: 'available options change based on the action'
    format: 'any structured YAML object is fine'
```


## Approving Actions
Actions are granted approval by default when they are applied.

To require explicit approval before an action is scheduled onto the target
node you can set the `approval` metadata attribute to `required`.

Requiring approval for an action means that an action can be created without
executing it and someone else can approve it after review.
The action executed on approval is exactly the one applied with no change allowed.

```yaml
metadata:
  # Require explicit approval before the action is scheduled.
  approval: required
```
