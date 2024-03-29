---
title: "Changelog"
date: 2020-02-18T23:18:45Z
draft: false
group: model
spec: agent
weight: 3
---

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased
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
