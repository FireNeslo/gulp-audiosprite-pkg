var fs = require('fs')
var gulp = require('gulp')
var template = require('gulp-template')
var sprite = require('./index')

gulp.task('default', function() {
  return gulp.src('docs/README.md')
    .pipe(template({
      pkg: require('./package.json'),
      example: fs.readFileSync('docs/gulpfile.js')
    }))
    .pipe(gulp.dest('.'))
})
