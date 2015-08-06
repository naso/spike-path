'use strict'

var requireDir = require('require-dir')

/**
 * Global path
 **/

global.path = {
  'src': './app',
  'dist': './website',
  'js': 'website/js/app.js'
}

/**
 * Global config
 **/

global.config = {}

/**
 * Global config - SASS
 **/

global.config.sass = {}
global.config.sass.autoprefixer = { browsers: ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] }
global.config.sass.src = global.path.src + '/sass/main.scss'
global.config.sass.watch = global.path.src + '/sass/**/*.scss'
global.config.sass.settings = {
  sass: global.path.src + '/sass',
  css: global.path.dist + '/css',
  image: global.path.dist + '/assets/img'
}

/**
 * Global config - Browser-sync
 **/

global.config.browsersync = {}
global.config.browsersync.server = { baseDir: global.path.dist }
// global.config.browsersync.files = ['public/**/*.html']

/**
 * Require tasks
 **/

requireDir('./tasks', {
  recurse: true
})
