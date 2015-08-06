'use strict'

var gulp = require('gulp')
var compass = require('gulp-compass')
var browsersync = require('browser-sync')
var autoprefixer = require('gulp-autoprefixer')

gulp.task('sass', function () {

  global.config.sass.settings.style = process.env.NODE_ENV === 'production' ? 'compressed' : 'nested'

  return gulp.src(global.config.sass.src)
    .pipe(compass(global.config.sass.settings))
    .on('error', function () {
      this.emit('end')
    })
    .pipe(autoprefixer(global.config.sass.autoprefixer))
    .pipe(gulp.dest(global.config.sass.settings.css))
    .pipe(browsersync.reload({ stream: true }))
})
