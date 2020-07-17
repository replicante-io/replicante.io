---
title: "Coordinator"
date: 2020-03-06T19:39:25Z
draft: false
group: scale
weight: 705
---

Replicante Core uses the coordinator to support its operations.
All operations performed against the coordinator are simple and small.

As a result the coordinator is not expected to need to scale horizontally.
Rather, vertical scaling as the system grows should be considered
(a properly sized coordinator cluster should be able to cope with all needs).
