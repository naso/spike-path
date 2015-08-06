'use strict'

var gulp = require('gulp')
var del = require('del')

gulp.task('reset', ['clean'], function (done) {
  del([global.path.src + '/lib/jspm', 'node_modules', '.sass-cache'], done)
})
