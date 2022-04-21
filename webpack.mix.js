const mix = require('laravel-mix');
const path = require("path");
const tailwindcss = require("tailwindcss");

require("laravel-mix-purgecss");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

/*
 |--------------------------------------------------------------------------
 | Source folders
 |--------------------------------------------------------------------------
 */
const source = {
    styles: path.resolve("resources/sass"),
    scripts: path.resolve("resources/js"),
};

/*
 |--------------------------------------------------------------------------
 | Vue
 |--------------------------------------------------------------------------
 */
mix.vue();

/*
 |--------------------------------------------------------------------------
 | Styles: SCSS
 |--------------------------------------------------------------------------
 */
mix.sass(path.join(source.styles, "app.scss"), "public/css");

/*
 |--------------------------------------------------------------------------
 | Scripts
 |--------------------------------------------------------------------------
 */
mix.js(path.join(source.scripts, "app.ts"), "public/js");

/*
 |--------------------------------------------------------------------------
 | Options
 |--------------------------------------------------------------------------
 */
mix.options({
    processCssUrls: false,
    postCss: [ tailwindcss("./tailwind.config.js") ],
});

/*
 |--------------------------------------------------------------------------
 | PurgeCss
 |--------------------------------------------------------------------------
 */
mix.purgeCss({
    enabled: mix.inProduction(),
    content: [
        "resources/**/*.php",
        "vue/**/*.vue",
    ],
});

/*
 |--------------------------------------------------------------------------
 | Webpack
 |--------------------------------------------------------------------------
 */
mix.webpackConfig({
    resolve: {
        extensions: [ '.ts', '.json', '.vue' ],
        alias: {
            '@': path.resolve(__dirname, './vue'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [ /\.vue$/ ] }
            }
        ]
    },
});
