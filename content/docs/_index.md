---
title: "Documentation"
date: 2018-05-02T23:02:06+01:00
draft: false
menu:
  main:
    identifier: docs
    weight: 2
---
<!-- markdownlint-disable MD033 -->

{{< row >}}
{{% content-box title="Core Documentation" %}}
All you need to know to use, configure, install, manage replicante.

You likely want to start here.

Check out the architecture overview and the quick start, then dive into the details.

[Latest version]({{% docs-link "core" "stable" %}})  
[Development version]({{% docs-link "core" "main" %}})
{{% /content-box %}}

{{% content-box title="Agents Documentation" %}}
Agents are lightweight processes running next to datastore processes to perform
all management tasks the datastore software should not deal with.

Agents developed by the Replicante team are documented here.

[Latest version]({{% docs-link "agent" "stable" %}})  
[Development version]({{% docs-link "agent" "main" %}})
{{% /content-box %}}

{{% content-box title="Specifications" %}}
The specification documents define attributes, behaviours and expectations of entities
Replicante Core interacts with such as data stores and infrastructure platforms.

In Replicante Core every interaction with external systems is done through the
relevant specification so features apply equally to any backing software.

[Current specifications]({{% docs-link "spec" "stable" %}})  
[Development specifications]({{% docs-link "spec" "main" %}})
{{% /content-box %}}

{{% content-box title="Developers Notebook" %}}
Replicante architecture, internals, possible futures, and more.
These pages hold a bit of lore, a bit of history, and a lot of mind dump.

Mainly aimed at project developers to learn the past, understand the now, and glance at the future.

[Latest version]({{% docs-link "devnotes" "stable" %}})  
[Development version]({{% docs-link "devnotes" "main" %}})
{{% /content-box %}}
{{< /row >}}

<div class="alert alert-secondary text-center" role="alert">
  Could not find what you are looking for?
  We would be happy to help you further.
  <br />
  Come chat to us on <a href="https://gitter.im/replicante-io/community">gitter</a>.
</div>
