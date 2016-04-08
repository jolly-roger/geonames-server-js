var gulp = require('gulp');


gulp.task('foundation-css', () => {
    return gulp.src('node_modules/foundation-sites/dist/foundation-flex.css')
        .pipe(gulp.dest('dist'));
});

gulp.task('foundation-js', () => {
    return gulp.src('node_modules/foundation-sites/dist/foundation.min.js')
        .pipe(gulp.dest('dist'));
});

gulp.task('foundation', ['foundation-css', 'foundation-js']);