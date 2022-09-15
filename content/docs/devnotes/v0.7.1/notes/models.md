---
title: "Handling data models"
date: 2020-02-11T22:07:17Z
draft: false
group: notes
weight: 8
---

Any application that handles data (any application?) has to define data models to operate on.

In this page, *data model* refers to a data type or equivalent language feature
that represents data across the application.
In [rust](https://www.rust-lang.org/) this would be a `struct`.

Applications can have multiple models for the same data to support multiple contexts:

* View models: structure of the data exposed to users, for example API formats.
* Internal models: structure of the data used internally by the application.
* Persistence models: structure of the data for the store/db layer.

Having multiple ways of viewing the same data can have pros and cons.
Having too many models can cause complexity, inconsistencies and errors.
Having only one model forces it to be responsible for everything.

Some of the cons are:

* Conversions among models come at a cost.
* Different models have to be kept in sync.
* It may become unclear which models should be responsible for what.

On the other hand when models have well defined roles they have some value too:

* View models:
  * Provide stability for integrated systems and users.
  * Internal details can be kept private and change easily.
  * Data can be exposed in a way that is convenient to users while the application
    can operate on it in a clean and efficient way.

* Internal models:
  * Allow the application internals to evolve without visible changes.
  * Are a place to provide data derivation logic.
  * Can be structure to make application architecture cleaner and simpler.

* Persistence models:
  * Can make use of DB specific types without forcing your application to use them everywhere.
  * Can hide storage only attributes.
  * Allow data to be stored in a way that supports efficient DB operations.

{{% notice class="info" %}}
If models for different layers happen to coincide it is of course possible to share them,
as long as they are split into separate models as soon as the needs of different layers start to diverge.
{{% /notice %}}

## Examples

These are some examples of where the distinction above is useful.

### View models

Replicante Core provides a report to users about the latest cluster orchestration task.
This report is a view model, built incrementally during orchestration and with no relation to
how data is stored or processed internally.

This means that cluster orchestration can change how it does things, steps can move around
and the logic even entirely replaced without changing anything of how the results are presented.

### Internal models

Internal models are what replicante operates on.
Keeping them private means that changes to the logic do not unexpectedly leak the the API
or break the storage layer.

For example the cluster view internal model can be used to represent a cluster with no impact
on how data is stored or presented to the user.

### Persistence models

Persistence models allow the structure of data in the DB to be more efficient for storage
and search operations.

For example some models are stored with additional timestamp information for periodic loops to
efficiently find only the records they need to look at and not scan all records.
This is not exposed to the application as it does not care for this information outside of querying.

## Data storage format

Replicante Core stores data in a document store.

Care must be taken to allow for a zero downtime upgrade path.
This means that changing the data format must be incremental:

1. Make the change optional while supporting the existing data format.
2. Release and run the code long enough for all data to be regenerated or aged-out.
3. Make the new data format a requirement and introduce features that rely on it.
4. Release the code with the new data format and features.

Each data item is stored and updated atomically.
The encoding details vary from store to store but Replicante Core uses a general interface
to interact with the store, regardless of the functionality it exposes.

### Why a documents store?

The main reasons for choosing [MongoDB](https://www.mongodb.com/) as the store are:

* *Flexible document format*: since Replicante is in early development stages the data format
  has not yet being tried and tested.
  Many features that will require (potentially large) changes to the data format are in the
  future of the project as well.
  Having a store with a low overhead to schema changes is of great value at this stage.
* *MongoDB is quite easy to setup and support*: Replication, rolling restarts and upgrades,
  automated failover are also requirements for an "always on" solution like Replicante that
  are not easily available out of the box in traditional SQL servers.
* *Scalability*: MongoDB comes in replica set mode for high availability as well as a slightly
  more complex sharded cluster mode.
  Since Replicante Core logically groups data by cluster (maybe one day by organisation instead?)
  it is possible to shard large collections and grow/parallelise work (although if you get
  to that level already you HAVE to let me know!).

### Why not a transactional store?

The main reason store transactions are not in use is because the desired database (MongoDB)
does not support them.
The reasons MongoDB was the preferred store to begin with are listed above.

Although the current implementation is not making use of transactions,
things may change in the future as the project changes and matures.

Finally the value of transactions is questionable in a lot of Replicante Core use cases
since the data source has no atomicity guarantee to begin with.
When refreshing the state of each cluster node, all we can say is the data returned by
a single call to an agent endpoint is consistent in itself.
There are no guarantees the result of two calls to the same agent would return results that are
consistent across the two calls, even during the same orchestration cycle.
