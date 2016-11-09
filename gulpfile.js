var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('useref', function(){
  return gulp.src('*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('copy_bower', function(){
  return gulp.src('bower_components/**/*')
    .pipe(gulp.dest('dist/bower_components'))
});

gulp.task('build', [`copy_bower`,`useref`],function(){
    console.log('Building files');
});

gulp.task('hello', function() {
  console.log('Hello Zell');
});
