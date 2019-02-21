'use strict';
var gulp = require('gulp');
var concatCss = require('gulp-concat-css');

gulp.task('css', function() {
  return gulp.src(['./**/*.css', '!./node_modules/**'])
    .pipe(concatCss('styleCombined.css'))
    .pipe(gulp.dest('./proxy/public'));
});
