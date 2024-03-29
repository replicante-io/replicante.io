---
title: "Online Kafka stream resize"
date: 2020-02-11T22:52:33Z
draft: false
group: opts
weight: 105
---

The issue here is preserving order of messages as the Kafka partitions count changes.
To guarantee the order, all messages must have been consumed and no new messages arrive
while kafka adds the new topics and producers update there view of topics to make use
of the new partitions.

## Why delay improving?

* Scale needs are unknown.
* It may be possible to only need a few minutes of downtime a year or something small like that.
* Any attempt to make the application deal with this will add complexity.
* The streaming patterns (the way replicante will use streams) are unclear still.
* If "upgrade by replacement" is implemented it can also be used to reconfigure dependencies.

## Potential improvement

At this time, two main approaches come to mind:

* Create a new topic:
  1. With the desired partitions count.
  2. Start publishing to this topic while consuming from the old one.
  3. Once the old topic is empty switch to consuming from the new topic.
  4. The old topic can be deleted.
* Pause (read: fail) message publishing operations:
  1. Until the current messages have been fully consumed.
  2. Scale the existing topic to the desired size.
  3. Resume publishing to the topic.

Both have pros and cons, and the much simpler "pause" approach could be used as an initial
approach to move from full downtime to partial downtime/degraded service.

### Downsides the new solution/idea

Highly complex coordination requirements.
