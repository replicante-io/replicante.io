---
title: "Introduction"
date: 2022-11-07T08:50:00Z
draft: false
spec: platform
weight: 100
---

Data store nodes have to run somewhere.
Replicante uses Platforms as the interface to the control plane that manages where nodes run.
Platforms therefore provide the ability to add/remove/manage data store nodes programmatically.

Platforms therefore can be physical machines, cloud instances, containers
or anywhere else a process can run.

## What are Platforms and Control Planes?

In the context of the Replicante Project:

* A Platform Control Plane is an entity that manages environments for data store nodes to run in.
* A Platform is an interface between Replicante components and a Platform Control Plane.

This description is intentionally vague because of the many many ways that exist to manage nodes.
Restricting the definition of a Platform Control Plane would needlessly prevent integration
with existing and new systems alike.

The rest of the specification details expectations of what Platforms can do and how such
requests are made (and by extension of Platform Control Planes).

## In this specification

* [Attributes and Behaviours]({{< ref "./behave.md" >}}) details what we can know
  of Platforms and what they can do.
* The [API Reference]({{< ref "./api.md" >}}) is available for both Platform developers and clients.
* [Examples]({{< ref "./examples.md" >}}) are then provided of Platforms using common
  compute orchestration projects and/or cloud services.
* The [CHANGELOG]({{< ref "./changelog.md" >}}) page details the evolution of this specification.
