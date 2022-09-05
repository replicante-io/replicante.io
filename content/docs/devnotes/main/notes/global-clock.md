---
title: "Global Clock"
date: 2020-02-11T21:04:44Z
draft: false
group: notes
weight: 3
---

Time in distributed system is complex.
There is no way to guarantee that all nodes will have an exact clock across all of them.

Therefore relying on an exact shared time for correctness leads to incorrect systems.

On the other hand it has been very painful and limiting to not introduce time at all:

* Retries are based on time.
  Even now task retires use absolute times (from kafka) to decide if a task has to be retired.
* Timeouts are based on an "operation start" sort of time.
  This is fine if the operation is within a single process but that only works for short times
  and does not survive process crashing or restarting.
* User-oriented time data, such as `Event`s timestamps is essential.

It is clear at this point that some concept of time is needed but a global clock is not an option.
Each Replicante Core process uses the UTC time reported by the server it is running on assuming
that time on all other servers in the custer is "accurate enough".
This assumption extends to the server(s) running dependencies.

What "accurate enough" means exactly depends on the operation being performed but sub-second
precision should NEVER be required for the system to function correctly.
On the other hand there is no guarantee the system works correctly in case the
[clock skew] exceeds several minutes.

Final notes:

* All generated times are in UTC and all received times expected to be in UTC as well.
  Replicante Core serialises time values in [RFC 3339] by default.
* All APIs MUST expose times in this same well known format.
* User interfaces (WebUI and `replictl`) can convert times as needed before showing.
* Precision needs vary by task but should never be sub-second.
  Features that rely on higher time precision should document this clearly.
  **NOTE**: in setups where time is precise enough for most tasks but not for high precision
  tasks the system may appear to work overall while some features are unreliable or broken.
* The expectation is that most Replicante Core clusters will be centrally managed by a single
  group/team therefore making reliance on time a more realistic option than the open internet.

{{% notice class="info" %}}
For practical purposes all the above just means means that an
[NTP](https://en.wikipedia.org/wiki/Network_Time_Protocol) agent should be
running on all Replicante Core servers, including dependencies and ideally monitored datastores.
{{% /notice %}}

[clock skew]: https://en.wikipedia.org/wiki/Clock_skew
[RFC 3339]: https://tools.ietf.org/html/rfc3339
