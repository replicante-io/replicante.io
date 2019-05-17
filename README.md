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

  * The static site is built with [Hugo](https://gohugo.io/) (v0.40.2).
  * Documentation is built with [Docusaurus](https://docusaurus.io/).
  * Documentation sources are stored in separate repos.
  * Legacy documentation is built with [GitBook](https://toolchain.gitbook.com/) (migration is in progress).


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


## Publishing
```bash
aws s3 sync dist/ s3://<bucket>/
```
