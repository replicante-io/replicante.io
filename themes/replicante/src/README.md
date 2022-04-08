# Replicante Site Theme Sources

The Replicante.io website is statically generated using [Hugo](https://gohugo.io/).

The theme for the website is built on [Bootstrap](https://getbootstrap.com/) and styled with
[Sass](https://sass-lang.com/).
[Webpack](https://webpack.js.org/) is used to compile, minimise and bundle all the JS and CSS
into appropriate static assets then used by the theme.

To make changes to the theme's JS and CSS make changes to the files in this `src/` directory
then build the assets with `npm run build` (for development assets use `npm run dev`).
The build process will automatically clean up the theme `static/assets/` directory
and place the generated files in the appropriate locations.
