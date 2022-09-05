---
title: "Rewrite Zookeeper Elections"
date: 2020-02-12T22:58:17Z
draft: false
group: opts
weight: 110
---

The current implementation of elections watches all election children (secondary).
If a non-primary process terminates, every other node will be notified and perform reads
approximately at the same time and could overload zookeeper.

## Why delay improving?

* An implementation currently exists and works.
* Should not optimise while essential features do not exist.
* This will cause problems when scaling only, until then it is safe to wait.

## Potential improvement

The official docs suggest a better implementation that I should aim for:
<https://zookeeper.apache.org/doc/r3.5.5/recipes.html#sc_leaderElection>
