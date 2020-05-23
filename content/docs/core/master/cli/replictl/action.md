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

## approve
Approve an action currently pending approval.

```text
$ replictl action approve <ACTION> [OPTIONS]
```

## disapprove
Disapprove (reject) an action currently pending approval.

```text
$ replictl action disapprove <ACTION> [OPTIONS]
```
