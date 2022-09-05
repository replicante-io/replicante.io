---
title: "Kafka"
date: 2020-03-06T21:13:31Z
draft: false
group: official
weight: 202
---

[Kafka](https://kafka.apache.org/) is a distributed streaming platform.

## Supported versions

{{% table-wrapper striped=false %}}
| Agent Version | Kafka Version |
| ------------- | ------------- |
| 0.1.0+        | 1.0+          |
{{% /table-wrapper %}}

## Install

Follow the instructions in the [installation]({{< ref "../info/install.md" >}}) page.

## Configuration

```yaml
# Common agents options described in agent.example.yaml
agent: {}
  # ... snip ...


# Kafka specific configuration.
kafka:
  # Addresses used to locate the kafka services.
  target:
    # Kafka broker configuration.
    broker:
      # Address "host:port" of the kafka broker.
      uri: 'localhost:9092'

      # Network timeout for requests to Kafka.
      timeout: 10

    # Address "host:port" of the JMX server.
    #
    # By default kafka does not expose the JMX server.
    # To do so, set the `JMX_PORT` environment variable before starting the server.
    # For additional options see:
    #   https://github.com/apache/kafka/blob/1.1.1/bin/kafka-run-class.sh#L166-L174
    jmx: 'localhost:9999'

    # Zookeeper ensemble for the Kafka cluster.
    zookeeper:
      # Addresses "host:port" of the zookeeper ensemble.
      uri: 'localhost:2181'

      # Zookeeper session timeout.
      timeout: 10
```

## Upgrades notes

See the [full changelog]({{< versioned "https://github.com/replicante-io/agents/blob/{version}/agents/kafka/CHANGELOG.md" >}})
for all details.
