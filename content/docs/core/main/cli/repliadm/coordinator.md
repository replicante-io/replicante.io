---
title: "repliadm coordinator"
date: 2020-03-04T20:54:43Z
draft: false
group: cli
weight: 503
---

Group of commands to manage the distributed coordinator.  
See `repliadm coordinator --help` for general information.

## election-info
Show detailed information about a given election.

```text
$ repliadm coordinator election-info [FLAGS] [OPTIONS] --election <ELECTION>
```

## election-list
List all registered elections.

```text
$ repliadm coordinator election-list [FLAGS] [OPTIONS]
```

## force-release-nonblocking-lock
Force a held lock to be released.

{{% notice class="danger" %}}
**This operation is dangerous!**

There should be no reason for a lock to be force-released.
The coordinator can automatically release locks for processes that failed.

If you end up needing this command you should open a
[GitHub issue](https://github.com/replicante-io/replicante/issues/new/choose)
with the circumstances that led you to it.
{{% /notice %}}

```text
$ repliadm coordinator force-release-nonblocking-lock [FLAGS] [OPTIONS] --lock <LOCK>
```

## nonblocking-lock-info
Show information about a non-blocking lock/

```text
$ repliadm coordinator nonblocking-lock-info [FLAGS] [OPTIONS] --lock <LOCK>
```

## nonblocking-lock-list
List currently held non-blocking locks.

```text
$ repliadm coordinator nonblocking-lock-list [FLAGS] [OPTIONS]
```

## step-down-election
Force a primary to be re-elected.

{{% notice class="danger" %}}
**This operation is dangerous!**

There should be no reason for a primary to be demoted externally.
Secondary nodes should automatically pick up the need for a new primary
when the current primary fails or is stopped.

Forcing a node to step down may lead to two primary nodes to exist, which they should not.

Chances are that if you end up needing this command you should open a
[GitHub issue](https://github.com/replicante-io/replicante/issues/new/choose)
with the circumstances that led you to it.
{{% /notice %}}

```text
$ repliadm coordinator step-down-election [FLAGS] [OPTIONS] --election <ELECTION>
```
