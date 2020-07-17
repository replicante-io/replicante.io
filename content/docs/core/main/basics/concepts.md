---
title: "Essential Concepts"
date: 2020-02-22T21:39:38Z
draft: false
group: basics
weight: 3
---

## Actions
Tasks performed by agents, usually on request by Replicante Core.  
Actions properies and attributes are defined in the [specification].

## Agents
Processes running along side Datastore processes on nodes.  
They provide a [specification] compliant interface to the datastore and perform actions.

## Clusters
A collection of nodes that work together to provide the services offered by the datastore.

## Datastores
Any software that implement the [specification], either alone or with the aid of an agent.

## Events
Records of ativities and changes that happened to or on nodes as well as within Replicante Core.

## Replicante Core
The central component that runs as a highly available distributed software to orchestrate all clusters.  
Orchestration is achieved by continuously observing nodes and generating actions to converge to a desired state.

## The Protocol
The protocol defined in the [specification] for Replicante Core to interact with the agents.


[specification]: {{% docs-link "spec" "stable" %}}
