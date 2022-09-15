---
title: "Events"
date: 2020-02-24T21:13:54Z
draft: false
group: feature
weight: 105
---

Before you can react to a change in the system you need to know that something has changed.

Replicante's first task is to observe all nodes and generate events to reflect changes to nodes and clusters.
These events are internally used to drive features but are also recoded for users to see.

Having access to historical events can provide valuable insight:

 Was the datastore down or in the middle of a failover when increased error rates was reported?
 Did something unexpected happen after a configuration change?

Being able to correlate datastore events with application errors, performance issues,
or other unusual activity is key into improving your services and products.

## WebUI history view

The simplest way to view the events history is to check out the `Events` page in the [WebUI]({{< ref "../webui.md" >}}).

## Stream subscription

Observed and generated events are emitted onto a stream.

Events order is guaranteed for events in the same cluster but events from different clusters
can be interleaved in any order.
System events order is also guaranteed with respect to other system events but not to cluster events.

On top of supporting some Replicante Core features, the use of an events stream means that
external systems can be designed to follow (or subscribe to) the stream to be notified
of events as they occur.

Such powerful extension point opens the system up for almost endless integrations.
To name just a few:

* Send notifications when events occur.
* Trigger custom automated actions and verify their results.
* Collect context useful for possible Root Cause Analysis or other reporting.
* And much much more ...

## Grafana annotations

Building on the events stream mentioned above, Replicante Core offers
[Grafana](https://grafana.com/)
[annotations](https://grafana.com/docs/grafana/latest/dashboards/annotations/)
integration!

{{< img "grafana-agent-up-zoom.png" "Annotation of an Agent Up event close up" >}}
{{< img "grafana-agent-up.png" "Annotation of an Agent Up event" >}}
{{< img "grafana-agent-down.png" "Annotation of an Agent Down event" >}}

This feature requires the Grafana component to be enabled enabled
(`components.grafana` configuration option; enabled by default).

A set of endpoints compatible with the
[simple JSON datasource](https://grafana.com/plugins/grafana-simple-json-datasource)
is available under the `/api/unstable/grafana` root.

### Grafana configuration

The annotations integration mainly provide a specialised query interface to stored events
so most of the configuration is on the Grafana side:

1. Install the [simple JSON datasource](https://grafana.com/plugins/grafana-simple-json-datasource)
   plugin if not already installed.
2. Configure a new `Simple JSON` datasource to point to
   `http://REPLICANTE_HOST:REPLICANTE_PORT/api/unstable/grafana` if not already available.
3. On a dashboard, configure a new annotation query using the newly created datesource.
4. (Optional) Filter events by adding JSON encoded filters as the query text.

### Annotation filters

By default, the latest 1000 events in the queried interval are returned.

The following filters can be used to change what is returned:

* `cluster_id`: (string) filter events by originating cluster ID.
* `event`: (string) filter events by event type.
* `exclude_system_events`: (`true`|`false`) exclude events not originating from a cluster.
* `limit`: (integer) maximum number of events to return.
