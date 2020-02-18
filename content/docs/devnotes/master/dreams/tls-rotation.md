---
title: "TLS certificate rotation"
date: 2020-02-13T20:18:25Z
draft: false
group: dreams
weight: 221
---

Once of the original dreams for Replicante was to have a WebUI button/automation around TLS certificates:

  * Check certificate validity dates (for all certificates in the chain)
  * Integrate with some certificate manager solution like [lemur](https://github.com/Netflix/lemur)
  * Provide an action and playbook to replace certificates on all nodes
  * Consider that CAs may needs to be replaced as well as leaf certs:
    * Install two CA certificates (old and new) as the trusted CAs for nodes
    * Rolling deploy leaf certificates built from the new CA to all nodes
    * Replace the two CA certificates with only the new one
  * CAs add complexity because there are multiple levels and not all are always managed by the
    same organisation and/or department.
