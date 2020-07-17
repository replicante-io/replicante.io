---
title: "Zookeeper"
date: 2020-03-06T21:14:00Z
draft: false
group: official
weight: 204
---

[Zookeeper](https://zookeeper.apache.org/) is a centralized service for maintaining configuration
information, naming, providing distributed synchronization, and providing group services.


## Supported versions
{{% table-wrapper %}}
| Agent Version | Zookeeper Version |
| ------------- | ----------------- |
| 0.1.0+        | 3.3+              |
{{% /table-wrapper %}}


## Install
Follow the instructions in the [installation]({{< ref "../info/install.md" >}}) page.


## Configuration
```yaml
# Common agents options described in agent.example.yaml
agent: {}
  # ... snip ...


# Zookeeper specific configuration.
zookeeper:
  # Name of the zookeeper cluster.
  # *** Required ***
  #cluster: <CLUSTER_NAME>

  # Host and port (in host:port format) of the zookeeper 4lw server.
  target: "localhost:2181"
```


## Upgrades notes
See the [full changelog]({{< versioned "https://github.com/replicante-io/agents/blob/{version}/zookeeper/CHANGELOG.md" >}})
for all details.
