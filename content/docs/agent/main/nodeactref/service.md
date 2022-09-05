---
title: "Service Actions"
date: 2022-09-03T15:03:05+01:00
draft: false
group: nodeactref
weight: 302
---

Available as the `replicante.io/service.*` family of identifiers, these actions focus
on the managed store process through a service supervisor.

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
  action: replicante.io/service.${ACTION}
  args: null
```

Each debug action supports different `args` as detailed below.

## Graceful Restart

| | |
| --------------- | - |
| Action ID       |`replicante.io/service.graceful.restart` |
| Summary         | Gracefully stop the datastore, if supported, and stop/start the service |

Performs the following actions in sequence:

1. Attempts to `replicante.io/store.stop` the data store node, if the action is available.
2. Stops the data store node with `replicante.io/service.stop`.
3. Starts the data store node with `replicante.io/service.start`.

Arguments passed to the action are ignored.

## Graceful Stop

| | |
| --------------- | - |
| Action ID       |`replicante.io/service.graceful.stop` |
| Summary         | Gracefully stop the datastore, if supported, and stop the service |

Performs the following actions in sequence:

1. Attempts to `replicante.io/store.stop` the data store node, if the action is available.
2. Stops the data store node with `replicante.io/service.stop`.

Arguments passed to the action are ignored.

## Restart

| | |
| --------------- | - |
| Action ID       |`replicante.io/service.restart` |
| Summary         | Stop/Start the data store service |

Performs the following actions in sequence:

1. Stops the data store node with `replicante.io/service.stop`.
2. Starts the data store node with `replicante.io/service.start`.

Arguments passed to the action are ignored.

## Start

| | |
| --------------- | - |
| Action ID       |`replicante.io/service.start` |
| Summary         | Start the data store service |

Start the data store node through a service supervisor.
The service supervisor configuration is managed in the agent configuration file.

Arguments passed to the action are ignored.

## Stop

| | |
| --------------- | - |
| Action ID       |`replicante.io/service.stop` |
| Summary         | Stop the data store service |

Stop the data store node through a service supervisor.
The service supervisor configuration is managed in the agent configuration file.

Arguments passed to the action are ignored.
