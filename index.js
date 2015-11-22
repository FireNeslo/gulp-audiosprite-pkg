var AudioSprite = require('audiosprite-pkg')
var through = require('through2')
var path = require('path')
var xtend = require('xtend')
var Vinyl = require('vinyl')

function rename(file, options) {
  return path.basename(file.relative, path.extname(file.relative))
}

function configure(file, options) {
  var defaults =  {name: rename(file, options)}
  if(options.input) {
    defaults = options.input(file, defaults) || defaults
  }
  return defaults
}

function setup(options, defaults) {
  if(typeof options === 'string') {
    var name = path.basename(options) || 'output.ogg'
    var format = path.extname(options).slice(1)
    if(~format.indexOf('{')) {
      format = format.slice(1, -1).split(/\s*,\s*/g)
    }
    options = {format: format || 'ogg', name: name}
  }
  if(defaults === false) options.json = false
  if(typeof defaults === 'string') options.json = defaults
  else options = xtend(options, defaults)
  if(options.name.indexOf('.')<0) options.name += '.ogg'
  return options
}

module.exports = function transformAudioSprite(options, defaults) {
  var audio = new AudioSprite(options = setup(options, defaults)), count;
  function input(file, encoding, callback) {
    audio.input(file, configure(file, options), function() {callback()})
  }
  function output(callback, file) {
    if(options.json !== false) {
      this.push(new Vinyl({
        path: options.name.replace(path.extname(options.name), '.json'),
        contents: new Buffer(JSON.stringify(audio.outputJson(options.json)))
      }))
    }
    function files(format) {
      var config = {
        format: format,
        name: options.name.replace(path.extname(options.name),'.'+format)
      }
      if(options.output) config = options.output(config) || config
      this.push(file = new Vinyl({
        path: config.name,
        contents: through()
      }))
      audio.output(file.contents, config, function() {
        if(!--count) callback()
      })
    }
    if(Array.isArray(options.format)) {
      count = options.format.length
      options.format.forEach(files, this)
    } else {
      count = 1
      files.call(this, options.format)
    }
  }
  return through.obj(input, output)
}
