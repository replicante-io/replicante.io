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


## Contexts
{{% notice class="warning" %}}
Authentication and authorization support are not currently implemented.  
They are on the roadmap (because of course they are) and will be implemented as soon as possible.

Because of that, some concepts such as Single-Sign On have been introduced even if they are not complete.
{{% /notice %}}

To know which Replicante Core instance to connect to and how to interact with it, `replictl` uses contexts.
This allows users to create a context for each instance they manage and switch among them when needed.

Context are created, changed, selected and removed with the commands in [`replictl context`]({{< ref "./context.md" >}}).


### Scope and scope overrides
One of the foundational ideas is that generic tasks not tailored to a specific cluster
(such as performing some [`AgentAction`]({{< ref "../../features/actions.md#agent-actions" >}}))
should be transferable from one scope (namespace, cluster, node) to another.

To make this easier `replictl` supports scope attributes:

  * `cluster` can set or override set cluster to operate on.
  * `namespace` can set or override the namespace to operate on.
  * `node` can set or override the node to operate on.

Contexts can store a default value for scope attributtes so they don't need to be repeated
(see [`replictl context change`]({{< ref "./context.md#change" >}})).

In `replictl` scope attributes can be set or overridden with the command line:

  * `--cluster` for the cluster.
  * `--namespace` for the namespace.
  * `--node` for the node.

On top of the command line arguments above scope attributes can be set using environment variables:

  * `RCTL_CLUSTER` to set or override the `--cluster`.
  * `RCTL_NAMESPACE` to set or override the `--namespace`.
  * `RCTL_NODE` to set or override the `--node`.

The command line tool also supports and additional `RCTL_CONTEXT` environment variable to
specify an available context to use.


## Subcommands

  * [`replictl action`]({{< ref "./action.md" >}})
  * [`replictl apply`]({{< ref "./apply.md" >}})
  * [`replictl cluster`]({{< ref "./cluster.md" >}})
  * [`replictl context`]({{< ref "./context.md" >}})
