Replicante Web Site
===================
A repository to hold [Replicante](https://replicante.io/) website.


Layout
------

  * The static site is built with [Hugo](https://gohugo.io/) (v0.40.2).
  * Documentation is stored in separate repos.
  * Documentation is built with [GitBook](https://toolchain.gitbook.com/).


Building
--------
```bash
# TODO: Build books in all their versions.

# Build theme assets.
cd themes/replicante/src
npm install
npm run build

# Build the full site.
cd ../../../
hugo
```
