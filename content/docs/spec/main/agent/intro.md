---
title: "Introduction"
date: 2022-11-07T08:50:00Z
draft: false
spec: agent
weight: 1
---

Data stores, even when very different in purpose, often follow very similar
approaches to clustering, high availability, failover, and more.

The aim of this specification is to define a
[model](https://en.wikipedia.org/wiki/Conceptual_model) that details the
attributes, behaviours, and expectations needed of data stores.

While the focus is describing data stores, the specification does so with support of agents.
Agents are processes on top of a data store nodes to provide additional management functions that
are not part of data store duties as well as an interface abstraction point.

## What is a data store?

A data store is any software that stores state.
State is some information that, if lost, can't easily be regenerated.

For example:

* A list of users is state: if lost, users would have to re-register.
* A cached web page is NOT state: if lost, the page can be fetched from the origin.

This, combined with the fact that individual data store nodes can store up to several terabytes
of data, means that simple operations may become slow, expensive and/or risky.

## In this specification

* [Attributes and Behaviours]({{< ref "./behave.md" >}}) details what we can know
  of data stores and data store nodes and what they can do.
* The [API Reference]({{< ref "./api.md" >}}) is available for both agent developers and clients.
* [Examples]({{< ref "./examples.md" >}}) are then provided of how some selected database software
  map to this specification.
* The [CHANGELOG]({{< ref "./changelog.md" >}}) page details the evolution of this specification.
