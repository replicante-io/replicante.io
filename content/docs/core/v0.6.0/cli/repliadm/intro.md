---
title: "repliadm"
date: 2020-03-04T20:53:08Z
draft: false
group: cli
weight: 502
---

Replicante `repliadm` is a command line tool to help with instance maintenance
and many occasional or one-off operational and management tasks.


{{% notice class="warning" %}}
The features described in this section strongly depend on the version
of `repliadm` being the same as the version of Replicante core.
{{% /notice %}}

{{% notice class="info" %}}
Some of the features in `repliadm` need access to the replicante core configuration and services.

For example, the [`repliadm validate all`]({{< ref "./validate.md#all" >}}) command will need access
to the configured storage layer to operate.
{{% /notice %}}

`repliadm` offers a sub-command based structure like [git](https://git-scm.com/)
and [cargo](https://doc.rust-lang.org/cargo/index.html).

USe `repliadm --help` to explore available commands and sub-commands.

## Subcommands

  * [`repliadm coordinator`]({{< ref "./coordinator.md" >}})
  * [`repliadm validate`]({{< ref "./validate.md" >}})
  * [`repliadm versions`]({{< ref "./versions.md" >}})
