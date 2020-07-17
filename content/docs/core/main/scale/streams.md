---
title: "Streams"
date: 2020-03-06T19:39:19Z
draft: false
group: scale
weight: 704
---

Scaling streams is generally left to the streaming platform itself.
Available options vary based on the selected backend.

Replicante works on the assumption that streams provide some level of ordering guarantees:

  * Messages that share the same key MUST be delivered in the order of publishing to the streaming platform.
  * No ordering guarantees are expected of messages that do not share the key.

This expectation usually makes it more difficult to scale streams without, at least partial, downtime.


## Events stream

### Kafka
[Kafka](https://kafka.apache.org/)'s scaling is based on the idea of
[topic partitions](https://kafka.apache.org/documentation/#intro_topics).

Events are streamed to a single topic and partitioned as follow:

  * Events that relate to a cluster are partitioned by cluster ID.
  * All other events are partitioned under the `<system>` key.

This has implications to scaling kafka topics by adding partitions:
it is difficult to add partitions while maintain ordering guarantees unless
**no writes occur and all events have been processed** prior to scaling partitions.

{{% notice class="danger" %}}
The initial implementation of event streams will not provide support for changes
to the partitions counts while the system is operating.

While future versions may support online partition scaling they will still be a complex operation.
You are advised to over-provision the number of partitions on event streams to limit,
or even avoid, the need to change the number of partitions while the system is running.
At the same time be mindful of over-provisioning too much as that will complicate Kafka.
{{% /notice %}}
