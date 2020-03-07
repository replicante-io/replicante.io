---
title: "Path-based Apply API handlers"
date: 2020-02-13T23:44:06Z
draft: false
group: opts
weight: 111
---


The API handling for the declarative `apply` feature is currently a single endpoint
that acts as a switch for all registered handlers.

Extending the supported `apiVersion`s and object `kind`s requires manually adding a function
to the set of registered appliers reachable for this single, in-process, handler.


## Why delay improving?
  * An implementation exists and works.
  * Not many `apiVersion`s and `kind`s are expected in the foreseeable future.
  * Other essential features do not exist and should be the focus first.


## Potential improvement
Instead of using a signle `apply` API endpoint create more explict ones.  
The exact path is to be defined later but similar to any of:

  * `/api/apply/{apiVersion}/{kind}`
  * `/api/v0/apply/{apiVersion}/{kind}`
  * `/api/{apiVersion}/apply/{kind}`

The idea:
  1. Fix the format for new endpoints.
  2. Create new API handlers for all existing versions and kinds.
  3. Update the top `apply` endpoint to proxy proxy to the new endpoints.
  4. Update `replictl apply` to use the new endpoints directly.

This new format would allow more flexibility and a more additive & decoupled architecture.


### Downsides the new solution/idea
  * Increased complexity of the API definition.
  * The introduction of a proxy endpoint and dealing with unsupported versions & kinds could be more complex.
