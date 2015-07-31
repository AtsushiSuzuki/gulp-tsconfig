var path = require('path');
var es = require('event-stream');
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function tsconfig(options) {
  var filename = (options && options.filename) ? path.normalize(options.filename) : 'tsconfig.json';
  var conf = (options && options.config) || {};
  var files = [];

  return through.obj(function (file, enc, done) {
    var self = this;
    if (file.relative === filename) {
      file.pipe(es.wait(function (err, body) {
        if (err) {
          return done(new gutil.PluginError('gulp-tsconfig', err));
        }
        try {
          conf = JSON.parse(body);
        } catch (e) {
          return done(new gutil.PluginError('gulp-tsconfig', e));
        }
        done();
      }));
    } else {
      files.push(path.join(path.relative(file.cwd, file.base), file.relative));
      done();
    }
  }, function (done) {
    files.sort();
    conf.files = files.map(function (str) { return str.replace(/\\/g, '/'); });
    this.push(new gutil.File({
      cwd: '',
      base: '',
      path: filename,
      contents: new Buffer(JSON.stringify(conf, null, 2))
    }));
    done();
  });
};
