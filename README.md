Replicante Web Site
===================
A repository to hold [Replicante](https://replicante.io/) website.


Layout
------

  * The static site is built with [Hugo](https://gohugo.io/) (v0.40.2).
  * Documentation is built with [Docusaurus](https://docusaurus.io/).
  * Documentation sources are stored in separate repos.
  * Legacy documentation is built with [GitBook](https://toolchain.gitbook.com/) (migration is in progress).


Building
--------
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


Publishing
----------
```bash
aws s3 sync dist/ s3://<bucket>/
```
