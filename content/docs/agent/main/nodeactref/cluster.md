---
title: "Cluster Actions"
date: 2022-09-03T15:03:05+01:00
draft: false
group: nodeactref
weight: 301
---

The agent specification defines some
[actions]({{< docs-link "spec" "main" "agent/behave#actions" >}}) that are expected:

{{% table-wrapper %}}
| Action | Description |
| ------ | ----------- |
| `agent.replicante.io/cluster.init` | Initialise an uninitialised cluster |
| `agent.replicante.io/cluster.add` | Add a new node into an existing cluster |
| `agent.replicante.io/cluster.join` | Have a new node join an existing cluster |
| `agent.replicante.io/cluster.remove` | Remove a node from an existing cluster |
{{% /table-wrapper %}}
