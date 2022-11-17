---
title: "The Agent Protocol"
date: 2020-02-18T23:03:12Z
draft: false
group: agent
spec: agent
weight: 101
---

{{% notice class="warning" %}}
**Alpha state disclaimer**

The protocol defined below is in early development cycle
and is subject to (potentially breaking) change.
{{% /notice %}}

The Agents interface is a JSON encoded HTTP API.  
The API is versioned so that breaking changes can be rolled out gradually
with version compatibility "windows".

Any date or time returned or receiver by the agent API MUST be in UTC.  
The Agent API MUST expose dates and times as
[RFC 3339](https://tools.ietf.org/html/rfc3339) encoded strings.


## Information and Monitoring
One of the tasks an agent is expected to do is provide specialised information and monitoring data.
Replicante Core will collect and aggregate this data to estimate (distributed systems, remember?)
the state and health of the cluster.

{{% notice class="info" %}}
**A note about monitoring**

Just because "monitoring" was mentioned as one of the agent's responsibilities
it does not mean the agent is responsible for general purpose moniotring.

Use [Prometheus](https://prometheus.io/) or other tools for general purpose monitoring.

Replicante Agents MAY be built to also provide general purpose monitoring services
but that is outside the scope of this specification.
{{% /notice %}}


### Agent information API
<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/info/agent</div>
  <div class="desc get rtl">Returns information about the agent itself</div>
</div>

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/info/datastore</div>
  <div class="desc get rtl">Returns information about the datastore</div>
</div>

[Details about these endpoints]({{% ref "../info.md" %}})


### Shards information API
<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/shards</div>
  <div class="desc get rtl">Returns detailed information about shards</div>
</div>

[Details about these endpoints]({{% ref "../shards.md" %}})


## Actions
Another task the agent is responsible for is the execution of actions.
Actions are the execution layer on which any automation is built.

Agents allow clients to schedule as many actions as they like and can start rejecting actions
if too many actions are schedule and have not been processed yet.
Agents MUST execute only one action at a time.
Actions MUST be executed in the order they have been successfully scheduled with the agent.

Actions have the following set of properties:

  * `args`: Arguments passed to the action when invoked.
  * `created_ts`: Time the action was first created (by the agent, by core, ...).
  * `finished_ts`: Time the action entered a final state.
  * `headers`: Additional metadata headers attached to the action.
  * `id`: Unique ID of the action.
  * `kind`: Type ID of the action to run.
            Consult the agent documentation for information about actions discovery.
  * `requester`: Entity (system or user) requesting the execution of the action.
  * `scheduled_ts`: Time the agent recorded the action in the DB.
  * `state`: State the action is currently in (see below).
  * `state_payload`: Optional payload attached to the current `state`.

The action `state` attribute indicates at which point of the lifecycle the action is:

{{< img "action-states.png" "Action state transitions" >}}

The states are as follows:

  * `NEW`: all actions start of in the `NEW` state when they are scheduled.
  * `RUNNING`: when a `NEW` action is picked up for execution and started, it enters the `RUNNING` state.
               `RUNNING` actions can transition from `RUNNING` to `RUNNING`, when this happen their `state_payload` may change.
  * `DONE`: the agent completed execution of the action successfully.
  * `FAILED`: the action encountered an error or was otherwise unable to transition the system to the desired state.

### Actions API
<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/actions/finished</div>
  <div class="desc get rtl">Returns a list of finished actions</div>
</div>

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/actions/queue</div>
  <div class="desc get rtl">Returns a list of currently running or queued actions</div>
</div>

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/actions/info/:id</div>
  <div class="desc get rtl">Returns an action details as well as its state history</div>
</div>

<div class="rest">
  <div class="method post">POST</div>
  <div class="url post">/api/unstable/actions/schedule/:kind</div>
  <div class="desc post rtl">Request the scheduling of a new action</div>
</div>

[Details about these endpoints]({{% ref "../actions.md" %}})
