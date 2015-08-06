'user strict'

var gulp = require('gulp')
var browsersync = require('browser-sync')
var run = require('run-sequence')

gulp.task('serve', function () {

  process.env.NODE_ENV = 'development'
  if (process.argv[3] === '--prod') {
    process.env.NODE_ENV = 'production'
  }

  run('build', function () {

    browsersync.init(global.config.browsersync)

    if (process.env.NODE_ENV === 'development') {
      gulp.watch(global.config.sass.watch, ['sass'])
      gulp.watch(global.path.src + '/*.html', ['html'])
      gulp.watch(global.path.src + '/js/**/*.js', ['js'])
      gulp.watch(global.path.src + '/lib/**/*.*', ['lib.watch'])
      gulp.watch(global.path.src + '/assets/**/*.{svg,png,jpg,woff2,ttf,woff}', ['assets.watch'])
    }
  })

})
