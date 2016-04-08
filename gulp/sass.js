var gulp = require('gulp');
var sass = require('gulp-sass');

 
gulp.task('sass', () => {
    return gulp.src('src/web/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
});