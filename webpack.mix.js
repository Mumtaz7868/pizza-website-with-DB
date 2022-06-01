let mix = require("laravel-mix");

mix.js("resources/js/app.js", "/public/js/app.js").setPublicPath("dist");
mix.babelConfig({
  plugins: ["@babel/plugin-proposal-class-properties"],
});
