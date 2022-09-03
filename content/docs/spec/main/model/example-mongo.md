---
title: "Example: MongoDB"
date: 2020-02-18T23:18:31Z
draft: false
group: model
weight: 5
---

## Replica Set

* Administration:
  * A cluster name shared by all nodes: replica set name from [`replSetGetStatus`].
  * A cluster-unique name for the node: node name from [`replSetGetStatus`].
  * Datastore version information: [`buildInfo`].

* Clustering: MongoDB in Replica Set mode supports clustering.

* Sharding: (A shard is the entire replica set)
  * A shard ID: Replica Set name.
  * [Optional] An indicator of when the last write operation happened (commit offset):
    * A commit offset unit (i.e, seconds, commits, ...): seconds (since epoch).
    * A commit offset value (as a signed 64-bits integer): [`replSetGetStatus`].

* Replication:
  * Which shards are on the node: a single shard named after the replica set.
  * For each shard, what the role on the node is: [`replSetGetStatus`].
  * [Optional] For each non-primary shard, the replication lag:
    * The replication lag unit (i.e, seconds, commits, ...): seconds.
    * The replication lag value (as a signed 64-bits integer): [`replSetGetStatus`].

## Sharded Cluster

* Administration:
  * A cluster name shared by all nodes: user defined in agent configuration.
  * A cluster-unique name for the node:
    * `mongod`: name field from [`replSetGetStatus`].
    * `mongos`: user defined in agent configuration.
  * Version information: [`buildInfo`].

* Clustering:
  * `mongod` instances forming the configuration Replica Set.
  * `mongod` instances forming shard Replica Sets.
  * `mongos` instances routing queries.

* Sharding:
  * A shard is ...:
    * `mongod`: a shard is one of the Replica Sets storing the data.
    * `mongos`: `mongos` instances have no shards on them.
  * A shard ID: the shard's RS name.
  * [Optional] An indicator of when the last write operation happened (commit offset):
    * A commit offset unit (i.e, seconds, commits, ...): seconds (since epoch).
    * A commit offset value (as a 64-bits integer): [`replSetGetStatus`].

* Replication:
  * Which shards are on the node: a single shard named as the replica set.
  * For each shard, what the role on the node is: [`replSetGetStatus`]
  * [Optional] For each non-primary shard, the replication lag:
    * The replication lag unit (i.e, seconds, commits, ...): seconds.
    * The replication lag value (as a 64-bits integer): [`replSetGetStatus`].

[`buildInfo`]: https://docs.mongodb.com/manual/reference/command/buildInfo/
[`replSetGetStatus`]: https://docs.mongodb.com/manual/reference/command/replSetGetStatus/
