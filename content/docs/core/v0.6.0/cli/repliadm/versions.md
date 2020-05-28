---
title: "repliadm versions"
date: 2020-03-04T20:55:19Z
draft: false
group: cli
weight: 505
---

Report version information for various systems.

{{% notice class="info" %}}
This command requires access to all configured services for the version report to be complete.
{{% /notice %}}

```text
$ repliadm versions [FLAGS] [OPTIONS]
```

## Replicante versions
The command returns two replicante versions:

  * `Local repliadm` is the same as `repliadm --version`.
  * `Replicante Core Cluster` is the version of replicante compiled with `repliadm`.
