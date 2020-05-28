---
title: "The cluster View"
date: 2020-02-09T22:53:23Z
draft: false
group: notes
weight: 2
---

There is a fundamental limit to observation of a distributed system: it is not possible to have a
consistent, point in time, view of the entire system.
Such a view would also provide a false illusion: by the time we do anything with it the state
of the system would have changed.

Replicante accepts the intrinsic unreliability of the cluster view so it can rely on it
while not falling for the trap that "we know what the state of the system is".

This means:

  * Aggregations are considered approximate views and need to be checked or confirmed
    (most likely by observing the faulty state for at least two monitoring cycles).
  * Actions performed by any agent on any node will have preconditions.
    Agents will check the preconditions and refuse to perform actions based on stale or incorrect views.

On the upside:

  * The approximate views can be generated even though exact ones can't.
  * The illusion of (certain) transactions is dropped before it begins (we could not rely
    on them across observation, processing, action scheduling, action execution as the cluster
    changes even when our view on it is transactional).
