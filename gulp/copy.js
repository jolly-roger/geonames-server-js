var gulp = require('gulp');


gulp.task('html', () => {
    return gulp.src('src/web/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('jquery', () => {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-build', ['browserify'], () => {
    return gulp.src(['_build/web/*', '!_build/web/es5'])
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', ['copy-build', 'html', 'jquery', 'foundation', 'sass']);
