---
title: "Replicante: datastore orchestration"
date: 2018-05-01T23:33:33+01:00
draft: false
---

{{< row >}}
{{% content-box title="Consistent Model" %}}
What defines a datastore is detailed in the [specification]({{% docs-link "spec" "stable" %}}) document.
Building on this document we can reuse concepts and model datastores.

Define once the details of each datastore software and reuse that knowledge for every cluster.
{{% /content-box %}}

{{% content-box title="Built on data" %}}
Continuous monitoring is used to detect changes and failures.

This information is used to check if the datastore is in the desired state
(as determined by the [specification]({{% docs-link "spec" "stable" %}}) document).
{{% /content-box %}}

{{% content-box title="Orchestration" %}}
Knowing when things are not as expected is good.
Automatically bringing things back to the desired state is better!

No need to worry though: the [specification]({{% docs-link "spec" "stable" %}}) can also tell us
when it is safe to act. Nothing is done if there is a risk to the data.
{{% /content-box %}}

{{% content-box title="Streaming events" %}}
Events are generated when states change and are pushed to a streaming platform.

Beside acting as an audit log of events, this powers internal features as well as
external tools that can process events independently of the core platform.
{{% /content-box %}}

{{% content-box title="Highly Available" %}}
Replicante is built to stay on even when some of your servers go off.

This isn't so much of a feature for the modern infrastructure software but a requirement.

In any case, we got you covered!
{{% /content-box %}}

{{% content-box title="Transparent and Trustworthy" %}}
Replicante is open source so you can check, audit, and edit the code yourself.

But there is much more to help you understand what happens:

* Replicante integrates with [OpenTracing](http://opentracing.io/) to show what it does.
* Internal metrics can help run and visualise the state of the system.
* Structured logs allow you to audit and debug system activity.
{{% /content-box %}}
{{< /row >}}
