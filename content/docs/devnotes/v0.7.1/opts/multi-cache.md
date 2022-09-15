---
title: "Multi-cache backend"
date: 2020-02-12T21:29:57Z
draft: false
group: opts
weight: 108
---

Replicante will likely introduce a dependency on caching solutions at some point.
At first, a single [redis](https://redis.io/) instance, with replication of course, will be supported.

## Why delay improving?

* We don't cache things yet, no need to improve performance yet.
* Add complexity to both code and operations.
* This will be needed to scale past a single cache node, until that happens there is no need.

## Potential improvement

If a single cache instance becomes too large of a burden or causes too much damage when it becomes
unavailable, introduce a special cache backend to shard cached data:

1. Namespace cache keys (if not already done).
2. Add a new cache backend "multi-cache".
3. It is configured with multiple actual caches (redises).
4. Set a default cache if a namespace/key does not match any rule.
5. Introduce some `namespace -> cache` mapping rules (configuration file? coordinated/dynamic config?)
6. Multi-Cache backend transparently sends requests to the desired instance.

### Downsides the new solution/idea

* Complexity of the code.
* Complexity and operational overhead.
