---
title: "Attributes and Behaviours"
date: 2022-11-07T08:50:00Z
draft: false
spec: platform
weight: 101
---
<!-- markdownlint-disable MD033 -->

{{% notice class="warning" %}}
**Alpha state disclaimer**

The specification defined below is in early development cycle
and is subject to (potentially breaking) change.
{{% /notice %}}

## Attributes

There are currently no attributes defined for Platforms.
This section exists as a placeholder in case attributes are added in the future.

## Behaviours

Behaviours are actions we can request of Platforms as well as activities it performs
either in response to commands or automatically.

{{% table-wrapper striped=true %}}
<table>
<thead>
<tr><th>Behaviour</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Cluster Discovery</td>
<td>

The Platform MUST enumerate all existing nodes, grouped by Cluster they below to.

For each cluster, the Platform MUST return:

* The Cluster ID.
* For all existing nodes in the cluster (regardless of "node health"):
  * The Node ID.
  * The network address to connect to the Data Store Agent.

</td>
</tr>
<tr>
<td>Node Provisioning</td>
<td>

The Platform MUST support provisioning of nodes.

Node provisioning is requested with information of the node(s) to provision.
The information provided to the Platform is detailed in the [API reference]({{< ref "./api.md" >}}).

The Platform MUST uses the information to provision the node(s) but
how this information is used is up to the implementation.

</td>
</tr>
<tr>
<td>Node Deprovisioning</td>
<td>

The Platform MUST support deprovisioning (terminating) nodes that it provisioned.

The deprovisioned node MUST NOT be replaced automatically and MUST not appear in the
Cluster Discovery output once deprovisioning is complete.

</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}
