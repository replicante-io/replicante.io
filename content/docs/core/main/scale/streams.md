---
title: "Streams"
date: 2020-03-06T19:39:19Z
draft: false
group: scale
weight: 704
---

Scaling streams is generally left to the streaming platform itself.
Available options vary based on the selected backend.

Replicante Core works on the assumption that streams provide some level of ordering guarantees:

* Messages that share the same key MUST be delivered in the order of publishing to the streaming platform.
* No ordering guarantees are expected among messages that DO NOT share the key.

This expectation usually makes it more difficult to scale streams without, at least partial, downtime.

## Events stream

### Kafka

[Kafka](https://kafka.apache.org/)'s scaling is based on the idea of
[topic partitions](https://kafka.apache.org/documentation/#intro_topics).

Events are streamed to a single topic and partitioned as follow:

* Events that relate to the same managed cluster are partitioned together.
* Events that relate to the same namespace (but not to a cluster) are partitioned together.
* System events (those not relating to either a namespace or a cluster) are partitioned together.

This has implications to scaling kafka topics by adding partitions:
it is difficult to add partitions while maintain ordering guarantees unless
**no writes occur and all events have been processed** prior to scaling partitions.

{{% notice class="danger" %}}
The initial implementation of event streams will not provide support for changes
to the partitions counts while the system is operating.

While future versions may support online partition scaling they will still be a complex operation.
You are advised to conservatively over-provision the number of partitions on event streams to
limit, or even avoid, the need to change the number of partitions while the system is running.

At the same time be mindful of over-provisioning too much as that will over-burden Kafka.
{{% /notice %}}
