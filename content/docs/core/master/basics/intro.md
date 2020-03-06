---
title: "Introduction"
date: 2020-02-22T18:24:53Z
draft: false
group: basics
weight: 1
---

Welcome to safe datastore orchestration.

Replicante is an open source, data-driven, orchestration system built specifically for datastores.

Orchestration is a known concept and there are some open source frameworks to implement it.
To remain general purpose, these frameworks mostly focus on providing an event bus and task
scheduling with APIs to emit events and rules to react to them.

While very powerful, this approach means it is up to the user to implement orchestration tasks
as well as monitoring triggers.
The result often is overly-specific, fragile, set-ups that are hard to manage and share.

Replicante aims to avoid some of these shortcomings at the expense of generalisation:
a [well defined specification]({{% docs-link "spec" "stable" %}}) document determines
what a datastore is and what it can do.
Armed with this knowledge Replicante can natively emit events with useful and consistent context
regardless of software in use or its version.


## Where to start?
{{% notice class="success" %}}
If all you are looking for this time is a place to mess about and experiment
you can get a container-based local setup locally in minutes.

Follow the steps in the [quick start]({{< ref "./quick-start/index.md" >}})
guide to start exploring while you read this documentation.
{{% /notice %}}

  * Read the [architecture overview]({{< ref "./architecture/index.md" >}}) to understand how the system fits together.
  * Get familiar with the essential [concepts]({{< ref "./concepts.md" >}}).
  * Checkout the [features showcase]({{< ref "../features/overview.md" >}}) if you are looking for something specific.
