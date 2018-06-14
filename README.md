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
# Rebuild master version of books.
./build-books.sh

# [Re-]Build specific version of a book
./book.sh BOOK VERSION BOOK_SOURCE

# Build theme assets (if needed).
cd themes/replicante/src
npm install
npm run build
cd ../../../

# Build the full site.
rm -r dist/
hugo
```


Publishing
----------
```bash
aws s3 sync dist/ s3://<bucket>/
```
