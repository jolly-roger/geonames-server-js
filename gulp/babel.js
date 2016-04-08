var gulp = require('gulp');
var babel = require('gulp-babel');


gulp.task('babel-web', () => {
    return gulp.src('src/web/**/*.js')
        .pipe(babel({
            presets: ['react', 'es2015']
        }))
        .pipe(gulp.dest('_build/web/es5'));
});


gulp.task('babel', ['babel-web']);