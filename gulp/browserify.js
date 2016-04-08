var gulp = require('gulp');
var browserify = require('gulp-browserify');


gulp.task('browserify', ['babel'], () => {
    return gulp.src('_build/web/es5/index.js')
        .pipe(browserify({
            basedir: './_build/web/es5'
        }))
        .pipe(gulp.dest('_build/web'));
});