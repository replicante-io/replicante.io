---
title: "replictl"
date: 2020-03-04T20:29:45Z
draft: false
group: cli
weight: 550
---

Replicante `replictl` is a command line tool to interact with Replicante
and the clusters it manages.

{{% notice class="warning" %}}
Compatibility between different `replictl` and Replicante versions is not guaranteed.

In general the same version should be used for both the cluster and `replictl`.
{{% /notice %}}

`replictl` offers a sub-command based structure like [git](https://git-scm.com/)
and [cargo](https://doc.rust-lang.org/cargo/index.html).

Use `replictl --help` to explore available commands and sub-commands.


## Profiles
{{% notice class="warning" %}}
Authentication and authorization support are not currently implemented.  
They are on the roadmap (because of course they are) and will be implemented as soon as possible.

Because of that, some concepts such as Single-Sign On have been introduced even if they are not complete.
{{% /notice %}}

To know which Replicante Core instance to connect to and how, `replictl` uses profiles.
This allows users to create a profile for each instance they manage and switch among them when needed.

Profiles are created, activated and removed with the commands in [`replictl sso`]({{< ref "./sso.md" >}}).


## Subcommands

  * [`replictl action`]({{< ref "./action.md" >}})
  * [`replictl apply`]({{< ref "./apply.md" >}})
  * [`replictl cluster`]({{< ref "./cluster.md" >}})
  * [`replictl sso`]({{< ref "./sso.md" >}})
