---
title: "Quick Start"
date: 2020-02-22T22:18:44Z
draft: false
menu:
  main:
    identifier: quick-start
    weight: 1
---
This guide will go through the steps needed to setup a local, container based, playground
to test out Replicante Core and the official agents.
By the end you should have a full system running that can be used to experiment with and
demo all replicante features and behaviours.

{{% notice class="warning" %}}
**Please note**: this guide does not explain how to install and configure replicante
for production use and it does not attempt to cover all possible configuration,
installation and management details.
{{% /notice %}}

## 0. Overview

Replicante provides an opinionated development tool, [`replidev`],
that can be used to demo and experiment with replicante's features as well.

In this guide we will use [`replidev`] to start a set of containers to run:

* A local Replicante Core stack
* The `replidev play server` to serve the node discovery API
* A MongoDB replica set and a Zookeeper cluster

Once you are familiar with how the playgrounds setup works you can run any node.
Only nodes with an agent attached to them will be exposed by the discovery server.

## 1. Get the code

There are two command line tools you will need to install:

* [`replidev`]: the Replicante development tool will start, stop and manage datastore and similar components.
* [`replictl`]: the Replicante command line client to interact with your playground's RepliCore stack.

### Install [`replidev`]

First of all, [`replidev`] requires some dependencies:

* The [Rust Programming Language](https://www.rust-lang.org/) toolchain `cargo` to build some of the tools.
* [`Podman`](https://podman.io/getting-started/installation) to manage containers (version 1.9 or later).
* [`easy-rsa`](https://github.com/OpenVPN/easy-rsa) and [`openssl`](https://www.openssl.org/)
  to generate certificates.
  * Tested with easyrsa 3.1.0.
  * Some versions of easyrsa are bugged and ask for a passphrase when they should not.

These tools must be available in `$PATH` for [`replidev`] to be able to use them.

Once dependencies are available fetch and compile [`replidev`]:

```bash
# Cargo install will fetch the git sources and make the compiled binary available in $PATH.
$ cargo install --git https://github.com/replicante-io/replicante.git replidev

# Check that replidev is working:
$ replidev --version
```

With all the dependencies in place we can get the [playgrounds repo](https://github.com/replicante-io/playgrounds),
which provides the definitions for datastore nodes and Replicante Core pods to start everything easily:

```bash
$ cd /path/for/replicante/repos
$ git clone https://github.com/replicante-io/playgrounds
$ cd playgrounds/

# Check replidev works and finds podman:
$ replidev play node-list
NODE   CLUSTER   STORE PORT   CLIENT PORT   AGENT PORT   STATUS   POD ID
```

### Install [`replictl`]

The replicante command line tool comes pre-built for some platforms.
The official documentation has a section on
[installing from pre-built binaries]({{< ref "docs/core/main/admin/install.md#from-pre-built-binaries" >}})
you can try first.

If that does not work for you or you want to install the latest version from the repo:

```bash
# Cargo install will fetch the git sources and make the compiled binary available in $PATH.
$ cargo install --git https://github.com/replicante-io/replicante.git replictl

# Check that replidev is working:
$ replictl --version
```

## 2. Start Replicante Core

Replicante Core uses TLS certificates to securely communicate with agents.
Mutual TLS authentication is required to enable the action system on agents.

First, generate certificates to be used by core and agents:

```bash
$ replidev gen-certs

[ MANY .+- ]
[ CAN BE IGNORED ]

--> Here is where you can find your certificates:
CA Certificate:     ./data/pki/replidev/ca.crt
CA Private Key:     ./data/pki/replidev/private/ca.key
Client Bundle:      ./data/pki/replidev/bundles/client.pem
Client Certificate: ./data/pki/replidev/issued/client.crt
Client Private Key: ./data/pki/replidev/private/client.key
Server Bundle:      ./data/pki/replidev/bundles/server.pem
Server Certificate: ./data/pki/replidev/issued/server.crt
Server Private Key: ./data/pki/replidev/private/server.key
```

This step is only needed once on a new machine or when the certificates expire.

With certificates in place start the Replicante Core stack, including all dependencies, with:

```bash
$ replidev play replicore-start
--> Create pod play-replicore
ab9fe546c021ba0a366a29d30a1996eea1a0d21d28be78bd5ea3f74c748a5c2a
--> Start container play-replicore-zookeeper
bb1206f6884fa85266a8c6276f29fb60ffd48aa03ebc03f03d7b2d5ecca595aa
--> Waiting 10s for play-replicore-zookeeper to start
--> Start container play-replicore-mongo
0d7efa500edab710c6613a7bddb7b3934986fc71631839787ce8e4cbd2310566
--> Waiting 10s for play-replicore-mongo to start
--> Start container play-replicore-kafka
e02fc11827131bc98ab9624b4dec87c0c2abfde70ff716570ec250afacc6d9b9
--> Start container play-replicore-app
89ae5c8e81dc620faa9181e69edcac1a276a21bb3b4dcfbc9b3dd90c28a6ab5b
--> Start container play-replicore-ui
e0daf45c61453d25e701cb4b641bf00357a9ca9cb3f2c32a31049efdd378e8c8
--> Initialise play-replicore/mongo from play-replicore-mongo
==> Checking (and initialising) mongo replica set ...
MongoDB shell version v4.2.5
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("37cb50ad-a3f4-483b-a712-00754db853e5") }
MongoDB server version: 4.2.5
---> Replica Set not initialised, correcting ...
---> Replica set configured, waiting for primary.
---> Checking Replica Set status ...
---> Replica Set Ready!
==> Ensuring all mongo indexes exist ...
MongoDB shell version v4.2.5
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("9ea25960-0f73-4866-903a-a04d6c8ea869") }
MongoDB server version: 4.2.5
--> Initialise play-replicore/kafka from play-replicore-kafka
Creating topic stream_events if needed
Creating topic task_discover_clusters if needed
Creating topic task_discover_clusters_retry if needed
Creating topic task_orchestrate_cluster if needed
Creating topic task_orchestrate_cluster_retry if needed
--> Initialise play-replicore/app from play-replicore-app
```

Once the above command completes you should have access to the WebUI at [http://localhost:3000](http://localhost:3000)
and you can follow replicante core logs with `podman logs -f play-replicore-app`.

## 3. Start the playgrounds API server

At this point you should see an empty WebUI.
Replicante Core won't do much until we tell it where to get clusters information.

The first step is to configure a `DiscoverySettings` so Replicante Core can start finding clusters.
To do so:

```bash
# Configure access to the Replicante Core instance.
$ replictl context login --context quick-start
Replicante API address: http://localhost:16016
(Optional) API CA certificate file: data/pki/replidev/ca.crt
(Optional) API client certificate bundle: data/pki/replidev/bundles/client.pem

$ replictl context select
Select default context (esc or q to clear selection): quick-start

$ replictl context list
ACTIVE   NAME          URL                      CA BUNDLE   CLIENT KEY   NAMESPACE   CLUSTER   NODE
*        quick-start   http://localhost:16016   Set         Set          Not set     Not set   Not set

# Set the default namespace for the context to keep commands shorter
$ replictl context change
Select a namespace (empty to clear selection): default
Select a cluster (empty to clear selection):
Select a node (empty to clear selection):

# Apply the DiscoverySettings configuration.
$ replictl apply -f replicore/apply/discovery.yaml
Object applied successfully
```

At this point the logs should start periodically emitting some errors like the one below:

```json
{"msg":"Failed to handle cluster discovery task","level":"ERRO","ts":"2022-09-14T20:51:05.323143396Z","module":"replicore_task_discovery","error_cause":"error sending request for url (http://localhost:9876/discover): error trying to connect: tcp connect error: Connection refused (os error 111)","error_layers":3,"error_message":"unable to fetch discovery record from backend default.playground","error_name":"FetchCluster"}
```

This is because this Replicante Core is configured to discover clusters from the
playgrounds API server running on your podman host.
To start this service open a new console and run:

```bash
$ replidev play server
--> Server listening at http://0.0.0.0:9876
```

If you look at the events list in the WebUI you should now see a `DISCOVERY_SETTINGS_APPLY` event.

## 4. Start a MongoDB cluster

It is now time to start our first datastore node.
Any of the datastores in <https://github.com/replicante-io/playgrounds/tree/main/stores>
can be started but only those where an agent is available will be listed in `replidev play server`.

For our quick start we will create a
[MongoDB Replica Set](https://github.com/replicante-io/playgrounds/tree/main/stores/mongo#replica-sets)
node:

```bash
$ replidev play node-start mongo/rs
--> Starting mongo/rs node play-node-JfC9yNPm for cluster mongo-rs
--> Create pod play-node-JfC9yNPm
8d2312ace6dab2e4fa5d4bbe4a8da166d9cbdda25caab2593f9416c2d896240a
--> Start container play-node-JfC9yNPm-mongo
b1eb87ba78ace5fa086eb9dfd931b9b9554a288a2a49fe6c56a5819fa3108d08
--> Start container play-node-JfC9yNPm-repliagent
c6ac1ae84034cf8a4dd3e203cb8a34851bedfe8faf1d6e635ae1ef7911255f91
```

If you wait up to a minute for replicante core to perform a discovery cycle
you should see a new cluster and agent in the WebUI!

Since the node has not been initialised it should be in the `NODE_DOWN` state.
Let's fix that now:

```bash
# Note that the port set in the host attribute is set dynamically and may be different.
# Use replidev play node-list to check for the correct store port.
$ podman exec -it play-node-JfC9yNPm-mongo mongo --eval 'rs.initiate({_id: "mongo-rs", members: [{_id: 0, host: "host.containers.internal:10000"}]})'
```

Once replicante checks the cluster, the node should be in the `UP` state.

But a one node replica set is not that useful,
let us add two more nodes and wait for them to show up (as `NODE_DOWN`):

```bash
$ replidev play node-start mongo/rs
--> Starting mongo/rs node play-node-8bMJWWs0 for cluster mongo-rs
--> Create pod play-node-8bMJWWs0
32593ddfdf9b0242d6290f962eb16eded166281cb059fac784fb6ee1ad3b2353
--> Start container play-node-8bMJWWs0-mongo
85b43eb866746c03f78bcd4efd7408724d9031e1e4af762782cf79204268a25c
--> Start container play-node-8bMJWWs0-repliagent
9c31fea7effdc97298efbc1c4573f744c3b5b5a92a44643047e3849f7e8eb719
$ replidev play node-start mongo/rs
--> Starting mongo/rs node play-node-q3mKXaG4 for cluster mongo-rs
--> Create pod play-node-q3mKXaG4
42a03c999b989153ae8d4ee0bd9aa9ce7ff45d73cfb545aad11623254fc5d695
--> Start container play-node-q3mKXaG4-mongo
fda39e282598843251638c9392516b1c8cf12be564d172ca68929c18af033ba7
--> Start container play-node-q3mKXaG4-repliagent
74d65f53899bc3e6ad778e8c53ff9ab214935352d4058186e758cf248e6ea4b6
```

And add them to the initialised replica set:

```bash
podman exec -it play-node-JfC9yNPm-mongo mongo --eval 'rs.add("host.containers.internal:10002");'
podman exec -it play-node-JfC9yNPm-mongo mongo --eval 'rs.add("host.containers.internal:10004");'
```

## 5. Start a zookeeper cluster

To demo replicante's cross-store features we are going to also start a
[zookeeper cluster](https://github.com/replicante-io/playgrounds/tree/main/stores/zookeeper).

This is very similar to what we did for MongoDB so you could skip it if you are not interested:

```bash
$ cat - > zookeeper.demo.json <<EOS
[{
  "id": "0",
  "port": 10006,
  "election": 10007,
  "client": 10008
}, {
  "id": "1",
  "port": 10010,
  "election": 10011,
  "client": 10012
}, {
  "id": "2",
  "port": 10014,
  "election": 10015,
  "client": 10016
}]
EOS
$ replidev play node-start zookeeper --var-file 'cluster=zookeeper.demo.json' --var 'my_id=0'
$ replidev play node-start zookeeper --var-file 'cluster=zookeeper.demo.json' --var 'my_id=1'
$ replidev play node-start zookeeper --var-file 'cluster=zookeeper.demo.json' --var 'my_id=2'
```

## 6. Schedule some actions

Actions are defined as YAML files.
This is a bit much for an example ping action but provides many advantages for real use systems:

* Define an action once and run it against any node.
* Build a library of actions you and your team needs often.
* Consistent interface to other Replicante Core features.

For our example we'll schedule a ping action against any cluster/node:

```bash
$ cat - > ping.yaml <<EOS
apiVersion: replicante.io/v0
kind: AgentAction
metadata:
  approval: granted
spec:
  action: agent.replicante.io/test.ping
EOS
$ replictl apply -f ping.yaml --cluster mongo-rs --node 'https://host.containers.internal:10001'
$ replictl apply -f ping.yaml --cluster mongo-rs --node 'https://host.containers.internal:10003'
$ replictl apply -f ping.yaml --cluster zookeeper --node 'https://host.containers.internal:10009'
```

Note how the same action definition is applied to any nodes across any cluster.

Actions are scheduled during the next cluster orchestrate operation, and updated every orchestration.
As a result we'll need two orchestration cycles to happen before our ping action is marked as done.

While we could wait for these cycles to be scheduled, we can also request additional
orchestration tasks to be performed against a specific cluster.
This is great for testing clusters and agents, like now, but when done too often it could
increase the load on agents and nodes in the cluster.

```bash
$ replictl cluster orchestrate --cluster mongo-rs
Cluster orchestration scheduled
```

## 7. Clean up everything

Once you are done experimenting with the playgrounds you can stop all processes and nodes.

Stop all the datastore nodes:

```bash
$ replidev play node-list
NODE                 CLUSTER     STORE PORT   CLIENT PORT   AGENT PORT   STATUS    POD ID  
play-node-ou1ZPcVe   zookeeper   10014        10016         10017        Running   0dc4ed954b0b  
play-node-epjE9kI8   zookeeper   10010        10012         10013        Running   26c235601056  
play-node-RJZBqGQf   zookeeper   10006        10008         10009        Running   47a69ad89a1f  
play-node-q3mKXaG4   mongo-rs    10004        10004         10005        Running   42a03c999b98  
play-node-8bMJWWs0   mongo-rs    10002        10002         10003        Running   32593ddfdf9b  
play-node-JfC9yNPm   mongo-rs    10000        10000         10001        Running   8d2312ace6da

$ replidev play node-stop play-node-ou1ZPcVe play-node-epjE9kI8 play-node-RJZBqGQf play-node-q3mKXaG4 play-node-8bMJWWs0 play-node-JfC9yNPm
--> Stop pod play-node-ou1ZPcVe
0dc4ed954b0b1798a6d00d492fa20bc44339d3056bf03464ea2737abcf150564
--> Remove pod play-node-ou1ZPcVe
0dc4ed954b0b1798a6d00d492fa20bc44339d3056bf03464ea2737abcf150564
--> Stop pod play-node-epjE9kI8
26c235601056c575549bf6e2dae4f478c85e3192a0ec39c182b3ea36eb61f1b5
--> Remove pod play-node-epjE9kI8
26c235601056c575549bf6e2dae4f478c85e3192a0ec39c182b3ea36eb61f1b5
--> Stop pod play-node-RJZBqGQf
47a69ad89a1f3a94aeac616b32eaa070de69dd469956bbf2a62979b1c559769e
--> Remove pod play-node-RJZBqGQf
47a69ad89a1f3a94aeac616b32eaa070de69dd469956bbf2a62979b1c559769e
--> Stop pod play-node-q3mKXaG4
42a03c999b989153ae8d4ee0bd9aa9ce7ff45d73cfb545aad11623254fc5d695
--> Remove pod play-node-q3mKXaG4
42a03c999b989153ae8d4ee0bd9aa9ce7ff45d73cfb545aad11623254fc5d695
--> Stop pod play-node-8bMJWWs0
32593ddfdf9b0242d6290f962eb16eded166281cb059fac784fb6ee1ad3b2353
--> Remove pod play-node-8bMJWWs0
32593ddfdf9b0242d6290f962eb16eded166281cb059fac784fb6ee1ad3b2353
--> Stop pod play-node-JfC9yNPm
8d2312ace6dab2e4fa5d4bbe4a8da166d9cbdda25caab2593f9416c2d896240a
--> Remove pod play-node-JfC9yNPm
8d2312ace6dab2e4fa5d4bbe4a8da166d9cbdda25caab2593f9416c2d896240a
```

Stop the replicante core stack:

```bash
$ replidev play replicore-stop
--> Stop pod play-replicore
812ac9e658ca9c36119bfa2375624f4b57f292fa8675d6d1826ba9551234c2a6
--> Remove pod play-replicore
812ac9e658ca9c36119bfa2375624f4b57f292fa8675d6d1826ba9551234c2a6
```

Stop the `replidev play server` by hitting `Ctrl-C` on the terminal where it is running.

And finally you can delete all node and core data with:

```bash
$ replidev play node-clean-all --confirm
--> Clean data for all nodes (from ./data/nodes/)

$ replidev play replicore-clean --confirm
--> Clean data for play-replicore pod (from ./data/replicore)
```

[`replidev`]: https://github.com/replicante-io/replicante/tree/main/devtools/replidev
[`replictl`]: https://github.com/replicante-io/replicante/tree/main/bin/replictl
