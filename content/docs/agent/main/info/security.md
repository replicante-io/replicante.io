---
title: "Security Considerations"
date: 2020-03-06T21:13:11Z
draft: false
group: info
weight: 4
---

This page focuses on security considerations of running agents.

The security considerations for the overall Replicante ecosystem design are documented in the
security section of the [admin manual]({{< docs-link "core" "stable" "security/considerations" >}}).

## HTTPS

By default communication with Replicante Core happens over HTTP, with Core initiating connections.

This is not a secure setup (unless you trust the network, but you don't right?).
At the very least this exposes the system to [replay attacks]:
a malicious user can record a legitimate request and re-send it to the agent at will.

Official agents support HTTPS-only servers,
with mutual certificate verification required for actions to be enabled.

{{% notice class="info" %}}
The actions system can only be enabled if mutual HTTPS verification is enforced.  
This is by design as actions can easily compromise datastores if used carelessly or maliciously.
{{% /notice %}}

## Runtime user

The agent may require some privileges on a server to perform actions
such as restart datastores or update TLS certificates.

The recommended approach is to run the agent under a user with limited permissions
and grant extra permissions as and when required.

Specific agent's documentation will provide extra information and details
regarding the permissions needed by the agent itself.

[replay attacks]: https://en.wikipedia.org/wiki/Replay_attack
