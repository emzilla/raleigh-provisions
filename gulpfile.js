var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    host: ""
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('styles', function(){
  gulp.src(['css/scss/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('css'))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(minifycss())
    // .pipe(gulp.dest('/'))
    // .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src(['js/vendors/*.js', 'js/init.js'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('global.js'))
    .pipe(gulp.dest('js'))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(uglify())
    // .pipe(gulp.dest('js/'))
    // .pipe(browserSync.reload({stream:true}))
});

gulp.task('watch', function(){
  gulp.watch("css/**/*.scss", ['styles']);
  gulp.watch("js/**/*.js", ['scripts']);
  // gulp.watch("*.html", ['bs-reload']);
});