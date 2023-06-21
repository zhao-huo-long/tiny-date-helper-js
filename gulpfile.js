
const { src, dest, task, series } = require('gulp')

task('copy', function (cb) {
  cb()
  return src(['./dist/**/*.d.ts',]).pipe(dest('.'));
})

exports.default = series(task('copy'));

