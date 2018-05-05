Replicante Web Site
===================
A repository to hold [Replicante](https://replicante.io/) website.


Layout
------

  * The static site is built with [Hugo](https://gohugo.io/) (v0.40.2).
  * Documentation is built with [GitBook](https://toolchain.gitbook.com/).
  * Documentation sources are stored in separate repos.


Building
--------
```bash
# (Re-)Build books (and each neede version).
rm -r static/docs/<BOOK>/<VERSION>
gitbook build <PATH/TO/BOOK> static/docs/<BOOK>/<VERSION>

# Build theme assets.
cd themes/replicante/src
npm install
npm run build

# Build the full site.
cd ../../../
rm -r dist/
hugo
```


Publishing
----------
```bash
aws s3 sync dist/ s3://<bucket>/
```
