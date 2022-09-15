---
title: "Upgrade Notes"
date: 2020-03-03T22:53:06Z
draft: false
group: upgrade
weight: 404
---

## Upgrading to 0.7.0

Upgrade to version 0.7.0 is not supported.  

{{% notice class="warning" %}}
Running version 0.7.0 in parallel to older versions is risky as both clusters may schedule
actions against the node.
{{% /notice %}}

As of 0.7.0 it is possible to disable orchestration of a cluster in the `ClusterSettings` record.
Two clusters sharing cluster nodes can run at the same time as long as each `ClusterSettings`
is enabled in one cluster only.

## Upgrading to 0.6.0

Upgrade to version 0.6.0 is not supported.  
Users can install version 0.6.0 in parallel to older versions and switch over when ready.

## Upgrading to 0.5.0

Upgrade to version 0.5.0 is not supported.  
Users can install version 0.5.0 in parallel to older versions and switch over when ready.

## Upgrading to 0.4.0

Upgrade to version 0.4.0 is not supported.  
Users can install version 0.4.0 in parallel to older versions and switch over when ready.

## Upgrading to 0.3.0

Upgrade to version 0.3.0 is not supported.  
Users can install version 0.3.0 in parallel to older versions and switch over when ready.

## Upgrading to 0.2.0

Upgrade to version 0.2.0 is not supported.  
Users can install version 0.2.0 in parallel to 0.1.0 and switch over when ready.
