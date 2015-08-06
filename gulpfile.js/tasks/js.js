'use strict'

var gulp = require('gulp')
var exec = require('child_process').execSync
var browsersync = require('browser-sync')
var changed = require('gulp-changed')

gulp.task('js', function () {

  if (process.env.NODE_ENV === 'production') {
    exec('npm run buildjs', function (err, stdout, stderr) {
      console.log(stdout)
      console.log(stderr)
      return err
    })
    return gulp.src([global.path.src + '/js/worker/*.js'], {
        base: global.path.src
      })
      .pipe(changed(global.path.dist))
      .pipe(gulp.dest(global.path.dist))
  } else {
    gulp.src([global.path.src + '/js/**/*.*', global.path.src + '/config.js'], {
        base: global.path.src
      })
      .pipe(changed(global.path.dist))
      .pipe(gulp.dest(global.path.dist))
      .pipe(browsersync.reload({
        stream: true
      }))
  }
})
