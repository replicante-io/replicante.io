---
title: "replictl action"
date: 2020-03-04T21:02:39Z
draft: false
group: cli
weight: 551
---

Group of commands to manage and inspect actions.
See `replictl action --help` for general information.

{{% notice class="info" %}}
Action commands require the following scopes: `namespace`, `cluster`.
{{% /notice %}}

## approve-node-action

Approve a node action currently pending approval.

```text
replictl action approve-node-action <ACTION> [OPTIONS]
```

{{% notice class="info" %}}
Node action approval also requires the `node` scope.
{{% /notice %}}

## approve-orchestrator-action

Approve an orchestrator action that is pending approval.

```text
replictl action approve-orchestrator-action <ACTION> [OPTIONS]
```

## disapprove-node-action

Disapprove (reject) a node action currently pending approval.

```text
replictl action disapprove-node-action <ACTION> [OPTIONS]
```

{{% notice class="info" %}}
Node action disapproval also requires the `node` scope.
{{% /notice %}}

## disapprove-orchestrator-action

Disapprove (reject) an orchestrator action that is pending approval

```text
replictl action disapprove-orchestrator-action <ACTION> [OPTIONS]
```

## list-orchestrator-actions

List known orchestrator actions for a cluster

```text
replictl action list-orchestrator-actions [OPTIONS]
```
