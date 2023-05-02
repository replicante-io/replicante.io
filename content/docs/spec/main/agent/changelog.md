---
title: "CHANGELOG"
date: 2022-11-07T08:50:00Z
draft: false
spec: agent
weight: 5
---

<!-- markdownlint-disable MD022 MD024 MD032 -->
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
- **BREAKING**: Dynamic Nodes Membership behaviour.
- **BREAKING**: Node Status information.
- Action: Cluster Initialisation.
- Action: Add Node.
- Action: Join Cluster.
- Action: Remove Node.
- Definition of Agent Action Invocation Records.

### Changed
- Restructured the agents specification documents.

## 0.3.1 - 2022-09-25
### Changed
- Clarify meaning of primary and secondary shard roles.
- Clarify that agents aren't required as long as data store nodes can respect the model.
- Fixed typos.

### Removed
- Optional operator friendly name.

## 0.3.0 - 2020-03-07
### Changed
- **BREAKING**: Added actions API.
- **BREAKING**: Rename incorrectly named `v1` endpoints.

## 0.2.0 - 2019-02-20
### Changed
- **BREAKING**: Encode shard roles in lowercase.
- **BREAKING**: Replaced shard's `last_op` with a `commit_offset`.
- **BREAKING**: Replication lag has a specified unit (no longer assumed to be seconds).

### Removed
- Half-thought performance stats.

## 0.1.0 - 2018-01-28
### Added
- Initial model definition.
