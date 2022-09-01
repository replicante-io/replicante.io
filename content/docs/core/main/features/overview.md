---
title: "Overview"
date: 2020-02-23T23:04:00Z
draft: false
group: feature
weight: 101
---

## Node and Orchestrator Actions

Schedule tasks to manage one-off and periodic activities from a central observation point.
<!-- Watch as the system schedules and execute actions to converge clusters to your desired state. -->

Actions execute either on nodes or can run from Replicante Core to manipulate the cluster as a whole.

## Cluster discovery

A single inventory for all your servers/instances should be all that you need.

Inspired by [Prometheus](https://prometheus.io/), Replicante uses
[cluster discovery]({{< ref "./discovery.md" >}}) to know what nodes it needs to manage
and how to connect to them.

## Events

Know what happens, when it happens, how the system evolved over time.
[Events]({{< ref "./events.md" >}}) show what is happening to both you and the system so choices
can be made and understood better.

## Introspection

Your user's data is important.
Being able to trust the software that manages your datastore is important as well.

Words are cheap, trust is not: Replicante provides [introspection]({{< ref "./introspect.md" >}})
tools and integrations to let operators monitor and understand what the system is doing and why.

## WebUI

Get a quick look into your clusters from the [WebUI]({{< ref "./webui.md" >}}).
