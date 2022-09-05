---
title: "The Model"
date: 2020-02-18T23:16:29Z
draft: false
group: model
weight: 2
---


{{% notice class="warning" %}}
**Alpha state disclaimer**

The model defined below is in early development cycle
and is subject to (potentially breaking) change.
{{% /notice %}}

Any (collection of) software that fulfils the requirements and expectations
of the model defined in this document is considered a datastore.

The difficulty in defining a model is to find the balance
between generality and specificity:

* The model should be general so it does not impose restrictions on the
  datastores that want to be supported (or on us to support datastores).
* The model also should be specific enough so that it can be reliably operated on.

This aims of the model are:

* Determine which software can be modelled and how.
* Provide guidance on how agents can be used along a datastore to implement the model.
* Detail what information is available about datastores.
* Detail what actions are and how can be performed, possibly by agents.
* Enable additional features built on top of this standardised layer.

## Administration

The datastore MUST provide the following administration information:

* A cluster ID shared by all nodes.
* A cluster-unique ID for the node.
* Version information for both datastore and agent.
  * These can be the same version if there is no agent.

## Clustering

The datastore MUST support clustering by running processes on multiple (virtual or physical)
machine.
Each process in the cluster is a node.

Note that there is no requirement for the process be the same everywhere in the cluster
(same applies to nodes configuration).
This allows the cluster to have heterogeneous components as long as they all follow the model.

## Sharding

The datastore MUST organize the data in one or more shard.
Shards are independent units of data, each with their own primary and secondary nodes.

* Primary nodes determine how shards are changed.
* Secondary nodes sync changes from primary nodes and can select a new primary if the current
  primary fails.

A datastore MUST have at least one shard.  
For datastores that do not support sharding, the entire dataset can be seen as a single shard.

For each shard in the cluster the datastore MUST provide the following information:

* The ID of the shard as known by every node the shard is on.
* The state of the shard with regard to replication, such as primary/secondary state.

Each node in the cluster SHOULD provide the following information for each shard:

* An indicator of when the last persisted write operation happened (commit offset):
  * A commit offset unit (i.e, seconds, commits, ...).
  * A commit offset value (as a signed 64-bits integer).

## Replication

The datastore MUST support a primary/secondary replication system.
This means that each shard at any given time has at most one primary node
with zero or more secondary nodes that replicate the data.

Each node in the cluster MUST provide the following information:

* Which shards are on the node.
* For each shard, what the role on the node is (primary, secondary, other).

Some details about replication require the cluster to be healthy enough to report such data.
Such details may also be expensive to compute or, worse, require connections to non-local nodes.

This information should be provided whenever possible as long as:

* Computing the information only requires local information
  (i.e, it does not require connections to other nodes).
* The information can be computed efficiently.

Each node in the cluster SHOULD provide the following information:

* For each non-primary shard, a replication lag:
  * The replication lag unit (i.e, seconds, commits, etc ...).
  * The replication lag value (as a signed 64-bits integer).
  * It is NOT required for the unit to be the same as the commit offset but it is encouraged.
