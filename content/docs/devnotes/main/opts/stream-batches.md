---
title: "Stream Batches"
date: 2020-02-12T22:43:14Z
draft: false
group: opts
weight: 109
---

The current base `Stream` requires each message to be acknowledged before the next one can be fetched.
This is done to ensure the application processes messages in order and does not skip any by mistake.

The downside is that batch processing of messages is not possible.
For example, the event indexer has to read from the stream and commit to the store each message one at a time.
A more efficient approach would be to collect a number of events and insert them in the DB at once.
This would batch both reads and writes from the two systems and be significantly more efficient.

## Why delay improving?

* This is not needed now.
* There are likely more useful optimisations to look at.
* The possible evolution into async programming may change much of this.

## Potential improvement

1. Require the stream to commit all past messages when acking one.
2. Add a `Message::batch(self)` method to allow the stream to proceed.
3. For kafka, track the max offset for each topic/partition and store them all at the next `async_ack`.
4. Figure out how to re-process the entire batch: re-creating the iterator may be enough.

### Downsides the new solution/idea

* Supporting both batched and single message interfaces can add complexity.
  * Only support batched interface.
  * Wrap batches of size one into a single message interface.
* Single message retries are quite messy at the moment, batch retires may be worse.
