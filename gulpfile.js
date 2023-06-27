const clean = require('gulp-clean');

const { src, dest, task, series } = require('gulp')


task('del umd plugins dir', function (cb) {
  cb()
  return src(['./umd/plugins',]).pipe(clean())
})

task('copy umd file', function (cb) {
  cb()
  return src(['./umd/*',]).pipe(dest('.'));
})

exports.default = series(task('del umd plugins dir'), task('copy umd file'),);

