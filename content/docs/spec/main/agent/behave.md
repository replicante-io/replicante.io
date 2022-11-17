---
title: "Attributes and Behaviours"
date: 2022-11-07T08:50:30Z
draft: false
spec: agent
weight: 2
---
<!-- markdownlint-disable MD033 -->

{{% notice class="warning" %}}
**Alpha state disclaimer**

The specification defined below is in early development cycle
and is subject to (potentially breaking) change.
{{% /notice %}}

Any (collection of) software that fulfils the attributes and behaviours
of the specification defined in this document is considered a data store.

This aims of the specification are:

* Determine which software can be modelled and how.
* Provide guidance on how agents can be used along a data store to implement the specification.
* Detail what information is available about data stores.
* Detail what actions are available and how can be performed (possibly by agents).
* Enable additional features built on top of this standardised layer.

## Attributes

Attributes are observable properties we expect the data store to expose with no side effects.
They can be fixed at cluster/node creation or they can change over time.

The expectation if for attributes to be cheap to lookup and not require connections
outside of the target node.

Where noted attributes are optional and don't have to be available.
This is particularly important when data stores could provide this information but only
by violating the expectations above, in which case optional attributes should be omitted.

{{% table-wrapper striped=true %}}
<!--
  NOTE:
    Use inline HTML table instead of markdown table so cells can have markdown formatting in.

    Also, indenting 4 or more spaces causes markdown to create a code block.
    This prevent both correct markdown formatting and HTML parsing.
    As a result the HTML tags are not indented.

    All this makes me sad but not much else to do with little effort.
    Maybe hugo short codes could be used to hack something together.
-->
<table>
<thead>
<tr><th>Attribute</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Cluster ID</td>
<td>ID of the cluster, MUST be the same for all nodes in the same cluster.</td>
</tr>
<tr>
<td>Node ID</td>
<td>

Unique ID of the node within the cluster.  
The same Node ID may appear in different clusters but must not appear twice in the same cluster.

</td>
</tr>
<tr>
<td>Agent Version</td>
<td>

Version of the agent process, in [SemVer] format.

</td>
</tr>
<tr>
<td>Data Store Node Version</td>
<td>

Version of the data store process for the node, in [SemVer] format.

</td>
</tr>
<tr>
<td>Node's Shard List</td>
<td>List of all the shards (data units, see the sharding behaviour) currently on the node.</td>
</tr>
<tr>
<td>Shard ID</td>
<td>

For each shard managed by the node, a cluster-unique ID is provided for the shard.
All nodes in the cluster refer to the same shard with the same cluster-unique ID.

</td>
</tr>
<tr>
<td>Shard replication state</td>
<td>

Each independent shard managed by the node has its own replication state attribute.

Each shard can be in one of the following states:

* Primary: the node is responsible for making updates to the shard and propagation to other nodes.
* Secondary: the node holds an up to date copy of the shard and is applying propagated changes.
* Recovering: the node holds a copy of the shard but is re-syncing its content from another node.
* Other: the node holds, or should hold, a copy of the shard but it is in an unknown state.

</td>
</tr>
<tr>
<td>Shard commit offset</td>
<td>

As changes to the data are applied to shards a marker for the shard should be updated.
This marker is the commit offset and represents the last persisted write operation on the shard.

A commit offset can be any monotonically incremented signed integer.
The only time a commit offset can decrease is in the presence of a lost write such as:

* A change that is discarded because it failed to replicate to enough other nodes.
* A restore operation to a prior state.

In any case a lost write indicates that a client-successful write is lost.
This excludes cases such as transaction rollbacks due to constraint violation as these
writes are not reported as successful to the clients.

Examples of commit offsets are:

* Timestamp of the write operation.
* Sequence counter of shard "version number".

When shard commit offsets are reported a unit (seconds, commit number, ...) should be
reported along side. It is expected that the unit of a shard commit offset does not change.

*This attribute is **optional***.

</td>
</tr>
<tr>
<td>Shard replication lag</td>
<td>

For non-primary shards on the node the replication lag attribute SHOULD be provided
if it can be looked up or computed efficiently and without requiring access to other nodes.

Replication lag is a signed 64 bits integer that represents the gap between
the latest change applied to the shard and the latest change applied on the shard's primary.
For example this could be:

* The change timestamp of the shard's primary minus the change timestamp of the shard on this node.
* The number of operations applied on the shard's primary but not yet to the shard on this node.

The unit of measurement for the replication lag MUST be reported where the replication lag is.
For example this could be:

* Seconds.
* Number of operations/commits to apply.
* ...

*This attribute is **optional***.

</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

## Behaviours

Behaviours are things we expect the data store to perform during operation to fulfil its duties.
These cover both overall architectural expectations (such as replication and sharding)
as well as more specific actions (such as cluster initialisation and node management).

{{% table-wrapper striped=true %}}
<table>
<thead>
<tr><th>Behaviour</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Clustering</td>
<td>

Data stores MUST support clustering:

* Cluster nodes are processes running on different instances
  (bare metal, cloud instances, containers, ...).
* Cluster nodes communicate with each other to perform duties.

It is worth noting there is no requirement for nodes to match each other.
This means heterogeneous clusters (nodes with different configuration or software) are supported.

</td>
</tr>
<tr>
<td>Replication</td>
<td>

The data store MUST support data replication across nodes.
Data units, as defined by the sharding behaviour, are replicated independently of each other.

Each data unit MUST have at least one primary node during regular operations.
Additional replication states for data units are defined in the attributes section.

</td>
</tr>
<tr>
<td>Sharding of Data</td>
<td>

The data store MUST organise data into one or more independent units called shards.
Shard independence from other shards means:

* Writes applied to a shard have no impact on and require no input from other shards.
* Shard replication happens in parallel.
* Failures to read/update/replicate a shard don't imply impact other shards.

{{% notice class="info" %}}
It is still possible for multiple shards to fail simultaneously and in the same way.
For example in case of node failure all shards on the node would be equally impacted.

Shard independence apply only to shard failures.
For example if a shard suffers from data corruption the same corruption MUST NOT
impact other shards.
{{% /notice %}}

It is valid to treat data stores that do not implement sharding as data stores with one shard only.

</td>
</tr>
<tr>
<td>Shards Automated Failover</td>
<td>

A failover is an operation where the node currently holding a shard's PRIMARY stops acting as
such and nodes holding SECONDARY copies of the same shard select a the new PRIMARY to replace it.

Data stores MUST automatically detect issues with nodes holding PRIMARY shards and perform
a failover operation to a SECONDARY for each shard.

Data store SHOULD provide an administrative command to perform a voluntary failover.

</td>
</tr>
<tr>
<td>Agent Actions</td>
<td>

Agents actions are the execution unit on which any automation is built.
The agent/data store node is responsible for tracking and executing these actions.

Agents allow clients to schedule as many actions as they like and can start rejecting actions
if too many actions are schedule and have not been processed yet.
Agents MUST execute only one action at a time.
Actions MUST be executed in the order they have been successfully scheduled with the agent.

Agents can provide implementations for any actions they choose.
Agents SHOULD document the actions they provide, their arguments and outputs.

</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

[SemVer]: https://semver.org/
