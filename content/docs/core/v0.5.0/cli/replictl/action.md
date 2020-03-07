---
title: "replictl action"
date: 2020-03-04T21:02:39Z
draft: false
group: cli
weight: 551
---

Group of commands to manage and inspect actions.
See `replictl action --help` for general information.

## approve
Approve an action currently pending approval.

```text
$ replictl action --action <ACTION> --cluster <CLUSTER> --namespace <NAMESPACE> approve [OPTIONS]
```

## disapprove
Disapprove (reject) an action currently pending approval.

```text
$ replictl action --action <ACTION> --cluster <CLUSTER> --namespace <NAMESPACE> disapprove [OPTIONS]
```
