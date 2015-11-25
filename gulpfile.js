process.env.DISABLE_NOTIFIER = true;

var elixir = require('laravel-elixir');

//process.env.BROWSERIFYSHIM_DIAGNOSTICS=1;


/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir.config.js.folder = '../../public/src';
elixir.config.js.outputFolder = 'build/js';
elixir.config.css.outputFolder = 'build/css';
elixir.config.css.less.folder = '../../public/less';

elixir.config.js.browserify.transformers.push({
    name: 'browserify-shim',
    options: {}
});
elixir.config.js.browserify.watchify.enabled = true;

elixir.config.sourcemaps = false;


elixir(function(mix) {
    mix.less('app.less')
        .browserSync({
            proxy: 'he.app'
        });

    mix.styles([
        '../../../node_modules/semantic-ui/dist/semantic.min.css'
    ], 'public/build/css/vendor.css');

    mix.browserify('Application.js', 'public/build/js/bundle.js');
});
