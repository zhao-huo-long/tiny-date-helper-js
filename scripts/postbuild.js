const gulp = require('gulp')

const { src, dest, task } = gulp

// const { rmSync, copyFileSync, cpSync } = require("fs");


// cpSync('./dist', '.', {
//   recursive: true,
//   filter(source, target){
//     console.log("source", source)
//     console.log("target", target)
//     return source.includes('.d.ts')
//   }
// });
task('copy', function(cb){
  console.log(cb)
  return src('./dist/**/*.d.ts').pipe(dest('.'));
})

gulp.series(task('copy', function(cb){
  console.log(cb)
  return src('./dist/**/*.d.ts').pipe(dest('.'));
}))


;[
  // "./dist",
].map(dir => {
  try {
    rmSync(dir, { recursive: true, })
  } catch (error) {
  }
});