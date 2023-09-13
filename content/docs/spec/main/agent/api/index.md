---
title: "API Reference"
date: 2022-11-07T08:50:30Z
draft: false
spec: agent
weight: 3
---
<!-- markdownlint-disable MD033 -->

{{% notice class="warning" %}}
**Alpha state disclaimer**

The specification defined below is in early development cycle
and is subject to (potentially breaking) change.
{{% /notice %}}

## Intro

The Agents specification defines an interface to access [attributes and behaviours].
This is required for the specification to be usable as part of a larger ecosystem.

The Agents interface is provided as an HTTP(S) JSON API.
Agents are required to provide interface over HTTP(S) but may choose to provide
the same interface over other protocols.

The interface is defined in terms of:

- Data models: the objects passed between clients and server.
- API endpoints: the channel to interact with agents.

## Data Models

### Agent Action Executions

Action executions have the following set of properties:

- `args`: Arguments passed to the action when it was created.
- `created_time`: Time the action was first created.  
  An action execution may be created in systems other then Agents (such as Core).
  In such cases the `created_time` is the time the action execution was created in the system other
  then the Agent (such as Core) and is passed to Agents.
- `finished_time`: Time the action entered a final state, for finished actions only.
- `id`: Unique ID of the action execution.
- `kind`: Identifier of the action implementation to execute.
- `metadata`: Unstructured metadata attached to the action when it was created.
- `scheduled_time`: Time the agent recorded the action execution in its own store.
- `state`: Nested object with the current state of an Agent Action execution.
  - `state.error`: Loosely structured information for any error encountered during action execution.
  - `state.payload`: Scratch pad for action implementations to keep track of how they are processing.
  - `state.phase`: Current phase of the action execution process.

The action `state.phase` attribute indicates at which point of the lifecycle the action is:

{{< img "action-states.png" "Action state transitions" >}}

The `state.phase`s are as follows:

- `NEW`: all actions start of in the `NEW` state when they are scheduled.
- `RUNNING`: when a `NEW` action is picked up for execution and started, it enters
  the `RUNNING` state. `RUNNING` actions can transition from `RUNNING` to `RUNNING`,
  when this happen their `state_payload` may change.
- `DONE`: the agent completed execution of the action successfully.
- `FAILED`: the action encountered an error or was otherwise unable to transition
  the system to the desired state.

The `requester` is one of:

- `AGENT_API`: action requested over the Agent API.
- `CORE_API`: action requested over the Replicante Core API.
- `CORE_PLAYBOOK`: action requested by Replicante Core as part of a playbook.
- `CORE_DECLARATIVE`: action requested by Replicante Core while converging a declarative cluster.

### Date and time format

Any date or time returned or receiver by the agent API MUST be in UTC.  
The Agent API MUST expose dates and times as
[RFC 3339](https://tools.ietf.org/html/rfc3339) encoded strings.

## API Reference

### Information Endpoints

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/info/node</div>
  <div class="desc get rtl">Returns information about the Node</div>
</div>

The following information MUST be included in the response:

- `agent_version` information:
  - Version `number`: the [SemVer](https://semver.org/) agent version.
  - Version control `checkout`: VCS ID of the agent code that is running.
  - Version control `taint` status: indicates uncommitted changes to the code.
- `attributes`: map of attributes based on information available even without the store process.
- `node_id`: identifier of the node, as reported by the Platform provider the node is running on.
- `node_status`: the current status of the node (as enumerated in the Attributes specification).
- `store_id`: identifier of the store software running on the node.
- `store_version`:
  - Version `number`: the [SemVer](https://semver.org/) agent version.
  - Version control `checkout`: VCS ID of the agent code that is running.
  - `extra` information: store specific additional version information.

Example:

```json
{
  "agent_version": {
    "number": "0.1.0",
    "checkout": "11a24d9c3940f60e527c571680d64e80e0889abe",
    "taint": "not tainted"
  },
  "attributes": {
    "client.agent.replicante.io/port": 1234,
    "client.agent.replicante.io/address": "instance.persistence.com",
  },
  "node_id": "i-123456",
  "node_status": "JOINING_CLUSTER",
  "store_id": "mongodb/rs",
  "store_version": {
    "number": "5.0.15",
    "checkout": "935639beed3d0c19c2551c93854b831107c0b118",
    "extra": null
  }
}
```

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/info/store</div>
  <div class="desc get rtl">Returns information about the Store process</div>
</div>

The following information MUST be included in the response:

- `cluster_id`: store determined cluster identifier.
- `attributes`: map of attributes based on information available only from the store process.

Example:

```json
{
  "cluster_id": "replica-set-name",
  "attributes": {
    "mongodb.com/oplog.size": 1234,
    "mongodb.com/compatibility": "5.0"
  }
}
```

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/info/shards</div>
  <div class="desc get rtl">Returns detailed information about shards</div>
</div>

The following information MUST be included:

- A list of `shards` on the node:
  - The shard `id`.
  - The `role` of the node for the shard.
  - The (optional) `commit_offset` of the shard on the node:
    - The commit offset `unit`.
    - The commit offset `value` (as a 64-bits integer).
  - The (optional) `lag` of a secondary from its primary:
    - The lag `unit`.
    - The lag `value` (as a 64-bits integer).

Example:

```json
{
  "shards": [{
    "commit_offset": {
      "unit": "seconds",
      "value": 67890
    },
    "lag": {
      "unit": "seconds",
      "value": 33
    },
    "role": "SECONDARY",
    "shard_id": "shard_id"
  }]
}
```

### Actions Endpoints

<div class="rest">
  <div class="method post">POST</div>
  <div class="url post">/api/unstable/action/</div>
  <div class="desc post rtl">Request the scheduling of a new action</div>
</div>

A JSON body is REQUIRED for this endpoint:

- `args`: [optional] arguments passed to the action execution being created.
- `created_time`: [optional] time the action execution was first created.
- `id`: [optional] unique ID of the action execution.
- `kind`: [required] identifier of the action implementation to execute.
- `metadata`: [optional] unstructured metadata attached to the action when it was created.

The response will include the following information:

- `id`: unique ID of the newly scheduled action.

Example request:

```json
{
  "kind": "agent.replicante.io/test.success"
}
```

Example response:

```json
{
    "id": "308fb8bc-79a1-49d9-bf71-1191d7d6c5d2"
}
```

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/action/:id</div>
  <div class="desc get rtl">Returns an action execution details</div>
</div>

The following parameters are REQUIRED in the URL:

- `:id`: the ID of the action execution to lookup.

The response is a JSON encoded representation of an action execution
model detailed above.

Example:

```json
{
  "args": {},
  "created_time": "2019-08-30T20:40:24Z",
  "finished_time": "2019-08-30T20:40:37Z",
  "id": "308fb8bc-79a1-49d9-bf71-1191d7d6c5d2",
  "kind": "agent.replicante.io/test.success",
  "metadata": {},
  "scheduled_time": "2019-08-30T20:40:24Z",
  "state": {
    "error": null,
    "payload": null,
    "phase": "DONE"
  }
}
```

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/actions/finished</div>
  <div class="desc get rtl">Returns a list of finished actions</div>
</div>

Actions MUST be listed in order from newest to oldest.

When an action is finished, the agent will never change its state.

Finished actions should be cleaned up periodically to prevent this list
from growing too large and the agent state from taking over the node.

A list of finished actions MUST include:

- The action ID.
- The action kind.
- The final action state.

Example:

```json
[
    {
        "kind": "replicante.io/store.stop",
        "id": "703824bf-2c16-44f5-b4da-b21688c57043",
        "phase": "DONE"
    },
    {
        "kind": "replicante.io/store.stop",
        "id": "f4fdda3f-3130-474b-b22c-66c6824a5d89",
        "phase": "DONE"
    },
    {
        "kind": "replicante.io/store.stop",
        "id": "191cc19b-2dee-4013-b908-29c7985f79ac",
        "phase": "DONE"
    }
]
```

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/actions/queue</div>
  <div class="desc get rtl">Returns a list of currently running or queued actions</div>
</div>

Actions MUST be listed in order from oldest to newest.

The format of elements in this list is the same as the one of items
returned by `/api/unstable/actions/finished`.

Example:

```json
[
    {
        "kind": "replicante.io/store.stop",
        "id": "703824bf-2c16-44f5-b4da-b21688c57043",
        "phase": "RUNNING"
    },
    {
        "kind": "replicante.io/store.stop",
        "id": "f4fdda3f-3130-474b-b22c-66c6824a5d89",
        "phase": "NEW"
    },
    {
        "kind": "replicante.io/store.stop",
        "id": "191cc19b-2dee-4013-b908-29c7985f79ac",
        "phase": "NEW"
    }
]
```

[attributes and behaviours]: {{< ref "./behave.md" >}}
