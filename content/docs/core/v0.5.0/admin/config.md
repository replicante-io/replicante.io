---
title: "Configuration"
date: 2020-02-24T22:58:13Z
draft: false
group: admin
weight: 303
---

Replicante provides a large set of configuration options with reasonable defaults.
This supports common use cases where only a handful of options need attention
as well as advanced setup where the user has the power to fine tune most details.


## Required configuration
Some options do not have reasonable defaults so users will have to set them explicitly:

  * [Agents discovery]({{< ref "../features/discovery.md" >}}) (vastly depends on user needs).
  * Coordinator configuration, mainly connection settings: `coordinator.backend` and `coordinator.options`.
  * [Events stream]({{< ref "../features/events.md" >}}) configuration, mainly connection settings: `events.stream.backend` and `events.stream.options`.
  * Storage configuration, mainly connection settings: `storage.backend` and `storage.options`.
  * Tasks queue configuration, mainly connection settings: `tasks.backend` and `tasks.options`.


## Configuration options
All options are documented in the
[example configuration file]({{< versioned "https://github.com/replicante-io/replicante/blob/{version}/replicante.example.yaml" >}})
at the root of the repo.

This file shows all options with their defaults and explains their meaning and available settings.
As mentioned above, common use cases should be able to ignore most options and focus on the
[minimal configuration example]({{< versioned "https://github.com/replicante-io/replicante/blob/{version}/replicante.minimal.yaml" >}}).


{{% notice class="info" %}}
In most cases, details of these options are documented in the features they influence.

Options that don't directly relate to a single feature are instead documented below.
{{% /notice %}}


### Timeouts
Replicante is an event-based, distributed, system.
As such we often expect things to happen within time limits but there is no guarantee that
they will in fact happen at all.

Timeouts are used to ensure that miss-functioning, slow, or unresponsive elements
(agents, processes, dependencies, ...) do not permanently or severely impact the entire system.

The timeout related options allow operators to tune the level of sensibility:

  * Low timeouts improve system responsiveness but require more reliable elements.
  * High timeouts are more forgiving of transient issues at the expense of responsiveness.


Available timeout options:

  * `timeouts.agents_api`: timeout applied to all agent HTTP requests.

Some of replicante dependencies (DB, coordinator, ...) also support timeouts that are
documented along the other options for each dependency.
