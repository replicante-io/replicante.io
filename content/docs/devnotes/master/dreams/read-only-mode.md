---
title: "Read only mode"
date: 2020-02-13T19:14:36Z
draft: false
group: dreams
weight: 215
---

**NOTE**: should this be called "Monitor Only" mode?
We would still write to intenal store so it is not exactly "Read Only".

Implement a flag that will force the entire system to enter a monitor only mode.
This would still monitor all clusters and generate all events but would not perform any action.
