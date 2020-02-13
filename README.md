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


## Layout

  * The static site is built with [Hugo](https://gohugo.io/) (v0.64.0).
  * Legacy documentation is built with [Docusaurus](https://docusaurus.io/) (migration is in progress).


## Adding new content
The `hugo new` command should be used to add content:

  * Skipping the `content/` prefix.
  * But including the `.md` file extention.
  * So `hugo new section/content.md`.

For some sections there are dedicated archetypes that should be used (with `--kind NAME`:

  * For `docs/devnotes/dreams` use `devnotes-dream`.
  * For `docs/devnotes/notes` use `devnotes-note`.
  * For `docs/devnotes/opts` use `devnotes-optimise`.

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

  1. Make sure the `master` version is up to date and ready to be cut.
  2. Copy the full tree to the new version (`cp -r master/ vX.Y.Z/`).
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

All in one build:
```bash
# Builds docs and site:
./build.sh

# Clean all built files and re-builds them
./build.sh --clean
```

Build the site only (using docs already found in `static/docs`):
```bash
rm -r dist/  # Clean target before build.
hugo
```

### Publishing to S3
```bash
aws s3 sync dist/ s3://<bucket>/
```
