---
title: "Standard Node Actions"
date: 2022-09-03T15:03:05+01:00
draft: false
group: nodeactref
weight: 300
---

The exact list of actions implemented by each agent will vary.
Moreover different agents could implement the same action identifier but give it different meanings.
If is therefore essential to read the agent documentation with regards to what actions are
available and how they work.

To provide some consistency and standard expectations across the Replicante ecosystem some
standard node actions are defined as part of the agent specification.
Agents may not implement these actions but if they do they are expected to implement them
as described in this reference with regards to:

- What the action does (but of course not how it is done).
- What arguments the action accepts and what they mean.
- The schema of the `state.payload` data once the action completes, if that is detailed in the reference.
