'use strict'

var gulp = require('gulp')
var changed = require('gulp-changed')
var browsersync = require('browser-sync')

gulp.task('lib', function () {
  if (process.env.NODE_ENV === 'development') {
    return gulp.src(global.path.src + '/lib/**/*.*', {
        base: global.path.src
      })
      .pipe(changed(global.path.dist))
      .pipe(gulp.dest(global.path.dist))
  }
})

gulp.task('lib.watch', ['lib'], browsersync.reload)
