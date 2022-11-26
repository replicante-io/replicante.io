---
title: "API Reference"
date: 2022-11-07T08:50:00Z
draft: false
spec: platform
weight: 102
---
<!-- markdownlint-disable MD033 -->

{{% notice class="warning" %}}
**Alpha state disclaimer**

The specification defined below is in early development cycle
and is subject to (potentially breaking) change.
{{% /notice %}}

## Cluster Discovery Response

The pseudo-code below describes the payload for a cluster discovery response.
In the API this is encoded as a JSON object but applications should use typed objects when possible.

```rust
struct ClusterDiscover {
  /// ID of the discovered cluster.
  cluster_id: String,

  /// List of all the nodes in the cluster
  nodes: List<ClusterDiscoveryNode>,
}

struct ClusterDiscoveryNode {
  /// Address to connect to the node’s agent service.
  agent_address: String,

  /// Platform defined ID on the node.
  node_id: String,
}

struct ClusterDiscoverResponse {
  /// List of clusters on the platform.
  clusters: List<ClusterDiscover>,
}
```

## Node Provision Request and Response

The pseudo-code below describes the payload for a Node Provision request.
In the API this is encoded as a JSON object but applications should use typed objects when possible.

```rust
struct NodeProvisionRequest {
  /// Attributes about the cluster the node should be provisioned in.
  cluster: {
    /// Additional attributes attached to all nodes in the cluster.
    /// These attributes can be used by the Platform to customise nodes in the cluster.
    attributes: Map<String, JSON>,

    /// ID of the cluster to add the node to.
    cluster_id: String,

    /// Software for the store to provision (i.e, mongodb, zookeeper, ...).
    store: String,

    /// Version string for store nodes.
    store_version: String,

    /// Map of node group configurations.
    /// A cluster can be composed of differently configured nodes.
    nodes: {
      [node_group_id]: {
        /// Additional attributes for nodes in this group.
        /// Extends `cluster.attributes` or override values with the same key.
        attributes: Map<String, JSON>,

        /// Number of overall desired nodes for this group.
        desired_count: u32,

        /// Platform specific class of node to provision (such as instance type).
        /// If a platform does not support node types this can be anything.
        node_class: String,

        /// Version string for store nodes in this group, defaults to `cluster.store_version`.
        version: Option<String>
      }
    }
  },

  /// Node provisioning information.
  provision: {
    /// ID of the node group to provision.
    node_group_id: String,
  }
}

struct NodeProvisionResponse {
  /// Number of nodes being provisioned by this request.
  count: u32,

  /// If available, the Platform can return a list of node IDs being provisioned.
  node_ids: Option<List<String>>,
}
```

## Node Deprovisioning Request

The pseudo-code below describes the payload for a Node Deprovision request.
In the API this is encoded as a JSON object but applications should use typed objects when possible.

```rust
struct NodeDeprovisionRequest {
  /// ID of the cluster the node should be a member of.
  cluster_id: String,

  /// ID of the node to deprovision.
  node_id: String,
}
```

## Endpoints

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/discover</div>
  <div class="desc get rtl">Returns all clusters on the Platform</div>
</div>

The endpoint expects no arguments and will return all clusters on known the platform.

A successful response payload MUST be a JSON encoded `ClusterDiscoveryResponse`.

<div class="rest">
  <div class="method post">POST</div>
  <div class="url post">/provision</div>
  <div class="desc post rtl">Request the provisioning of new node(s)</div>
</div>

The body of this request MUST be a JSON encoded `NodeProvisionRequest`.

A successful response payload MUST be a JSON encoded `NodeProvisionResponse`.

A Platform can reject invalid requests with a 4xx status code:

* If a required attribute is missing.
* If the value provided for any attribute is not valid for that attribute.

<div class="rest">
  <div class="method post">POST</div>
  <div class="url post">/deprovision</div>
  <div class="desc post rtl">Request the deprovisioning of a node</div>
</div>

The body of this request MUST be a JSON encoded `NodeDeprovisionRequest`.

A successful response MUST have a status code of 200 or 204.
The response payload for a successful request is ignored.
