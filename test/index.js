var fs = require('fs')
var gulp = require('gulp')
var clean = require('rimraf');
var should = require('chai').should()
var sprite = require('..')
var stream;

describe('sprite', function() {
  this.timeout(10000)
  describe('sprite(filename:string)', function () {
    beforeEach(function() {
      stream = gulp.src('audio/**/*')
        .pipe(sprite('sprite.ogg'))
        .pipe(gulp.dest('test/output'))
    })
    afterEach(function(done) {
      clean('test/output', done)
    })
    it('should output a file with given filename', function(cb) {
      stream
        .on('error', cb)
        .on('end', function() {
          should.exist(fs.statSync('test/output/sprite.ogg'))
          cb()
        })
    })
    it('should output a json file with meta info', function(cb) {
      stream
        .on('error', cb)
        .on('end', function() {
          should.exist(fs.statSync('test/output/sprite.json'))
          cb()
        })
    })
  })
  describe('sprite(filename:string)', function () {
    beforeEach(function() {
      stream = gulp.src('audio/**/*')
        .pipe(sprite('sprite.{mp3, m4a}'))
        .pipe(gulp.dest('test/output'))
    })
    afterEach(function(done) {
      clean('test/output', done)
    })
    it('should create multiple output if given object as extension', function(cb) {
      stream
        .on('error', cb)
        .on('end', function() {
          should.exist(fs.statSync('test/output/sprite.json'))
          should.exist(fs.statSync('test/output/sprite.mp3'))
          should.exist(fs.statSync('test/output/sprite.m4a'))
          cb()
        })
    })
  })
  describe('sprite(filename:string, options:object)', function() {
    beforeEach(function() {
      stream = gulp.src('audio/**/*')
        .pipe(sprite('sprite.wav', {json: false}))
        .pipe(gulp.dest('test/output'))
    })
    afterEach(function(done) {
      clean('test/output', done)
    })
    it('should accept json false to disable json output', function(cb) {
      stream
        .on('error', cb)
        .on('end', function() {
          fs.existsSync('test/output/sprite.json').should.equal(false)
          cb()
        })
    })
  })
  describe('sprite(options:object)', function() {
    beforeEach(function() {
      stream = gulp.src('audio/**/*')
        .pipe(sprite({name: 'sprite', format: 'mp4', json: false}))
        .pipe(gulp.dest('test/output'))
    })
    afterEach(function(done) {
      clean('test/output', done)
    })
    it('should accept options object only', function(cb) {
      stream
        .on('error', cb)
        .on('end', function() {
          fs.existsSync('test/output/sprite.mp4').should.equal(true)
          fs.existsSync('test/output/sprite.json').should.equal(false)
          cb()
        })
    })
  })
})
