# gulp-tsconfig

`gulp-tsconfig` generates `tsconfig.json` used by typescript.

## usage

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
