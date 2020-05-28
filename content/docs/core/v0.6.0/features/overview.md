---
title: "Overview"
date: 2020-02-23T23:04:00Z
draft: false
group: feature
weight: 101
---

## Actions
Schedule tasks to manage one-off and periodic activities from a central observation point.  
<!-- Watch as the system schedules and execute actions to converge clusters to your desired state. -->


## Cluster discovery
A single inventory for all your servers/instances should be all that you need.

Inspired by [Prometheus](https://prometheus.io/), Replicante uses
[cluster discovery]({{< ref "./discovery.md" >}}) to know what agents it needs to manage and how
to connect to them.


## Events
Know what happens, when it happens, how the system evolved over time.
[Events]({{< ref "./events.md" >}}) are how Replicante knows what is happening and you should know too.


## Introspection
Your user's data is important.
Being able to trust the software that manages you datastore is important as well.

Words are cheap, trust is not: replicante provides [introspection]({{< ref "./introspect.md" >}})
tools and integrations to let operators monitor and understand what the system is doing and why.


## WebUI
Comfortably monitor and manage clusters from your browser through the [WebUI]({{< ref "./webui.md" >}}).
