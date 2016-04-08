var gulp = require('gulp');
var clean = require('gulp-clean');


gulp.task('clear', ['copy'], () => {
    return gulp.src('_build', {read: false})
        .pipe(clean());
});