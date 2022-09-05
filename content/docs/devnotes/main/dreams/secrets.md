---
title: "Secrets manager integrations"
date: 2020-02-13T20:17:20Z
draft: false
group: dreams
weight: 219
---

Replicante Core will interact with some secret manager tool (like
[Vault](https://www.vaultproject.io/)) to access secrets needed to interact with other services.
The aim of this is to never have a secret in the configuration file!

Agents may support direct access to secret managers through code sharing or maybe even access
secrets through some form of Replicante Core proxying approach.
Whatever that will look like, it would be nice to avoid secrets in configuration files.
