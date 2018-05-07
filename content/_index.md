---
title: "Replicante: datastore monitoring and automation"
date: 2018-05-01T23:33:33+01:00
draft: false
---

{{< row >}}
{{% content-box title="Consistent Model" %}}
What defines a datastore is detailed in the
{{% book id="specs" %}}specifications{{% /book %}} document.
Building on this document we can reuse concepts and model datastores.

No need to focus on the details of Kafka, MongoDB, Zookeeper, etcetera for day to day operations.
{{% /content-box %}}


{{% content-box title="Built on data" %}}
Continuous monitoring is used to detect changes and failures quickly.

This information is used to check if the datastore is in the desired state
(as determined by the {{% book id="specs" %}}specifications{{% /book %}} document).
{{% /content-box %}}


{{% content-box title="Transparent and Trustworthy" %}}
Replicante is open source so you can check, audit, and edit the code yourself.

But there is much more then that to transparency:

  * Replicante integrates with [OpenTracing](http://opentracing.io/) to show what it does.
  * Internal metrics can help run and visualise the system.
  * Structured logs allow you to audit and debug system activity.
{{% /content-box %}}


{{% content-box title="Streaming events" future="true" %}}
Events are also generated when the state changes and pushed to a streaming platform.

Beside acting as an audit log of events, this powers many features as well as any
external tool that can process events off the stream independent of the core platform.
{{% /content-box %}}


{{% content-box title="Automation" future="true" %}}
Knowing when things go wrong is good.
Automatically executing corrective actions for the most common issues is better!

By accepting that bad things happen from the {{% book id="specs" %}}specifications{{% /book %}} level
it is also possible to determine corrective actions and perform them.

Don't be too scared though: the model can also tell us when it is safe to act.
Nothing is done if there is a risk to the data.
{{% /content-box %}}


{{% content-box title="Highly Available" future="true" %}}
Replicante is built to stay on even when some of your servers go off.

This isn't so much of a feature for the modern infrastructure software but a requirement.

In any case, we got you covered!
{{% /content-box %}}
{{< /row >}}
