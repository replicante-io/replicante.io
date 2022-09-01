---
title: "Resyncable WebUI application"
date: 2020-02-13T20:15:27Z
draft: false
group: dreams
weight: 219
---

Build a completely independent WebUI application (with its own database and everything)
that keeps itself in sync with Replicante core by replaying the events stream.

Design a solution that can fully re-sync itself just by looking at the available stream of events.
This would allow core to focus on its tasks, with data formats convenient for them,
and the UI to focus on efficient and effective user interaction and analytics.

The ability to fully resync the WebUI based on backend events means that any change in the UI
datastore or in the logic of how events are processed can be handled by simply drop the data
and re-consume the stream of events.
