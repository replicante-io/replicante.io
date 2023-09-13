---
title: "Installation"
date: 2020-03-06T21:13:02Z
draft: false
group: info
weight: 2
---

Official agents can be installed from pre-built binaries where available or compiled from code.

Docker images are also provided but the nature of container isolation may complicate their use.

## 1. Install

### From pre-built binaries

Pre-built binaries are helpful for users to get up and running quickly.

Unfortunately they require a great deal of effort from the community to be available for all
the popular distributions that people my want to use.
The Replicante Community cannot afford to provide pre-built binaries for all popular
Linux distributions at this stage but we do want to provide something to make things
easier on people.

Pre-built binaries are available for:

- Linux, amd64 architecture.

The steps below will install version 0.1.0 of the MongoDB agent.
Change the initial variables to install a different version and agent.

```bash
# Specify agent and version to install.
AGENT_NAME=repliagent-mongodb
AGENT_REPO=https://github.com/replicante-io/repliagent-mongodb
ARCH=linux-amd64
VERSION=v0.1.0

# Grab the binaries from GitHub:
wget "${AGENT_REPO}/releases/download/$VERSION/checksum.txt"
wget "${AGENT_REPO}/releases/download/$VERSION/${AGENT_NAME}-${ARCH}"

# Verify the integrity of the binaries:
sha256sum --check checksum.txt

# Verify the binaries work:
mv "${AGENT_NAME}-${ARCH}" "${AGENT_NAME}"
chmod +x "${AGENT_NAME}"
"./${AGENT_NAME}" --version
```

### From code

The `README.md` file in the Agent's repository documents the steps needed to compile agents.
Generally this is as simple as a `git clone` followed by a `cargo build --release`.

### With Docker

Docker images with the official agents pre-compiled are also available.

- MongoDB: <https://hub.docker.com/r/replicanteio/agent-mongodb>

To check the image works as expected (for example for MongoDB):

```bash
docker pull replicanteio/agent-mongodb:latest
docker run --rm -it replicanteio/agent-mongodb:latest repliagent-mongodb --version
```
