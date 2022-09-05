---
title: "Store Actions"
date: 2022-09-03T15:03:05+01:00
draft: false
group: nodeactref
weight: 303
---

Available as the `replicante.io/store.*` family of identifiers, these actions focus
on the managed store process itself.

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
  action: replicante.io/store.${ACTION}
  args: null
```

Each debug action supports different `args` as detailed below.

## Stepdown

| | |
| --------------- | - |
| Action ID       |`replicante.io/store.stepdown` |
| Summary         | Request the data store node steps down of leadership duties |

Request of a data store node to relinquish any leadership responsibilities
(such as shard primary role).

When implemented, this should give other nodes in the cluster the chance to take over leadership.

If, however, no nodes in the cluster take over the role this node can keep/re-take leadership.
As such this action does not **guarantee** the node won't be leader of any shard once it completes.

Arguments passed to the action are ignored.

## Stop

| | |
| --------------- | - |
| Action ID       |`replicante.io/store.stop` |
| Summary         | Attempt graceful shutdown of the datastore node |

Request graceful shutdown of the data store node.
graceful shutdown, if implemented by nodes and agents, gives the node a chance to complete
any running operation/queries before shutting down.

Arguments passed to the action are ignored.
