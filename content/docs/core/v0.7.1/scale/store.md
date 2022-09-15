---
title: "Primary Store"
date: 2020-03-06T19:39:07Z
draft: false
group: scale
weight: 702
---

Scaling the primary store is generally left to the primary store itself.
Available options vary based on the selected backend.

### MongoDB

[MongoDB](https://www.mongodb.com/) is the currently recommended backend for the primary store.

A single replica set should be able to handle most installations.
For cases where it is not, MongoDB provides transparent
[sharding](https://docs.mongodb.com/manual/sharding/) support with the use of `mongos`.

{{% notice class="warning" %}}
Replicante Core uses a [pure-rust mongodb driver prototype](https://crates.io/crates/mongodb).  
A more stable driver has recently been release and upgrade will be planned in the future.

While this has not been a problem yet, some issues with performance and/or advanced setups may arise.
If that is the case [please report](https://github.com/replicante-io/replicante/issues) them.
{{% /notice %}}

MongoDB sharding works by dividing the data across different replica sets (shards).
To know how data should be divided and what data is needed by each query, MongoDB needs a
[shard key](https://docs.mongodb.com/manual/sharding/#shard-keys) for each collection.

The selection of a good shard key is critical to the performance of a sharded cluster
and depends on the exact schema of the data stored in each collection.

{{% notice class="danger" %}}
Once a key is selected it is not possible (read: complex and expensive) to change the shard
key of a collection.

As Replicante Core is at the beginning of its path, several features are likely to result in
changes to the schema of the stored data, **including to the optimal sharding key**.

Installations that want to make use of sharded clusters should carefully consider what their
upgrade paths will be if/when the sharding key changes.
{{% /notice %}}

{{% notice class="info" %}}
If you do run a Replicante Core cluster and plan to use sharding we would be very pleased to know.

Please let us know via [gitter](https://gitter.im/replicante-io/community)
or by [opening an issue](https://github.com/replicante-io/replicante/issues).
{{% /notice %}}
