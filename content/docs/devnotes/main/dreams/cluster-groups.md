---
title: "Cluster Groups"
date: 2020-02-12T23:17:23Z
draft: false
group: dreams
weight: 204
---

Make Replicante aware of cluster dependences?
An example would be kafka that relies on zookeeper.

The advantage is that issues detected on Kafka while zookeeper is down can be
correctly attributed to zookeeper and not kafka.
