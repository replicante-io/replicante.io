# Replicante Web Site
A repository to hold [Replicante](https://replicante.io/) website.


## Code of Conduct
Our aim is to build a thriving, healthy and diverse community.  
To help us get there we decided to adopt the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/)
for all our projects.

Any issue should be reported to [stefano-pogliani](https://github.com/stefano-pogliani)
by emailing [conduct@replicante.io](mailto:conduct@replicante.io).  
Unfortunately, as the community lucks members, we are unable to provide a second contact to report incidents to.  
We would still encourage people to report issues, even anonymously.

In addition to the Code Of Conduct below the following documents are relevant:

  * The [Reporting Guideline](https://www.replicante.io/conduct/reporting), especially if you wish to report an incident.
  * The [Enforcement Guideline](https://www.replicante.io/conduct/enforcing)


## Adding new content
The `hugo new` command should be used to add content:

  * Skipping the `content/` prefix.
  * But including the `.md` file extention.
  * So `hugo new section/content.md`.

For some sections there are dedicated archetypes that should be used (with `--kind NAME`):

  * For `docs/agent/<version>/info/` use `agent-info`.
  * For `docs/agent/<version>/official/` use `agent-official`.
  * For `docs/core/<version>/admin/` use `core-admin`.
  * For `docs/core/<version>/apiref/` use `core-apiref`.
  * For `docs/core/<version>/basics/` use `core-basics`.
  * For `docs/core/<version>/cli/` use `core-cli`.
  * For `docs/core/<version>/features/` use `core-feature`.
  * For `docs/core/<version>/scale/` use `core-scale`.
  * For `docs/core/<version>/security/` use `core-sec`.
  * For `docs/core/<version>/upgrade/` use `core-upgrade`.
  * For `docs/devnotes/<version>/dreams/` use `devnotes-dream`.
  * For `docs/devnotes/<version>/notes/` use `devnotes-note`.
  * For `docs/devnotes/<version>/opts/` use `devnotes-optimise`.
  * For `docs/spec/<version>/agent/` use `spec-agent`.
  * For `docs/spec/<version>/model/` use `spec-model`.

### Versioned documents
The documents under the `docs/` sections are versioned.

Versions are handled as hugo sections:

  * Each set of documentation is its own section under `docs/` (for example the `docs/devnotes/` section).
  * Each version is then a sub-section for the same set of documents.
  * The `_index.md` file is only used for:
    * The sub-section title, used to set the version "name".
    * The weight of sub-section, used to order versions explicitly.
  * The current stable version for a section is set in `data/docs.yaml`.

To "cut" a new version:

  1. Make sure the `main` version is up to date and ready to be cut.
  2. Copy the full tree to the new version (`cp -r main/ vX.Y.Z/`).
  3. Update the title for the new version and all the weights (hint: use high weights for older versions).
  4. Update the stable version set in `data/docs.yaml`.


## Building
Build theme assets (if needed):
```bash
cd themes/replicante/src
npm install
npm run build
cd ../../../
```

Build the site only:
```bash
rm -r dist/  # Clean target before build.
hugo
```

### Publish to GitHub Pages
TODO

### Publishing to S3
```bash
aws s3 sync dist/ s3://<bucket>/
```
