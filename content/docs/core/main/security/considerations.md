---
title: "Security Considerations"
date: 2020-02-25T22:38:46Z
draft: false
group: security
weight: 201
---

This section covers Replicante Core security design and features.

Replicante Core aims to provide a reasonable level of security by default.
Tuning will be required to ensure users make the best of the offered features.

## Design expectations

Replicante is developed with some expectation about data, users, and runtime environment:

* Agents can be trusted and respect the [specification]({{% docs-link "spec" "stable" %}}).
* Users that have access to the system can be trusted.
* Replicante processes can trust each other.
* Actions can be dangerous so the system MUST guarantee authenticity and integrity of action requests.
* Collected data and generated events can include sensitive information but are not confidential.  
  Precautions are taken to avoid unauthorised reads but no permanent or irreparable harm
  is done if data is leaked.
* Security of third party software (store, message bus, ...) is out of scope.

## Features

Replicante provides the following security-related features:

* [Agents transport]({{< ref "./transports.md" >}}) encryption and action signing.
* [Events]({{< ref "../features/events/index.md#stream-subscription" >}}) auditing.
