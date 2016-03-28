'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var path = require('path');


gulp.task('babel', ['babel-web']);

gulp.task('babel-web', ['clear'], () => {
    return gulp.src('src/web/**/*.js')
        .pipe(babel({
            presets: ['react', 'es2015']
        }))
        .pipe(gulp.dest('build/web/es5'));
});

gulp.task('views', ['clear'], function () {
    return gulp.src('src/web/**/*.html')
        .pipe(gulp.dest('build/web'));
});

gulp.task('browserify', ['babel'], () => {
    return gulp.src('build/web/es5/index.js')
        .pipe(browserify({
            basedir: './build/web/es5'
        }))
        .pipe(gulp.dest('build/web'));
});

gulp.task('clear', () => {
    return gulp.src('build/*', {read: false})
        .pipe(clean());
});

gulp.task('default', ['browserify', 'views']);