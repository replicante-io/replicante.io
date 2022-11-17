---
title: "Examples"
date: 2022-11-07T08:50:30Z
draft: false
spec: agent
weight: 4
---
<!-- markdownlint-disable MD033 -->

## Kafka

Targeting Kafka version 1.0.

### Attributes

{{% table-wrapper striped=true %}}
<table>
<thead>
<tr><th>Attribute</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Cluster ID</td>
<td>User-defined in agent configuration</td>
</tr>
<tr>
<td>Node ID</td>
<td>

Value of the [`kafka.server:type=app-info,id=ID`] JMX MBean.

</td>
</tr>
<tr>
<td>Agent Version</td>
<td>Provided by the agent</td>
</tr>
<tr>
<td>Data Store Node Version</td>
<td>

Value of the [`kafka.server:type=app-info`] JMX MBean.

</td>
</tr>
<tr>
<td>Node's Shard List</td>
<td>

Need to consult each topic's partition map zookeeper node (`/brokers/topics/PARTITION`).

</td>
</tr>
<tr>
<td>Shard ID</td>
<td>

Derived by combining topic and partition: `TOPIC/PARTITION`.

</td>
</tr>
<tr>
<td>Shard replication state</td>
<td>

Need to consult each topic's partition map zookeeper node (`/brokers/topics/PARTITION`).

</td>
</tr>
<tr>
<td>Shard commit offset</td>
<td>

* Unit: offset.
* Value: [topic offsets].

</td>
</tr>
<tr>
<td>Shard replication lag</td>
<td>

* Unit: number of messages.
* Value: [`kafka.server:type=FetcherLagMetrics,name=ConsumerLag,clientId=ReplicaFetcherThread-0-LEADER_ID,topic=TOPIC,partition=PARTITON_ID`] JMX MBean.

</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

### Behaviours

{{% table-wrapper striped=true %}}
<table>
<thead>
<tr><th>Behaviour</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Clustering</td>
<td>Set of Kafka broker nodes</td>
</tr>
<tr>
<td>Replication</td>
<td>Kafka brokers automatically replicate topics</td>
</tr>
<tr>
<td>Sharding of Data</td>
<td>Each topic's partition is an independent shard</td>
</tr>
<tr>
<td>Shards Automated Failover</td>
<td>Kafka provides automated failover</td>
</tr>
<tr>
<td>Agent Actions</td>
<td>Provided by the agent</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

## MongoDB Replica Set

Built targeting MongoDB 3.2.

### Attributes

{{% table-wrapper striped=true %}}
<table>
<thead>
<tr><th>Attribute</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Cluster ID</td>
<td>

Replica Set ID from [`replSetGetStatus`]

</td>
</tr>
<tr>
<td>Node ID</td>
<td>

Node name from [`replSetGetStatus`]

</td>
</tr>
<tr>
<td>Agent Version</td>
<td>Provided by the agent</td>
</tr>
<tr>
<td>Data Store Node Version</td>
<td>

From the output of the [`buildInfo`] command

</td>
</tr>
<tr>
<td>Node's Shard List</td>
<td>The Replica Set is the only shard</td>
</tr>
<tr>
<td>Shard ID</td>
<td>

The Replica Set name from [`replSetGetStatus`]

</td>
</tr>
<tr>
<td>Shard replication state</td>
<td>

The Replica Set node status from  [`replSetGetStatus`]

</td>
</tr>
<tr>
<td>Shard commit offset</td>
<td>

* Unit: seconds (since epoch).
* Value: The most recent oplog timestamp from [`replSetGetStatus`].

</td>
</tr>
<tr>
<td>Shard replication lag</td>
<td>

The lag is calculated as the oplog time for the PRIMARY node and the oplog time for the
current node as reported by [`replSetGetStatus`].
If no PRIMARY node is found the lag is not reported.

The unit for lag is seconds.

</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

### Behaviours

{{% table-wrapper striped=true %}}
<table>
<thead>
<tr><th>Behaviour</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Clustering</td>
<td>The Replica Set is the cluster</td>
</tr>
<tr>
<td>Replication</td>
<td>Replica Set provides replication</td>
</tr>
<tr>
<td>Sharding of Data</td>
<td>No sharding, the whole Replica Set is considered the one and only shard</td>
</tr>
<tr>
<td>Shards Automated Failover</td>
<td>Replica Set provides automated failover</td>
</tr>
<tr>
<td>Agent Actions</td>
<td>Provided by the agent</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

## Zookeeper

Built targeting Zookeeper version 3.3.

### Attributes

{{% table-wrapper striped=true %}}
<table>
<thead>
<tr><th>Attribute</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Cluster ID</td>
<td>User-defined in agent configuration</td>
</tr>
<tr>
<td>Node ID</td>
<td>

`serverId` value of the [`conf`] command output

</td>
</tr>
<tr>
<td>Agent Version</td>
<td>Provided by the agent</td>
</tr>
<tr>
<td>Data Store Node Version</td>
<td>

From the output of either [`envi`] or [`srvr`] command

</td>
</tr>
<tr>
<td>Node's Shard List</td>
<td>The Zookeeper Ensemble is the only shard</td>
</tr>
<tr>
<td>Shard ID</td>
<td>The Cluster ID</td>
</tr>
<tr>
<td>Shard replication state</td>
<td>

`Mode` value of the [`srvr`] command output

</td>
</tr>
<tr>
<td>Shard commit offset</td>
<td>

* Unit: offset.
* Value: the `Zkid` value of the [`srvr`] command.

</td>
</tr>
<tr>
<td>Shard replication lag</td>
<td>Unavailable (would need access to the PRIMARY node)</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

### Behaviours

{{% table-wrapper striped=true %}}
<table>
<thead>
<tr><th>Behaviour</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Clustering</td>
<td>The Zookeeper nodes forming the Ensemble</td>
</tr>
<tr>
<td>Replication</td>
<td>Zookeeper provides replication</td>
</tr>
<tr>
<td>Sharding of Data</td>
<td>No sharding, the whole Ensemble is considered the one and only shard</td>
</tr>
<tr>
<td>Shards Automated Failover</td>
<td>Zookeeper Ensemble provides automated failover</td>
</tr>
<tr>
<td>Agent Actions</td>
<td>Provided by the agent</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

[`kafka.server:type=app-info`]: https://kafka.apache.org/documentation/#monitoring
[`kafka.server:type=app-info,id=ID`]: https://kafka.apache.org/documentation/#monitoring
[`kafka.server:type=FetcherLagMetrics,name=ConsumerLag,clientId=ReplicaFetcherThread-0-LEADER_ID,topic=TOPIC,partition=PARTITON_ID`]: https://kafka.apache.org/documentation/#monitoring
[topic offsets]: https://docs.rs/kafka/0.7.0/kafka/client/struct.KafkaClient.html#method.fetch_offsets

[`buildInfo`]: https://docs.mongodb.com/manual/reference/command/buildInfo/
[`replSetGetStatus`]: https://docs.mongodb.com/manual/reference/command/replSetGetStatus/

[`conf`]: https://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_zkCommands
[`envi`]: https://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_zkCommands
[`srvr`]: https://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_zkCommands
