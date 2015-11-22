var gulp = require('gulp')
var audio = require('../index')

gulp.task('simple', function() {
  return gulp.src('audio/*')
    .pipe(audio('sprite.mp3'))
    .pipe(gulp.dest('build'))
})

gulp.task('moderate', function() {
  return gulp.src('audio/*')
    .pipe(audio('sprite.{mp3, ogg}', { json: 'howler' }))
    .pipe(gulp.dest('build'))
})

gulp.task('advanced', function() {
  return gulp.src('audio/*')
    .pipe(audio({
      json: 'howler', // json output
      name: 'sprite', // shared filename
      format: ['mp3','mp4','ogg'], // output formats
      trackGap: 0 // AudioSprite options
    }))
    .pipe(gulp.dest('build'))
})
