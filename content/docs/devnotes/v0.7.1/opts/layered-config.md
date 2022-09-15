---
title: "Layered Configuration"
date: 2020-02-11T23:03:06Z
draft: false
group: opts
weight: 106
---

The current plan is to use global only configurations.
This keeps things simple and manageable.

As Replicante matures and introduces features like organisations,
a global configuration may become too limiting.

## Why delay improving?

* Needs are yet unknown.
* Organisations will have a large impact on the design of this.

## Potential improvement

The idea is to create configuration layers, from more to less specific, that fall back
to less specific layers if the current layer does not have the requested configuration.

### Layers (most generic to most specific)

1. Global configuration (effectively acting as defaults).
2. Per-organisation configuration (when organisations are introduced).
3. Per-cluster configuration (when orgs exist, this would presumably be rare).

### Downsides the new solution/idea

* Complexity
* Some configuration value become eventually consistent.
