---
title: "External Actions"
date: 2020-03-14T22:57:49Z
draft: false
group: info
weight: 5
---

External actions are a way to extend agent's abilities without
having to write code and recompile all agents.

External actions are implemented as processes running along side the agent that
can perform the required tasks and that can report back to the agent the results.

Because Replicante Agents are not process supervisors, something else needs to manage them.
Below there is an example on how to do this with [systemd](https://systemd.io/).
The decision to delegate process management to an external software is not just to keep
Replicante Agents simpler.
This separation is also a requirement to ensure that your action keeps running should the
agent process crash or be restarted.

In practice this means that the start action:

  * Instructs a process supervisor to start and manage action process (the systemd example below).
  * Correctly daemonises itself to perform the action.


## Define an external action
An action is defined in the agent configuration, under the `external_actions` map,
with the following properties:

  * The external action `kind`, defined as the `external_actions` key.
    This attribute is used to generate the action's `kind` used to schedule the action: `external.agent.replicante.io/${KIND}`.
  * A `description` attribute which can be used by the agents to provide
    an operator friendly description of the action.
  * An `action` command used to start executing the action process.
  * A `check` command used to periodically check the state of the action process.

```yaml
agent:
  external_actions:
    my.custom.action:
      description: Example YAML definiton for extranal actions
      action:
        - 'start-action'
        - '--with-options=true'
        - 'and parameters'
      check:
        - 'check-action'
        - '--progress'
```

### The `action` command
Command to execute to start the action.

The first element in the list is the command to run.
All following elements in the list are optional and are passed to the command as arguments.

The start command MUST return quickly and execute the action asynchronously.
This allows the agent to move on to other tasks.

A record for the action invocation to check is passed as JSON to standard input.
This information can be used to access things like the action ID, usable as a unique
reference, or arguments passed to the agent when the action was scheduled.

### The `check` command
Command to execute to check on the state of the action.

The first element in the list is the command to run.
All following elements in the list are optional and are passed to the command as arguments.

The check command MUST implement the following protocol:

  * The check command MUST return quickly.
    Long running actions should periodically generate status information for the check
    command to look up and make decisions from.
  * The check command MUST exit successfully (exit code 0) if it could determine the
    state of the process, even if the process has failed.
  * The check MUST report the state of the action as JSON sent to its standard output.
    The expected JSON object is described below.
  * If the check command exists unsuccessfully (exit code not 0) it is assume the action
    state can no longer be determined and it has failed.
  * A record for the action invocation to check is passed as JSON to standard input.

The JSON report printed by the check to standard output must match the following:
```json
{
  "status": "running | finished | failed",
  "error": "<error message, required it status == failed>"
}
```


## Managing actions with SystemD
Actions can be managed with systemd's
[template uints](https://fedoramagazine.org/systemd-template-unit-files/)
and two helper scrips.
These scripts, as well as an example unit file, can be found in the
[agents repo]({{< versioned "https://github.com/replicante-io/agents/tree/{version}/tools/systemd" >}}).

The main task is to create a systemd template unit file that manages the action.
The unit MUST stay in the active state until it completes or the action is considered done prematurely.

To start the action configure the agent to use the `systemd-start` script.
Use `systemd-check` for the check command.  
Both command take the unit name as a required parameter to know what to start.

The `systemd-start` command will store the action definition in `/run/{action_id}.action.json`
and the action ID is also passed to the service as the template unit argument.
The `systemd-check` command will clear it up once the action completes.  
The `/run` path can be configured with the `--data` argument.


### Example
```systemd
# file: ~/.config/systemd/user/example@.service
[Unit]
Description=Example SystemD managed Replicante External Action

[Service]
Type=exec
ExecStart=/path/to/action %i

[Install]
WantedBy=multi-user.target
```

```yaml
# file: agent.yaml
# ... snip ...
agent:
  external_actions:
    example:
      description: 'Example SystemD action'
      action:
        - '/path/to/systemd-start'
        # User mode systemd is supported as well
        # --user
        - 'example'
      check:
        - '/path/to/systemd-check'
        - 'example'
```
