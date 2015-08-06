'use strict'

var gulp = require('gulp')
var del = require('del')

gulp.task('clean', function (done) {
  del([global.path.dist + '/**/*.*', global.path.dist], done)
})
