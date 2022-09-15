---
title: "Concurrent Agent Fetches"
date: 2010-03-02T13:43:30+01:00
draft: false
group: opts
weight: 102
---

Orchestrating cluster nodes is performed in sequence, one node at a time.
The impact of it is limited to the cluster itself as clusters are processed in parallel.

For small clusters this is fine but as the number of nodes in a
cluster grows the performance penalties grow as well.
For now this is not a problem (mostly because nobody is using replicante yet) but
when managed clusters grow in size nodes should be orchestrated in parallel.

## Why delay improving?

* Replicante Core functionality is not yet product-complete.
* Should not optimise for performance while core features are not implemented.

## Potential improvement

Async programming and futures would be key here since the process is mainly IO bound.
Questions around interleaving of actions/nodes will arise.

### Downsides of the new solution/idea

Async/parallel code comes with a significant complexity increase.

* A task worker would in turn use some sort of thread pool to perform its task.
* Ultimate performance for this part of processing could be achieved with futures/tokio.
  That adds quite a lot of complexity so maybe should be a third step?
  * It could be possible to run fetch processes in a scoped event loop.
  * The main application remains threaded and segregated.
  * Task workers are still dedicated threads too and most task can be sync.
  * Cluster orchestration tasks would be the only to use futures/tokio for async work.
