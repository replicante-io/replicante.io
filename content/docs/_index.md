---
title: "Documentation"
date: 2018-05-02T23:02:06+01:00
draft: false
menu:
  main:
    identifier: docs
    weight: 1
---

{{< row >}}
{{% content-box title="Core Documentation" %}}
All you need to know to use, configure, install, manage replicante.

You likely want to start here.

Check out the architecture overview and the quickstart, then dive into the details.

[Read the guide](./manual/)
{{% /content-box %}}


{{% content-box title="Agents Documentation" %}}
Agents are lightweight processes runninng next to datastore processes to perform
all management tasks the datastore software should not deal with.

Agents developed by the Replicante team are documented here.

[Read the docs](./agents/)
{{% /content-box %}}


{{% content-box title="Datastore specification" %}}
The specifications document defines a model that details the attributes,
behaviours, and expectations needed of datastores.

In Replicante we see every datastore through the lenses of this specifications
so that datastores can be managed and monitored consistently regardless of software.

[Stable version]({{% docs-link "spec" "stable" %}})  
[Development version]({{% docs-link "spec" "master" %}})
{{% /content-box %}}

{{% content-box title="Developers Notebook" %}}
Replicante architecture, internals, possible futures, and more.
These pages hold a bit of lore, a bit of history, and a lot of mind dump.

Mainly aimed at project developers to learn the past, understand the now, and glance at the future.

[Stable version]({{% docs-link "devnotes" "stable" %}})  
[Development version]({{% docs-link "devnotes" "master" %}})
{{% /content-box %}}
{{< /row >}}


<div class="alert alert-secondary text-center" role="alert">
  Could not find what you are looking for?
  We would be happy to help you further.
  <br />
  Come chat to us on <a href="https://gitter.im/replicante-io/community">gitter</a>.
</div>
