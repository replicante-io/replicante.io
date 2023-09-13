---
title: "Introduction"
date: 2020-03-06T21:12:57Z
draft: false
group: info
weight: 1
---

Agents are the part of the Replicante ecosystem that ensure stores conform with the specification.

Beside the task of exporting stores information in the correct format, agents also
implement additional features that stores do not implement directly such as actions.

## Official Agents

The Replicante Core project provides some official agents as well.
This documentation is targeted to official agents but much of it
can be useful for all agents built with the [Agent SDK].

The community is encouraged to develop many more agents (see below).
If you know of a community developed agent not listed below please open an
[issue](https://github.com/replicante-io/replicante.io/issues/new) so it can be included.

Here is a list of knows agents (in alphabetical order):

* [MongoDB]({{< ref "../official/mongo.md" >}}) (official)

## Developing community agents

Official agents are built in rust making use of the [Agent SDK].
This reduces code duplication and improves consistency across the ecosystem.

Using an SDK also mean that:

* Agents don't have to re-implement common functionality that can be provided out of the box.
* Implementation of the communication layer with the core system is taken care of.
* Operational features (logging, metrics, tracing, ...) are provided.
* And more ...

If you are looking to build a new agent in [rust](https://www.rust-lang.org/) take advantage
of the [Agent SDK] to speed up the development and help improve the SDK itself.

[Agent SDK]: https://github.com/replicante-io/replisdk-rust
