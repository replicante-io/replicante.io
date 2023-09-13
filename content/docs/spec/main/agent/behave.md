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
<td>Node Status</td>
<td>

Each node in the cluster has a status attribute:

* `Unavailable`: the agent is unable to connect to the node.
* `NotInCluster`: the node is running but it is not part of any cluster.
* `JoiningCluster`: the node is in the process of joining a cluster.
* `LeavingCluster`: the node is in the process of leaving a cluster.
* `Unhealthy`: the agent has confirmed the node has experienced an issue and is unhealthy.
* `Healthy`: the agent can connect to the node and has not noticed any failures.
* `Unknown(reason)`: the agent was unable to determine the sate of the node (and provides a reason).

</td>
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
<tr>
<td>Agent Action Invocation Records</td>
<td>

Agent Actions, described below in the behaviours, run on the nodes.
An invocation record is created every time an action runs on an agent to track its progress.

Invocation records have the following properties specified on creation:

* `args`: Arguments passed to the action when it executes.
* `headers`: Additional metadata attached to the action when it was scheduled.
* `id`: UUID of the action invocation record.
  MUST be unique to the cluster without requiring nodes coordination, hence the use of UUIDs.
* `kind`: Identifier of the action implementation to execute.
* `requester`: Entity (system, user, ...) requesting the execution of the action.

Invocation records have the following properties added by agents:

* `created_ts`: Time the action was first created on the agent.
* `finished_ts`: Time the action entered a final state.
  For completed actions only (either successfully or not).
* `scheduled_ts`: Time the agent recorded the action in the DB.
* `state`: State the action is currently in.
* `state_payload`: If set, where an action implementation can store progress information.

</td>
</tr>
<tr>
<td>Node Attributes Maps</td>
<td>

Nodes MUST expose custom attributes maps: one for information known only when the store process
is running and another for information available even without the store process.

These maps allow agent implementations to expose arbitrary named attributes.
These attributes can be used in Replicante Core to implement logic, match nodes and more.

The attribute names are mapped to values of selected types:

* Strings.
* Numbers.
* Booleans.
* Luck of value (`null`).

Attributes should be scoped to ensure different implementations don't clash.
The `*.replicante.io` scope is reserved for attributes defined by the official project.

Examples:

* `replicante.io/zone`: infrastructure defined failure domain identifier.
* `nats.io/jetstream`: flag to indicate the extra NATS JetStream component is enabled on the node.

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
<td>Dynamic Nodes Membership</td>
<td>

Data stores MUST support dynamically adding and removing nodes from a cluster without
interrupting operations on every node currently in the cluster.

Implementation of dynamic node membership is data store specific but it MUST
respect the properties below.

**New node provisioning**:

When a new node is provisioned it will need to join a cluster before it is fully initialised.
A node can join a cluster in one of the following ways:

* Automatically: a new node knows how to join an existing cluster and will do so when it starts.
* Join a cluster: an agent action run on the new node will make it join an existing cluster.
* Adopt a node: an agent action run on an *existing* node will add the *new* node to its cluster.

**Existing node deprovisioning**:

When a current member of the cluster is deprovisioned it must be forgotten by the cluster it
was a member of.

Nodes may be terminated unexpectedly as a result of error or deprovisioned while network partitions
prevent them from communicating with the rest of the cluster.

For these reasons all clusters MUST provide an agent action to remove and forget a node.
The action will run on an *existing* node in the cluster and MUST be idempotent: a cluster may
be asked to remove a node that is not part of it, in which case the action does nothing.

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

Agent actions are the execution unit on which any automation is built.
The agent/data store node is responsible for tracking and executing these actions.

Agents allow clients to schedule as many actions as they like and can start rejecting actions
if too many actions are schedule and have not been processed yet.
Agents MUST execute only one action at a time.
Actions MUST be executed in the order they have been successfully scheduled with the agent.

Agents can provide implementations for any actions they choose on top of any action required
by this specification document.
Agents SHOULD document the actions they provide, their arguments and outputs.

</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

### Actions

Some behaviours are expected through specific agent actions.
These enable building automation:

{{% table-wrapper striped=true %}}
<table>
<thead>
<tr><th>Action</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>
Action: Cluster Initialisation
<small><pre>agent.replicante.io/cluster.init</pre></small>
</td>
<td>

Initialise an uninitialised cluster.
What this means exactly is dependent on the data store.

**Action arguments**: refer to each data store/agent documentation.

**Action final state**: refer to each data store/agent documentation.

**Maybe Required**: this action is required for data stores that require an explicit
cluster initialisation step.

</td>
</tr>
<tr>
<td>
Action: Add Node
<small><pre>agent.replicante.io/cluster.add</pre></small>
</td>
<td>

Add a new node into an existing cluster.
This action is run on a node that is already part of the cluster to add another node to it.

**Action arguments**: refer to each data store/agent documentation.

**Action final state**: refer to each data store/agent documentation.

**Maybe Required**: this action is required for data stores where new nodes are added to
clusters from existing nodes.

</td>
</tr>
<tr>
<td>
Action: Join Cluster
<small><pre>agent.replicante.io/cluster.join</pre></small>
</td>
<td>

Have a new node join an existing cluster.
This action is run on a new node that is not part of the cluster and will add itself to it.

**Action arguments**: refer to each data store/agent documentation.

**Action final state**: refer to each data store/agent documentation.

**Maybe Required**: this action is required for data stores where new nodes add themselves
to existing clusters.

</td>
</tr>
<tr>
<td>
Action: Remove Node
<small><pre>agent.replicante.io/cluster.remove</pre></small>
</td>
<td>

Remove a node from an existing cluster.
This action is run on a node still in a cluster to remove and forget another node.

The node to remove may have already been terminated and/or removed from the cluster
when the action is called and therefore MUST be idempotent.

**Action arguments**: refer to each data store/agent documentation.

**Action final state**: refer to each data store/agent documentation.

**Maybe Required**: this action is required for data stores where terminated nodes are explicitly
removed from the cluster.

</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

[SemVer]: https://semver.org/
