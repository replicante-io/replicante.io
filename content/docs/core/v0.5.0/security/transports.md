---
title: "Agent Transports"
date: 2020-02-25T22:38:54Z
draft: false
group: security
weight: 202
---

Replicante Core issues commands to the agents.
This design simplifies the agent interaction logic and allows for dynamic scaling controlled at core side.

By default, communication with agents is performed over HTTP(S) as detailed below.
This approach makes the system easy to develop, debug, and interact with.
Using HTTP(S) as the transport layer also allows access to many existing tools for any need.

Replicante may at some point include other agent transports.


## Transport security
Because a network is involved in the core-agent communication there are
some security aspects that must be considered and precautions to take.

There are two main ways for the transport to be abused:

  * Agent information and monitoring data could be faked.
    This would lead Replicante Core to infer the incorrect state of the node and issue
    corrective actions that could harm a healthy node.
  * Actions sent to agents could be faked.
    This would cause the agents to take actions that are issued with malicious intent.

There is also the possibility of packets being dropped by the transport layer.
This could result in a lack of visibility and/or an inability to issue actions to the node.
Because such event is indistinguishable from a regular network outage there is not much
that can be done to defend the system against this kind of attacks.

Replicante delegates security of the network to the transport layer.


## HTTP(S) transport
The HTTP transport is the easiest to use but also the least secure.

With this transport Replicante core act as an HTTP client for the agent.
Connections are established by Replicante Core and closed when no longer needed to avoid all
the complexity of long-running TCP connections (for example need for heart-beats and reconnect logic)
although this comes at the cost of repeated TPC connection handshakes.

As mentioned, HTTP is an insecure protocol but there are ways to add security to it.
Most notable is the HTTPS protocol with mutual authentication.

Once the identity of the agent is verified by Replicante Core through HTTPS and the
channel is encrypted it is possible for agents to verify the identity and message
integrity from Replicante Core by signing messages.

The HTTP transport was mainly inspired by the advantages shown by
[Prometheus](https://prometheus.io/docs/introduction/faq/#why-do-you-pull-rather-than-push?)
but also for the added benefit of a simpler architecture for Replicante Core.


### Configuration
By default agents start using the HTTP protocol alone.
Because this is insecure, the action system cannot be enabled on agents without enabling HTTPS too.

To enable the use of HTTPS and mutual authentication the following certificates are required:

  * A Certificate Authority certificate, self-signed is good, to generate all other certificates.
  * A **server** certificate for each agent in the system, signed by the above CA.
  * A signle **client** certificate for Replicante Core, signed by the above CA.

Once the certificate are generated and deployed, update the agents to use HTTPS mutual authentication.
Visit the specific agent's documentation for this process.

{{% notice class="warning" %}}
**Namespaces** are on the way, but not here yet.  
To reduce the amount of work to re-do to introduce namespaces some parts of the system refers to them.

In this case, the configuration includes a section that stores "namespace to be" options
until namespaces are ready.
{{% /notice %}}

For now, the Replicante Core configuration is set in a temporary section in the configuration file:
```yaml
tmp_namespace_settings:
  https_transport:
    # One or more CAs that signed the agent's private keys.
    ca_bundle: 'path/to/agents/CAs/bundle.pem'
    # This private key needs to be signed by a CA known to EVERY agent.
    client_key: 'private/key/used/by/core.pem'
```
