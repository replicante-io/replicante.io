---
title: "Examples"
date: 2022-11-07T08:50:00Z
draft: false
spec: platform
weight: 103
---
<!-- markdownlint-disable MD033 -->

## Cloud Compute Services

### Attributes

There are currently no attributes defined for Platforms.
This section exists as a placeholder in case attributes are added in the future.

### Behaviours

{{% table-wrapper striped=true %}}
<table>
<thead>
<tr><th>Behaviour</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Cluster Discovery</td>
<td>

* Nodes are discovered by listing existing instances on the Cloud Compute Service.
  The cluster ID is attached as a tag or service equivalent to each node so they can be grouped.
* The node ID is the compute instance ID as determined by the compute service.
* Each node's agent address is derived from the compute instance attributes:
  * Platforms can provide configuration options on how this works.
  * Agent address is the compute IP address (private IP likely).
  * Agent port can be from Platform configuration, tag detected, other compute service feature.

</td>
</tr>
<tr>
<td>Node Provisioning</td>
<td>

Provisioning is done by creating Cloud Compute Service instances.
How the instance is customised to the correct store software and version is implementation defined.

As this is an example, here is one possible way to achieve this:

1. Platform has access to a catalogue of "create instance" request payload templates.
2. Store software and version determine the template to use.
3. The selected template is rendered into the arguments for a "create instance" request.
4. The "create instance" request is sent to the Cloud Compute Service.

</td>
</tr>
<tr>
<td>Node Deprovisioning</td>
<td>

Deprovisioning is done by deleting Cloud Compute Service instances.

The node ID, and if needed the cluster ID, are used to issue "delete instance" request
to the Cloud Compute Service.

</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

## Kubernetes

A list of namespaces to check is configured when the Kubernetes Platform starts.
This enables one Platform process to manage multiple namespaces but still allow custom scoping.

### Attributes

There are currently no attributes defined for Platforms.
This section exists as a placeholder in case attributes are added in the future.

### Behaviours

{{% table-wrapper striped=true %}}
<table>
<thead>
<tr><th>Behaviour</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>Cluster Discovery</td>
<td>

* List all [pods in namespace] to find nodes.
  * Optionally a label selector can be used to limit the pods to "Platform managed" pods.
* The cluster ID is attached as a label to each pod metadata.
* The agent address is determined using pod annotations:
  1. Value of `k8s.replicante.io/agent-address` if it exists.
  2. Value of `{k8s.replicante.io/agent-schema}://{pod_id}:{k8s.replicante.io/agent-port}`
     if all required attributes are present.
  3. Value of `{platform.config.agent-schema}://{pod_id}:{platform.config.agent-port}`.

</td>
</tr>
<tr>
<td>Node Provisioning</td>
<td>

1. A generated ID (which includes a random component) is generated for the node.
2. A template is located based on store software and version.
3. The template is rendered (with request arguments) into a YAML document.
   * The template attaches the cluster ID as a label to all objects.
   * The template attaches the node ID as a label to all objects.
4. The YAML document is applied.

</td>
</tr>
<tr>
<td>Node Deprovisioning</td>
<td>

All objects with the cluster and node IDs as labels are deleted.

A configurable list of object types is checked in order for objects to delete.
This allows provisioning to create a variety of supported objects without leaving
resources behind on delete.

</td>
</tr>
</tbody>
</table>
{{% /table-wrapper %}}

[pods in namespace]: https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#list-list-or-watch-objects-of-kind-pod
