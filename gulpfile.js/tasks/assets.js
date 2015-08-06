'use strict'

var gulp = require('gulp')
var changed = require('gulp-changed')
var browsersync = require('browser-sync')

gulp.task('assets', function () {
  return gulp.src(global.path.src + '/assets/**/*.{svg,png,jpg,woff2,ttf,woff}', {
      base: global.path.src
    })
    .pipe(changed(global.path.dist))
    .pipe(gulp.dest(global.path.dist))
})

gulp.task('assets.watch', ['assets'], browsersync.reload)
