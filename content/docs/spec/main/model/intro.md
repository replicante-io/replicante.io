---
title: "Introduction"
date: 2020-02-18T23:02:13Z
draft: false
group: model
weight: 1
---

Datastores, even when very different if purpose, often follow very similar
approaches to clustering, high availability, failover, and more.

The aim of this specification is to define a
[model](https://en.wikipedia.org/wiki/Conceptual_model) that details the
attributes, behaviours, and expectations needed of datastores.
After that, we can view and operate on datastores through this model
and expect the same results regardless of the software being manipulated.

## What is a datastore?

A datastore is any software that stores state.
State is some information that, if lost, can't easily be regenerated.

For example:

* A list of users is state: if lost, users would have to re-register.
* A cached web page is NOT state: if lost, the page can be fetched from the origin.

This, combined with the fact that individual datastore nodes can store up to several terabytes
of data, means that simple operations may become expensive and/or risky.
