---
title: "Dynamic Config"
date: 2020-02-09T23:07:49Z
draft: false
group: opts
weight: 103
---

Whenever a configuration option is used in a "one shot" fashion it could be dynamically
fetched instead of requiring a process restart.
This would give greater configuration control without restarts as well as provide a central
configuration place (no need to update every configuration file on every server).

For example:
 * The timeout for an operation is fixed at the start of each operation ...
 * ... VS the database server requires a restart to change.


## Why delay improving?
  * Needs are yet unkown.
  * Config will likely see large changes.


## Potential improvement
  1. Split the configuration object into two static objects:
     * Static configuration options are left in the existing file.
     * Dynamic configuration options are moved to a new file.
  2. Change the dynamic configuration object to have a more dynamic API.
     * Possibly implement some wrapper type that `DeRef` to the requested type and is
       loaded when accessed (possibly cache in memory for sanity).
     * Possibly not so the cost/risk of dynamic lookup can be exposed.
     * Consider a dynamic configuration loader that returns a static view on the full
       dynamic configuration options vs dynamic loading of individual attributes.
     * Keep the stored format decoupled from the exposed interface (mainly the full
       configuration should be stored and picked from by the API).
     * Provide an official way to update dynamic configuration (`replictl`).
  3. Update user code, if needed, to use a dynamic fetch API.
  4. At startup, warn if the dynamic config loaded is not the same as the dynamic config file?


### Downsides the new solution/idea
  * Extra complexity in the code.
  * Extra deployment complexity (need a configuration store of sorts).
  * Less obvious configuration methods (upload configuration file to store? Changes done with `replictl`?)
