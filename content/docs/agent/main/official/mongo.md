---
title: "MongoDB"
date: 2020-03-06T21:13:55Z
draft: false
group: official
weight: 203
---

[MongoDB](https://www.mongodb.com/) is a flexible document NoSQL database.

## Supported versions

{{% table-wrapper %}}
| Agent Version | MongoDB Version | MongoDB Mode            |
| ------------- | --------------- | ----------------------- |
| 0.2.0+        | 3.0+ / 3.2+     | Replica Set / Clustered |
| 0.1.0+        | 3.2+            | Replica Set             |
{{% /table-wrapper %}}

## Install

Follow the instructions in the [installation]({{< ref "../info/install.md" >}}) page.

## Configuration

```yaml
# Common agents options described in agent.example.yaml
agent: {}
  # ... snip ...


# MongoDB specific configuration.
mongo:
  # MongoDB connection URI.
  uri: "mongodb://localhost:27017"

  # Timeout (in milliseconds) for selecting an appropriate server for operations.
  timeout: 30000

  # Configure the agent to operate in sharded cluster mode.
  #
  # This section is optional.
  # If missing, sharding mode is disabled.
  # If present, sharding mode is enabled by default but can be disabled.
  sharding:
    # The identifier of the MongoDB sharded cluster.
    # *** Required ***
    #
    # In replica set mode the cluster name is detected as the replica set.
    # In sharded mode this attribute cannot be auto-detected and must be specified.
    cluster_name: 'user-defined-name'

    # Enable or disable sharded mode.
    enable: true

    # Name of the `mongos` node name.
    #
    # If set, the node is expected to be a mongos instance.
    # If null (the default), the node is expected to be a mongod instance.
    mongos_node_name: ~
```

## Upgrades notes

See the [full changelog]({{< versioned "https://github.com/replicante-io/agents/blob/{version}/agents/mongodb/CHANGELOG.md" >}})
for all details.

### Upgrading to 0.2.0

- The API format for `/api/v1/shards` has changed (this would be a breaking change after the 1.0 release).
- The configuration format was changed and existing files may not work.
