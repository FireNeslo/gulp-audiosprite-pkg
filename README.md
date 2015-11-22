gulp-audiosprite-pkg - v1.0.0
===

Gulp plugin for use with audiosprite-pkg
## Install

### npm
```bash
$ npm install FireNeslo/gulp-audiosprite-pkg --save
```
## Usage

```js
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

```
## Test
```bash
$ npm test
```

## Docs
```bash
$ npm run docs
```

##API
## audio(filename|options, options)

### Params:

* **filename** *string* - name with output format(s)
```js
// simple
gulp.src('**')
  .pipe(audio('simple.mp3'))
  .pipe(gulp.dest('out')) // out: ['simple.mp3', 'simple.json']

// multi
gulp.src('**')
  .pipe(audio('multi.{mp3,ogg}'))
  .pipe(gulp.dest('out')) // out: ['multi.mp3','multi.ogg','multi.json']

```

* **options** *object* - input and output options
```js
// defaults
gulp.src('**')
  .pipe(audio({
    VBR: [0-9], // -1 disables VBR
    name: 'output.ogg',
    jsonName: 'output.json', // name of json file defaults to the same as name
    json: 'jukebox', //  ('jukebox', 'howler', 'createjs') or false (no json)
    format: ['ogg'], // output format or formats
    ffmpeg: 'ffmpeg', // Path to FFMpeg installation
    bitRate:  AUTO,
    trackGap: 1, // Silence gap between tracks (in seconds)
    sampleRate: 44100,
    channelCount: 1,  // (1=mono, 2=stereo)
    minTrackLength: 0, // Minimum track duration (in seconds)
    bufferInitialSize: 300000, // Initial size of storage buffer in bytes
    bufferIncrementSize: 100000, //	Incremental growth of storage buffer in bytes.
    // set any input options
    input: function input(file, defaults) {
      return defaults
    },
    // set any output options
    output: function rename(defaults) {
      return defaults
    },
  }))
  .pipe(gulp.dest('out')) // out: ['multi.mp3','multi.ogg','multi.json']

```
