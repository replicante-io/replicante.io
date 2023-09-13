---
title: "MongoDB"
date: 2020-03-06T21:13:55Z
draft: false
group: official
weight: 203
---

[MongoDB](https://www.mongodb.com/) is a document database.

## Supported versions

{{% table-wrapper %}}
| Agent Version | MongoDB Version | MongoDB Mode |
| ------------- | --------------- | ------------ |
| 0.1.0+        | 3.6+            | Replica Set  |
{{% /table-wrapper %}}

## Install

Follow the instructions in the [installation]({{< ref "../info/install.md" >}}) page.

The repository for the MongoDB agent is <https://github.com/replicante-io/repliagent-mongodb>.

## Configuration

```yaml
# For available general agent options check
# https://github.com/replicante-io/replisdk-rust/blob/main/src/agent/framework/configuration.example.yaml

# Network addresses for the MongoDB node depending on intended client.
addresses:
  # MongoDB node address within the replica set.
  cluster: ~

  # Address of the MongoDB node managed by the agent.
  local: "localhost:27017"

# Timeout in seconds for connections with the server to be established.
connection_timeout: ~

# MongoDB authentication credentials and mode.
credentials: ~
#credentials:
#  # The authentication mechanism to use.
#  #
#  # Valid values are: GSS-API | MONGODB-X509 | PLAIN | SCRAM-SHA-1 | SCRAM-SHA-256
#  mechanism: ~
# 
#  # Username to authenticate to MongoDB with.
#  username: ~
# 
#  # Name of the users database to authenticate against.
#  source: ~

# The amount of time in seconds to wait between server health checks.
heartbeat_frequency: ~

# The amount of time in seconds to keep idle connections open for reuse.
#
# A value of zero means that connections will not be closed for being idle.
max_idle_time: ~

# TLS configuration for connections to the server.
tls: ~
#tls:
#  # The client should ignore invalid certificates from the server.
#  #
#  # INSECURE: allowing invalid certificates can result in connections to compromised servers.
#  allow_invalid_certificates: ~
#
#  # The client should ignore invalid certificate hostnames.
#  #
#  # INSECURE: allowing invalid hostnames can result in connections to compromised servers.
#  allow_invalid_hostnames: ~
#
#  # Path to the CA file to verify the server certificate with.
#  ca_file_path: ~
#
#  # Path to the client certificate to present to server.
#  cert_key_file_path: ~

# Configure MongoDB version detection strategies.
version_detect:
  # Run a command to detect the MongoDB version.
  #
  # By default the agent will run mongod --version to detect the version.
  # Any command MUST return the version in the same format.
  command: ~
  #command:
  #  # Arguments passed to the command to execute.
  #  args: ["--version"]
  #
  #  # Name or path of the command to execute.
  #  command: mongod
  #
  #  # Environment variables to set for the command execution.
  #  env: {}

  # Detect the version by reading it out of a file.
  #
  # This mode is only enabled if a path is provided.
  #
  # The contents of the file MUST be in the same format as the command output.
  file: ~
```

## Upgrades notes

See the [full changelog] for all details.

<!-- markdownlint-disable-next-line MD013 MD034 -->
[full changelog]: {{< versioned "https://github.com/replicante-io/repliagent-mongodb/blob/{version}/CHANGELOG.md" >}}
