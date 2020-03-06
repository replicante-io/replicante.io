---
title: "replictl sso"
date: 2020-03-04T21:03:05Z
draft: false
group: cli
weight: 554
---

Group of commands to manage and inspect authentication sessions and profiles.
See `replictl sso --help` for general information.

## list-sessions
List all known SSO sessions.

```text
$ replictl sso list-sessions [OPTIONS]
```

## login
Login to a Replicante instance.
This will create or update a profile that can then be used for operations.

If no `--session` is specified, the `default` session is updated.

```text
$ replictl sso login [OPTIONS]
```

## logout
Logout of an SSO session.

If no `--session` is specified, the `default` session is removed.

```text
$ replictl sso logout [OPTIONS]
```

## session-info
Show information about an SSO session.

If no `--session` is specified, the `default` session is used.

```text
$ replictl sso session-info [OPTIONS]
```

## set-default-session
Set the default SSO session used by future `replictl` invocations.

If no `--session` is specified, the `default` session is used.
