---
title: "HTTP Action"
date: 2022-09-02T21:45:36+01:00
draft: false
group: orcactref
weight: 902
---

| | |
| --------------- | - |
| Action ID       |`core.replicante.io/http` |
| Summary         | Execute an externally implemented action over HTTP(S) |
| Default Timeout | 24 hours |
| Scheduling Mode | Exclusive |

```yaml
apiVersion: replicante.io/v0
kind: OrchestratorAction

metadata:
  # Can override the namespace with --namespace=test-namespace
  namespace: default
  # Can override the cluster with --cluster=test-cluster
  cluster: target-cluster-id

spec:
  action: core.replicante.io/http
  args:
    remote:
      url: https://remote.action.service:1234/extended-action-id
```

Execute an externally implemented action over HTTP(S).

When it executes the action will make a POST HTTP(S) call to the provided URL.
The full [action record] is sent in the request body as JSON.

The response is expected to be:

- A 200, with a JSON encoded [`ProgressChanges`] object.
- A 204, which will correspond to a progress cycle which makes no changes.

Any other response will fail the action with a remote error.

If an action fails the remote should still send back a 200 with a [`ProgressChanges`]
object setting the state to [`OrchestratorActionState::Failed`] and include failure information.

## Arguments

| Argument | Type | Description | Default |
| -------- | ---- | ----------- | ------- |
| `remote.ca` | String | Optional CA to validate HTTPS server certificates | None |
| `remote.timeout` | u64 | Optional timeout timeout to wait for a response, in seconds. | \<Not Set\> |
| `remote.url` | String | URL of the remote system to invoke | \<Required\> |

[action record]: {{< versioned "https://github.com/replicante-io/replicante/blob/{version}/models/core/src/actions/orchestrator.rs#L13-L40" >}}
[`OrchestratorActionState::Failed`]: {{< versioned "https://github.com/replicante-io/replicante/blob/{version}/models/core/src/actions/orchestrator.rs#L100-L124" >}}
[`ProgressChanges`]: {{< versioned "https://github.com/replicante-io/replicante/blob/{version}/core/interface/orchestrator_action/src/lib.rs#L22-L32" >}}
