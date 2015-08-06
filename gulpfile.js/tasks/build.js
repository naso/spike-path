'use strict'

var gulp = require('gulp')
var run = require('run-sequence')

gulp.task('build', function (done) {
  if(process.env.NODE_ENV === undefined)
    process.env.NODE_ENV = 'production'
  run('clean', 'sass', 'assets', 'lib', 'js', 'html', done)
})
