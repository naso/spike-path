'use strict'

var gulp = require('gulp')
var replace = require('gulp-replace')
var minifyHtml = require('gulp-minify-html')
var browsersync = require('browser-sync')
var usemin = require('gulp-usemin')
var uglify = require('gulp-uglify')
var foreach = require('gulp-foreach')

gulp.task('html', function () {
  if (process.env.NODE_ENV === 'production') {
    return gulp.src(global.path.src + '/*.html')
      .pipe(foreach(function (stream, file) {
        return stream
          .pipe(replace('lib/jspm/system.js', 'js/app.js'))
          .pipe(replace('<script src="config.js"></script>', ''))
          .pipe(replace('<script>System.import(\'./js/Main\');</script>', ''))
          .pipe(usemin({
            js: [uglify()],
            html: [minifyHtml({
              empty: true
            })]
          }))
          .pipe(gulp.dest(global.path.dist))
      }))
  } else {
    return gulp.src(global.path.src + '/*.html')
      .pipe(gulp.dest(global.path.dist))
      .pipe(browsersync.reload({
        stream: true
      }))
  }
})
