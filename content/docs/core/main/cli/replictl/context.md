---
title: "replictl context"
date: 2020-03-04T21:03:05Z
draft: false
group: cli
weight: 554
---

Group of commands to mange and inspect `replictl` contexts and
login/logout of Replicante Core API servers.
See `replictl context --help` for general information.

## change

Set or update an existing context's scope attributes.

```text
replictl context change [OPTIONS]
```

## describe

Descibe the active context.

```text
replictl context describe [OPTIONS]
```

## list

List known contexts and shows some attributes about them.

```text
replictl context list [OPTIONS]
```

## login

Connect to Replicante API server(s) or update connection details.

```text
replictl context login [OPTIONS]
```

## logout

Forget how to connect to a Replicante API server and remove its context.

```text
replictl context logout [OPTIONS]
```

## select

Select a context to be the active context.

```text
replictl context select [OPTIONS]
```
