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

* Data models: the objects passed between clients and server.
* API endpoints: the channel to interact with agents.

## Data Models

### Agent Actions

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

The `state`s are as follows:

* `NEW`: all actions start of in the `NEW` state when they are scheduled.
* `RUNNING`: when a `NEW` action is picked up for execution and started, it enters
  the `RUNNING` state. `RUNNING` actions can transition from `RUNNING` to `RUNNING`,
  when this happen their `state_payload` may change.
* `DONE`: the agent completed execution of the action successfully.
* `FAILED`: the action encountered an error or was otherwise unable to transition
  the system to the desired state.

The `requester` is one of:

* `AGENT_API`: action requested over the Agent API.
* `CORE_API`: action requested over the Replicante Core API.
* `CORE_PLAYBOOK`: action requested by Replicante Core as part of a playbook.
* `CORE_DECLARATIVE`: action requested by Replicante Core while converging a declarative cluster.

### Date and time format

Any date or time returned or receiver by the agent API MUST be in UTC.  
The Agent API MUST expose dates and times as
[RFC 3339](https://tools.ietf.org/html/rfc3339) encoded strings.

## API Reference

### Information Endpoints

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/info/agent</div>
  <div class="desc get rtl">Returns information about the agent itself</div>
</div>

The following information MUST be included in the response:

* `version` information:
  * Version `number`: the [SemVer](https://semver.org/) agent version.
  * Version control `checkout`: VCS ID of the agent code that is running.
  * Version control `taint` status: indicates uncommitted changes to the code.

Example:

```json
{
  "version": {
    "number": "0.1.0",
    "checkout": "11a24d9c3940f60e527c571680d64e80e0889abe",
    "taint": "not tainted"
  }
}
```

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/info/datastore</div>
  <div class="desc get rtl">Returns information about the datastore</div>
</div>

The following information MUST be included in the response:

* `cluster_id`: datastore determined cluster identifier.
* `id`: datastore determined, cluster unique, node identifier.
* `kind`: datastore software managed by the agent.
* `version`: the [SemVer](https://semver.org/) datastore version.

Example:

```json
{
  "cluster_id": "replica-set-name",
  "id": "host.domain.com:27017",
  "kind": "MongoDB",
  "version": "3.4.5"
}
```

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/shards</div>
  <div class="desc get rtl">Returns detailed information about shards</div>
</div>

The following information MUST be included:

* A list of `shards` on the node:
  * The shard `id`.
  * The `role` of the node for the shard.
  * The (optional) `commit_offset` of the shard on the node:
    * The commit offset `unit`.
    * The commit offset `value` (as a 64-bits integer).
  * The (optional) `lag` of a secondary from its primary:
    * The lag `unit`.
    * The lag `value` (as a 64-bits integer).

Example:

```json
{
  "shards": [{
    "id": "shard_id",
    "role": "SECONDARY",
    "commit_offset": {
      "unit": "seconds",
      "value": 67890
    },
    "lag": {
      "unit": "seconds",
      "value": 33
    }
  }]
}
```

### Actions Endpoints

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

* The action ID.
* The action kind.
* The final action state.

Example:

```json
[
    {
        "kind": "replicante.io/store.stop",
        "id": "703824bf-2c16-44f5-b4da-b21688c57043",
        "state": "DONE"
    },
    {
        "kind": "replicante.io/store.stop",
        "id": "f4fdda3f-3130-474b-b22c-66c6824a5d89",
        "state": "DONE"
    },
    {
        "kind": "replicante.io/store.stop",
        "id": "191cc19b-2dee-4013-b908-29c7985f79ac",
        "state": "DONE"
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
        "state": "RUNNING"
    },
    {
        "kind": "replicante.io/store.stop",
        "id": "f4fdda3f-3130-474b-b22c-66c6824a5d89",
        "state": "NEW"
    },
    {
        "kind": "replicante.io/store.stop",
        "id": "191cc19b-2dee-4013-b908-29c7985f79ac",
        "state": "NEW"
    }
]
```

<div class="rest">
  <div class="method get">GET</div>
  <div class="url get">/api/unstable/actions/info/:id</div>
  <div class="desc get rtl">Returns an action details as well as its state history</div>
</div>

The following parameters are REQUIRED in the URL:

* `:id`: the ID of the action to lookup.

The response will include the following information:

* `action`: the full action model as described in the [protocol section](agent-intro.md#actions).
* `history`: array of action transition events:
  * `action_id`: (optional) ID of the action that transition.
                 If set, this MUST be the same as `action.id`.
  * `timestamp`: the (agent) time the action entered the state.
  * `state`: the state that was reached.
  * `state_payload`: optional JSON value defined by the action at the time of transition.

Example:

```json
{
    "action": {
        "kind": "replicante.io/service.graceful.restart",
        "created_ts": "2019-08-30T20:40:24Z",
        "finished_ts": "2019-08-30T20:40:37Z",
        "headers": {},
        "id": "308fb8bc-79a1-49d9-bf71-1191d7d6c5d2",
        "requester": "API",
        "args": {},
        "state": "DONE",
        "state_payload": {
            "payload": {
                "attempt": 0,
                "message": "the service is running",
                "pid": "11634"
            },
            "stage": 2,
            "state": "DONE"
        }
    },
    "history": [
        {
            "action_id": "308fb8bc-79a1-49d9-bf71-1191d7d6c5d2",
            "timestamp": "2019-08-30T20:40:37Z",
            "state": "DONE",
            "state_payload": {
                "payload": {
                    "attempt": 0,
                    "message": "the service is running",
                    "pid": "11634"
                },
                "stage": 2,
                "state": "DONE"
            }
        },
        {
            "action_id": "308fb8bc-79a1-49d9-bf71-1191d7d6c5d2",
            "timestamp": "2019-08-30T20:40:33Z",
            "state": "RUNNING",
            "state_payload": {
                "payload": {
                    "attempt": 0,
                    "message": "the service is not running",
                    "pid": null
                },
                "stage": 1,
                "state": "DONE"
            }
        },
        {
            "action_id": "308fb8bc-79a1-49d9-bf71-1191d7d6c5d2",
            "timestamp": "2019-08-30T20:40:30Z",
            "state": "RUNNING",
            "state_payload": {
                "payload": {
                    "message": "Err(OperationError(\"No servers available for the provided ReadPreference.\"))"
                },
                "stage": 0,
                "state": "DONE"
            }
        },
        {
            "action_id": "308fb8bc-79a1-49d9-bf71-1191d7d6c5d2",
            "timestamp": "2019-08-30T20:40:24Z",
            "state": "NEW",
            "state_payload": null
        }
    ]
}
```

<div class="rest">
  <div class="method post">POST</div>
  <div class="url post">/api/unstable/actions/schedule/:kind</div>
  <div class="desc post rtl">Request the scheduling of a new action</div>
</div>

The following parameters are REQUIRED in the URL:

* `:kind`: the ID of the action to lookup.

A JSON body is REQUIRED for this endpoint:

* The entry JSON body is passed as arguments to the request.

The agent is REQUIRED to validate the arguments passed to the request.
If the provided arguments are incompatible to what the action `:kind` expects
the endpoint MUST return an HTTP 400 error to the caller.

The response will include the following information:

* `id`: unique ID of the newly scheduled action.

Example request:

```json
{}
```

Example response:

```json
{
    "id": "308fb8bc-79a1-49d9-bf71-1191d7d6c5d2"
}
```

[attributes and behaviours]: {{< ref "./behave.md" >}}
