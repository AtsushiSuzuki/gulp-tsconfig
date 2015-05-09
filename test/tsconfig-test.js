var assert = require('assert');
var gutil = require('gulp-util');
var File = require('vinyl');
var tsconfig = require('../');

describe('gulp-tsconfig', function () {
  it('should generate tsconfig.json', function (done) {
    var target = tsconfig();
    target.write(new File({
      path: 'app.ts'
    }));
    target.write(new File({
      path: 'lib/module.ts'
    }));
    target.write(new File({
      path: 'test/module-test.ts'
    }));
    target.end();

    target.pipe(gutil.buffer(function (err, files) {
      assert.ifError(err);
      assert.equal(1, files.length);
      var file = files[0];
      assert.equal('tsconfig.json', file.relative);
      assert.deepEqual({
        files: [
          'app.ts',
          'lib/module.ts',
          'test/module-test.ts'
        ]
      }, JSON.parse(file.contents));
      done();
    }));
  });

  it('should reorder files', function (done) {
    var target = tsconfig();
    target.write(new File({
      path: 'lib/module-b.ts'
    }));
    target.write(new File({
      path: 'lib/module-a.ts'
    }));
    target.end();

    target.pipe(gutil.buffer(function (err, files) {
      assert.ifError(err);
      assert.equal(1, files.length);
      var file = files[0];
      assert.deepEqual({
        files: [
          'lib/module-a.ts',
          'lib/module-b.ts'
        ]
      }, JSON.parse(file.contents));
      done();
    }));
  });

  it('should generate config file with specified name', function (done) {
    var target = tsconfig({
      filename: 'tsconfig-new.json'
    });
    target.end();

    target.pipe(gutil.buffer(function (err, files) {
      assert.ifError(err);
      assert.equal(1, files.length);
      var file = files[0];
      assert.equal('tsconfig-new.json', file.relative);
      done();
    }));
  });

  it('should generate tsconfig.json with specified config', function (done) {
    var target = tsconfig({
      config: {
        compilerOptions: {
          noImplicitAny: true,
          target: 'ES5',
          module: 'commonjs'
        }
      }
    });
    target.end();

    target.pipe(gutil.buffer(function (err, files) {
      assert.ifError(err);
      assert.equal(1, files.length);
      var file = files[0];
      assert.deepEqual({
        compilerOptions: {
          noImplicitAny: true,
          target: 'ES5',
          module: 'commonjs'
        },
        files: []
      }, JSON.parse(file.contents));
      done();
    }));
  });

  it('should overwrite existing tsconfig.json', function (done) {
    var target = tsconfig();
    target.write(new File({
      path: 'tsconfig.json',
      contents: new Buffer(JSON.stringify({
        compilerOptions: {
          noImplicitAny: true,
          target: 'ES5',
          module: 'commonjs'
        },
        files: ['main.ts']
      }))
    }));
    target.write(new File({
      path: 'app.ts'
    }));
    target.end();

    target.pipe(gutil.buffer(function (err, files) {
      assert.ifError(err);
      assert.equal(1, files.length);
      var file = files[0];
      assert.deepEqual({
        compilerOptions: {
          noImplicitAny: true,
          target: 'ES5',
          module: 'commonjs'
        },
        files: ['app.ts']
      }, JSON.parse(file.contents));
      done();
    }));
  });
});
