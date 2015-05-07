var es = require('event-stream');
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function tsconfig() {
  var conf = {};
  var files = [];

  return through.obj(function (file, enc, done) {
    if (file.relative === 'tsconfig.json') {
      file.pipe(es.wait(function (err, body) {
        conf = JSON.parse(body);
        done();
      }));
    } else {
      files.push(file.relative.replace(/\\/g, '/'));
      done();
    }
  }, function (done) {
    conf.files = files;
    this.push(new gutil.File({
      cwd: '',
      base: '',
      path: 'tsconfig.json',
      contents: new Buffer(JSON.stringify(conf, null, 2))
    }));
    done();
  });
};
