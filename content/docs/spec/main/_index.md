---
title: "Overview"
date: 2020-02-18T22:37:30+01:00
draft: false
weight: 1
cascade:
  version: main
is_landing: "true"
version_name: Development
---

Specifications are detailed descriptions of how parts of the Replicante ecosystem
integrate with each other and what can be expected of each component.
Using specifications a component can interact with another knowing what can be requested
and what side effects can be expected as a result.

For example the agent specification defines:

* Store node attributes:
  * Simple node attributes such as store software and version.
  * Complex model to observe and manipulate nodes and the data on them.
* Store behaviours: such as durability guarantees and expectations on data replication.
* Complex behaviours: relevant to both store and store nodes such as agent actions.

Specifications include much more detail that this example of course and cover far more
aspects of the components they describe.

## Specifications

{{< row >}}
{{% content-box title="Agents" %}}
Agents are proxies to store nodes.
Replicante defines an agent specification to ensure there is a place for management features:

* The agent can focus on node management, actions and similar.
* The store can focus on storing data and processing queries.

[Agents Specification]({{< ref "agent/intro.md" >}})
{{% /content-box %}}

{{% content-box title="Platforms" %}}
Platforms allow Replicante to interact with the infrastructure layer.

No need to care where nodes run or how they are provisioned/deprovisioned:
platforms are here to abstract all that.

[Platforms Specification]({{< ref "platform/intro.md" >}})
{{% /content-box %}}
{{< /row >}}
