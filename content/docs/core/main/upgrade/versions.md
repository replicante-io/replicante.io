---
title: "Version Compatibility"
date: 2020-03-03T22:50:40Z
draft: false
group: upgrade
weight: 403
---
<!-- markdownlint-disable MD033 -->

Replicante follows the [semantic versioning](https://semver.org/) specification to
indicate changes that can pose compatibility issues among versions.

The "public API" of Replicante Core is comprised of a set of different interfaces:

* The public endpoints of the API component.
* The data schema of records returned by the API or published to the streaming platform.
* The supported agent communication protocols.

The table below shows a summary of supported agent protocols and minimum upgrade version:

{{% table-wrapper striped=true %}}
| Replicante Version | Supported Agent API | Upgrade from |
| ------------------ | ------------------- | ------------ |
| 0.7.x              | v1                  | N/A*         |
| 0.6.x              | v1                  | N/A*         |
| 0.5.x              | v1                  | N/A*         |
{{% /table-wrapper %}}

<sup>*</sup> Versions below 1.0.0 are early development released with large breaking changes and
realistically unlikely need support for rolling update.
