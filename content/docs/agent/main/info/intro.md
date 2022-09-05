---
title: "Introduction"
date: 2020-03-06T21:12:57Z
draft: false
group: info
weight: 1
---

Agents are the part of the Replicante ecosystem that ensure datastores conform with the model.

Beside the task of exporting datastores information in the correct format, agents also
implement additional features that datastores do not implement directly such as actions.

## Official Agents

The team behind Replicante Core provides some official agents as well.
This documentation is targeted to official agents or agents built with the [base agent crate].

The community is encouraged to develop many more agents (see below).
If you know of a community developed agent not listed below please open an
[issue](https://github.com/replicante-io/replicante.io/issues/new) so it can be included.

Here is a list of knows agents (in alphabetical order):

* [Kafka]({{< ref "../official/kafka.md" >}}) (official)
* [MongoDB]({{< ref "../official/mongo.md" >}}) (official)
* [Zookeeper]({{< ref "../official/zookeeper.md" >}}) (official)

## Developing community agents

Official agents are built in rust making use of a [base agent crate].
This reduces code duplication and improves consistency across the ecosystem.

Using a shared base crate also mean that:

* Agents don't have to re-implement common functionality that can be provided out of the box.
* Implementation of the communication layer with the core system is taken care of.
* Operational logic (logging, metrics, tracing, ...) is provided.
* Many more features and tools ...

If you are looking to build a new agent in [rust](https://www.rust-lang.org/) take advantage of the
[`replicante_agent`](https://docs.rs/replicante_agent)
base crate to speed up the development and help us improve it.

[base agent crate]: https://github.com/replicante-io/agents/tree/main/libs/rust/sdk
