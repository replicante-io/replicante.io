---
title: "Cluster Discovery"
date: 2020-02-24T21:13:47Z
draft: false
group: feature
weight: 103
---

{{% notice class="warning" %}}
Cluster Discovery is likely to be deprecated in favour of Platforms in the future.
{{% /notice%}}

Cluster discovery helps automation and reduces management overhead
(it may even help standardise your setup).

Cluster discovery follows the principle of single source of truth: nodes are looked up
directly from the platform they run on, in a provisioning systems or
from other forms of inventory solutions.

Administrators only have to manage one list of nodes and Replicante Core can use that information.
Combine this with infrastructure as a service solutions and you automatically get datastore
monitoring and automation as soon as a new server/instance is created.

## Backends

Replicante can support a variety of ways to discover clusters from different systems.
These are discovery *backends*.

Each backend has a set of [configuration]({{< ref "../admin/config.md" >}}) options detailed below,
all set under the `discovery.backends` section.

### HTTP Discovery

The HTTP Discovery backend performs HTTP(S) requests to a remote server to fetch clusters.

This discovery backend supports custom HTTP headers and TLS.
An optional JSON body and pagination support are also available when
`POST` requests are in use (the default).

HTTP Discovery backends are defined in the `discovery.backends.http` list.
Items in the list have the following attributes:

* (**required**) `url`: The URL to send `POST`/`GET` requests to.
* `method`: The HTTP method to use. Can be either `POST` (the default) or `GET`.
* `body`: Optional JSON object to send as the body of `POST` requests.
* `headers`: Map of HTTP Headers to attach to all requests.
* `timeout`: Timeout for HTTP requests, in milliseconds (defaults to 30 seconds).
* `tls.ca_cert`: Optional path to a PEM certificate to validate the remote HTTPS server certificate.
* `tls.client_cert`: Optional path to a PEM certificate to authenticate the client with the remote HTTPS server.

The main power of HTTP Discovery is the flexibility.
By implementing simple and small, often stateless, HTTP server you can integrate Replicante Core
with any technology or proprietary tool, prototype new discovery solutions, etcetera ...

#### Static Discovery Configuration

Tunable dynamic discovery is needed by advanced users.
But very often much simpler static solutions work just fine and
require less effort to set up and manage.

This setups are still possible with HTTP Discovery using the `GET` method and
any of the many HTTP static serving solutions such as
[Apache](https://httpd.apache.org/) or [NGINX](https://www.nginx.com/) to name a few.

The idea is to:

  1. Write one or more JSON files with the expected format (see example below).
  2. Start an HTTP server using the location of all the JSON files as the web root.
  3. Configure replicante with:
     * A URL like `http://your.server:port/path/under/web/root/discovery.json`.
     * To use the `GET` method.

Example JSON file to serve statically:

```json
{
  "cursor": null,
  "clusters": [{
    "cluster_id": "ID OF THE CLUSTER",
    "nodes": [
      "http://host1:port/",
      "http://host2:port/",
      "http://host3:port/"
    ]
  }]
}
```

#### Implementing HTTP Discovery servers

Details of the client/server JSON over HTTP protocol are documented in comments in the code that implements
[HTTP Discovery](https://github.com/replicante-io/replicante/blob/main/cluster/discovery/src/backends/http.rs).

To make sure that any changes to the code are reflected in the documentation
the code itself is where the details are documented.
You do not need to understand [Rust code](https://www.rust-lang.org/) as all the
information you will need is provided in english in the comments in that file.

## Interval

Replicante Core periodically scans configured backends to detect changes to the
set of agents that should be monitored.

The `discovery.interval` option sets the delay, in seconds, between each scan.

## Cluster IDs and Display Names

Within the system, clusters are identified by a **unique ID**.
Cluster IDs are automatically extracted from the datastore if it has such unique ID.

This happens for example:

* With MongoDB replica sets, which have a configured ID.
* With Kafka, were the cluster generates a random ID when initialising.

For cases like MongoDB where it is configured or where the datastore does not provide such
IDs and they must be set in the agent configuration these IDs have a meaning for operators.
For cases like Kafka where the ID is automatically generated by the system
these IDs may be problematic for operators to work with.

Replicante supports display names for cases where IDs alone are too confusing.
Display names are used in the [WebUI]({{< ref "./webui.md" >}}) to identify and search clusters.

{{% notice class="info" %}}
Like cluster IDs, display names must be unique to a single cluster and all agents
must report the same cluster ID and display name for nodes in the same cluster.
{{% /notice %}}
