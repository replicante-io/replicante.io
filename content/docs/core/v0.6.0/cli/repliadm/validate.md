---
title: "repliadm validate"
date: 2020-03-02T20:41:57Z
draft: false
group: cli
weight: 504
---

Group of commands to validate replicante configuration and data.
See `repliadm validate --help` for general information.

## all
Run all validate operations.

{{% notice class="warning" %}}
Some validation steps scan the entire stores.  
When that happens the performance of the system may be impacted by the operation.
{{% /notice %}}

```text
$ repliadm validate all [FLAGS] [OPTIONS]
```

## config
Validate Replicante Core configuration.

```text
$ repliadm validate config [FLAGS] [OPTIONS]
```

## coordinator-elections
Validate coordinator elections.

```text
$ repliadm validate coordinator-elections [FLAGS] [OPTIONS]
```

## coordinator-nblocks
Validate coordinator non-blocking locks.

```text
$ repliadm validate coordinator-nblocks [FLAGS] [OPTIONS]
```

## coordinator-nodes
Validate coordinator nodes register.

```text
$ repliadm validate coordinator-nodes [FLAGS] [OPTIONS]
```

## events-stream
Validate messages on the events stream.

```text
$ repliadm validate events-stream [FLAGS] [OPTIONS]
```

## primary-store-data
Validate all records in the primary store.

{{% notice class="warning" %}}
This validation scans the entire primary store.  
When that happens the performance of the system may be impacted by the operation.
{{% /notice %}}

```text
$ repliadm validate primary-store-data [FLAGS] [OPTIONS]
```

## primary-store-schema
Validate the primary store schema.

```text
$ repliadm validate primary-store-schema [FLAGS] [OPTIONS]
```

## task-queues
Validate tasks waiting to be processed or re-tried.

```text
$ repliadm validate task-queues [FLAGS] [OPTIONS]
```

## update-compatibility
Validate a running system against a new version of replicante.

```text
$ repliadm validate update-compatibility [FLAGS] [OPTIONS]
```

## view-store-data
Validate all records in the view store.

```text
$ repliadm validate view-store-data [FLAGS] [OPTIONS]
```

## view-store-schema
Validate the view store schema.

```text
$ repliadm validate view-store-schema [FLAGS] [OPTIONS]
```
