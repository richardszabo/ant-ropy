var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var rev = require('gulp-rev-hash');

gulp.task('useref', function(){
    return gulp.src('*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('rev', function(){
// I was not able to add rev into useref so I use this awkward solution to execute revisioning in the dist folder
    return gulp.src('dist/*.html')
    .pipe(rev({assetsDir: 'dist'}))
    .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('copy_bower', function(){
  return gulp.src('bower_components/**/*')
    .pipe(gulp.dest('dist/bower_components'))
});

gulp.task('copy_pdf', function(){
  return gulp.src('*.pdf')
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
// a simple copy would be enough the compression does not make images smaller as they are already optimized
    return gulp.src('*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      // Setting interlaced to true
      interlaced: true
  })))
  .pipe(gulp.dest('dist'))
});

gulp.task('images2', function(){
// a simple copy would be enough the compression does not make images smaller as they are already optimized
    return gulp.src('images/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      // Setting interlaced to true
      interlaced: true
  })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('build', function () {
  runSequence('clean:dist', 
	      ['copy_bower','copy_pdf','images','images2','useref'],
	      'rev'
  )
})

gulp.task('hello', function() {
  console.log('Hello Zell');
});
