---
title: "Replicante: datastore orchestration"
date: 2018-05-01T23:33:33+01:00
draft: false
---

{{< row >}}
{{% content-box title="Consistent Model" %}}
What defines a datastore is detailed in the [specification]({{% docs-link "spec" "stable" %}}) document.
Building on this document we can reuse concepts and model datastores.

Configure once the details of each datastore software and reuse the knowledge for each cluster.
{{% /content-box %}}


{{% content-box title="Built on data" %}}
Continuous monitoring is used to detect changes and failures quickly.

This information is used to check if the datastore is in the desired state
(as determined by the [specification]({{% docs-link "spec" "stable" %}}) document).
{{% /content-box %}}


{{% content-box title="Transparent and Trustworthy" %}}
Replicante is open source so you can check, audit, and edit the code yourself.

But there is much more then that to transparency:

  * Replicante integrates with [OpenTracing](http://opentracing.io/) to show what it does.
  * Internal metrics can help run and visualise the system.
  * Structured logs allow you to audit and debug system activity.
{{% /content-box %}}


{{% content-box title="Streaming events" %}}
Events are also generated when the state changes and pushed to a streaming platform.

Beside acting as an audit log of events, this powers many features as well as any
external tool that can process events off the stream independent of the core platform.
{{% /content-box %}}


{{% content-box title="Orchestration" future="true" %}}
Knowing when things are not as expected is good.
Automatically bringing things back to the desired state is better!

By accepting that bad things happen from the [specification]({{% docs-link "spec" "stable" %}})
level it is also possible to determine corrective actions and perform them.

Don't be too scared though: the model can also tell us when it is safe to act.
Nothing is done if there is a risk to the data.
{{% /content-box %}}


{{% content-box title="Highly Available" %}}
Replicante is built to stay on even when some of your servers go off.

This isn't so much of a feature for the modern infrastructure software but a requirement.

In any case, we got you covered!
{{% /content-box %}}
{{< /row >}}
