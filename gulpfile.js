var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var del = require('del');

var paths = {
  html: ['src/*.html', 'src/**/*.html'],
  css : ['src/content/scss/*.scss'],
  img : ['src/content/img/*.{png,jpg,gif}'],
  js  : ['src/app/**/*.js', '!src/lib/**/*.js'],
  lib : ['src/lib/**']
};

gulp.task('default', ['html', 'css', 'img', 'js', 'lib', 'watch']);

gulp.task('clean', function (done) {
  // del(['www/**', '!www'], done);
  done();
});

gulp.task('html', ['clean'], function (done) {
  gulp.src(paths.html)
    .pipe(gulp.dest('www/'))
    .on('end', done);
});

gulp.task('css', ['clean'], function (done) {
  gulp.src(paths.css)
    .pipe(sass())
    .pipe(gulp.dest('www/content/css/'))
    .on('end', done);
});

gulp.task('js', ['clean'], function (done) {
  gulp.src(paths.js)
    .pipe(gulp.dest('www/app/'))
    .on('end', done);
});

gulp.task('img', ['clean'], function (done) {
  gulp.src(paths.img)
    .pipe(gulp.dest('www/content/img/'))
    .on('end', done);
});

gulp.task('lib', ['clean'], function (done) {
  gulp.src(paths.lib)
    .pipe(gulp.dest('www/lib/'))
    .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css , ['css']);
  gulp.watch(paths.img , ['img']);
  gulp.watch(paths.js  , ['js']);
  gulp.watch(paths.lib , ['lib']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
