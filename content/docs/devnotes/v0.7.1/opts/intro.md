---
title: "Should it be better?"
date: 2010-03-02T13:43:30+01:00
draft: false
group: opts
weight: 101
---

Everyone wants a stable, fully-featured, performant software.

In a rush to get to super awesome software architectures with bind boggling performance,
correctness and essential needs are sometimes forgotten.

I have personally made that mistake at least once (and probably more).
In an attempt to avoid repeating the past I have decided to use documentation in place of
premature optimization.

At every stage when:

* The idea or desire for refactor surfaces:
* Changes to existing features are thought of:
* Large changes are needed to open up the possibility of a new potential feature:

Stop an think at what would be delayed by this!

If there is no immediate need to implement such ideas write down in a document in this section
what is to be done, why and how it would help, and why were these changes delayed.

Of course refactors and optimizations should **NOT** be rejected or ignored when needed:

* First of all, they often present some quite interesting challenges.
* Secondly, it comes a time when optimizations and refactoring are **NEEDED and they should
  not be delayed** without good reasons.
  There is a middle ground between do them now and do them never!
* Optimisations and refactoring to make feature implementation easier is good.
  They should only be avoided if **premature** (is the code slow or *suspected* to be slow?
  Is that easier-to-implement-after-refactor feature *guaranteed* to be implemented?).
