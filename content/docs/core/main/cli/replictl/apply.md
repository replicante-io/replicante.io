---
title: "replictl apply"
date: 2020-03-04T21:02:47Z
draft: false
group: cli
weight: 552
---

Create or update system and clusters configuration.  
This interface is modelled after [kubernetes](https://kubernetes.io/) for its
many advantages and for the familiarity of the format.

{{% notice class="danger" %}}
**This interface is NOT meant to interact with kubernetes or imply any
kind of relationship between the two project.**
{{% /notice %}}

{{% notice class="warning" %}}
Unlike `kubectl apply`, Replicante can only apply one object at a time
and files must contain only one document in each YAML file.

This limitation will be removed in the future.
{{% /notice %}}

```text
replictl apply [OPTIONS] --file <FILE>
```

## Objects format

Because of the extensible nature of this interface the objects you can
apply and their specification are documented in the relevant features.

Regardless of the object you are looking to apply the following attributes are required:

* `apiVersion` is a string in the format `<DOMAIN>/<VERSION>` that determines the API group
  and version for the object you are applying.
* `kind` is a string that identifies the class of object you are applying.
  Available options for this value are determined by the API group.
* `metadata` is an object that includes information about the object you are applying.
  Usually the `metadata` object includes an identifier for the object as well as a scope.
* `spec` is determined by the `apiVersion` and `kind`.

The details of the `metadata` attributes as well as all `spec` attributes
are documented along side the supported `apiVersion` and `kind` values.

The scope attributes can be used to set or override values in the `metadata` object:

* The `namespace` scope attribute is set as the `metadata.namespace` attribute.
* The `cluster` scope attribute is set as the `metadata.cluster` attribute.
* The `node` scope attribute is set as the `metadata.node` attribute.
