 //load all our gulp plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync').create(),
    del = require('del');

//Compile sass files, minify & add prefixes
gulp.task('styles', function() {
  return gulp.src('src/styles/style.scss', { style: 'expanded' })
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('static/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('static/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

//concat and minify JavaScript
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('static/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('static/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

//combine all 3 tasks
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

//watch our files and perform necessary tasks
gulp.task('watch', function() {

    //set up browser-sync
    browserSync.init({
            notify:false,
            server: {baseDir: "./"}
        });

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  //browser reload
  gulp.watch(['src']).on("change", browserSync.reload);

});
