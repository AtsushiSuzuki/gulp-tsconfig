# gulp-tsconfig

`gulp-tsconfig` generates `tsconfig.json` used by typescript.

## example

In `Gulpfile.js`:

```js
var gulp = require('gulp');
var tsconfig = require('@atsushi_suzuki/gulp-tsconfig');

gulp.task('tsconfig', function () {
	// supply tsconfig.json and *.ts source files
	gulp.src(['tsconfig.json', 'lib/*.ts')
		// override .files with source file names
		.pipe(tsconfig())
		.pipe(gulp.dest('.'));
});
```

## usage

### tsconfig([options])

Returns gulp plugin (file object stream) that generates
`tsconfig.json` with property `files` for each input files.

If input file is `tsconfig.json`, the file is treated as source config and `files` is overwriten.

- options.filename [string] - specify config file name. defaults to `tsconfig.json`
- options.config [object] - specify default `tsconfig.json` configuration values. defaults to `{}`.
