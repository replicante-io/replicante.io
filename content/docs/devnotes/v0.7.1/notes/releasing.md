---
title: "Releasing"
date: 2022-09-11T21:45:27+01:00
draft: false
group: notes
weight: 11
---

This is a summary of the release steps for these Replicante Official tools:

* Official Agents.
* Replicante Common Crates for Rust.
* Replicante Core.
* The WebUI project.

Release of the above sub-projects is based on the `replidev release` commands.

The release process with `replidev release` is as follows:

```bash
# Prepare the repository for release.
# This command will guide you to update changelogs and versions.
$ replidev release prep

# Commit any changes done during the prep phase.
$ git commit .

# Run checks to ensure the release is ready.
$ replidev release check

# Push the release commit (if needed to fix errors raised by checking).
$ git push

# Once all changes are committed and the checks pass publish the release.
# This will also publish any crate/docker image in the project and tag the current commit.
$ replidev release publish

# Push the release tag.
$ git push --tags

# Create a new release in GitHub with appropriate description and changelog.
```

## Run through the quick start before release

Replicante has an official [quick start guide]({{< ref "quick-start.md" >}})
to introduce it to people.

Not only this provides a basic last-catch test but it is key that the first experience
works well at the first try for every user.

It is possible to test the quick start guide on the upcoming release before releasing:

1. Reach the `replidev release check` step for each component (agents, core, platforms, ...).
2. Update the quick start resources to reference the newly built images.
   * This relies on the check step building fully tagged container image for the release.
3. Follow the quick start guide to ensure it still works successfully, making updates as needed.

## Publishing artefacts

The `replidev release publish` command will push release artefacts to registries:

* Rust crates will be published to <https://crates.io/>.
* Docker images will be published to <https://hub.docker.com/u/replicanteio>.

For this to work the appropriate login command must be issued and valid credentials provided.

## Order of release

For the time being there is a requirement in release order.
I hope in the future this can be removed with the introduction of the Rust SDK.

1. [Required] <https://github.com/replicante-io/common>
2. [Recommended] <https://github.com/replicante-io/agents>
3. [Recommended] <https://github.com/replicante-io/replicante>
4. [Recommended] <https://github.com/replicante-io/webui>
5. [Recommended] <https://github.com/replicante-io/playgrounds>
6. [Recommended] <https://github.com/replicante-io/replicante.io>

## Post Release Duties

Once all changes are release some extra steps are needed:

1. Run through the quick start guide from start to finish to ensure all is still up to date.
2. Post new release notification in [Gitter](https://gitter.im/replicante-io/community).
