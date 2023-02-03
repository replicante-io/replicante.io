---
title: "Platform Actions"
date: 2023-02-03T21:08:36+01:00
draft: false
group: orcactref
weight: 903
---

Available as the `platform.replicante.io/*` family of action kinds,
these actions enable interaction with Replicante Platforms.

Each platform action supports different `args` as detailed below.

## Node Provisioning

| | |
| --------------- | - |
| Action ID       |`platform.replicante.io/node.provision` |
| Summary         | Submit a node provisioning request to a Platform |
| Default Timeout | 10 minutes |
| Scheduling Mode | Exclusive |

Cluster nodes can be provisioned using [Replicante Platforms].

This action is used by the cluster orchestration logic as well as users to request
the provisioning of a new node in a cluster.

The action completes as soon as the platform acknowledges the provisioning request
but does NOT have to wait for the node to be available.

The full cluster declaration must be provided to the action's `args` along side a reference
to the Platform to provision nodes with:

```yaml
args:
  platform_ref:
    #namespace: infra
    name: playground

  cluster:
    cluster_id: manual-mongo-rs
    store: mongo/rs
    store_version: '3.4'
    nodes:
      default:
        desired_count: 3
        node_class: play.mode

  provision:
    node_group_id: default
```

[Replicante Platforms]: https://www.replicante.io/docs/spec/main/platform/intro/
