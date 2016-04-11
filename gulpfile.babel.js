import gulp from 'gulp';
import gutil from 'gulp-util';
import bower from 'bower';
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import minifyCss from 'gulp-minify-css';
import rename from 'gulp-rename';
import sh from 'shelljs';
import del from 'del';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import transform from 'vinyl-transform';
import babelify from 'babelify';

const paths = {
  html: ['src/*.html', 'src/**/*.html'],
  css : ['src/content/scss/*.scss'],
  img : ['src/content/img/*.{png,jpg,gif}'],
  js  : ['src/app/**/*.js', '!src/lib/**/*.js'],
  lib : ['src/lib/**']
};

gulp.task('default', ['html', 'css', 'img', 'js', 'lib', 'watch']);

gulp.task('html', done => {
  gulp.src(paths.html)
    .pipe(gulp.dest('www/'))
    .on('end', done);
});

gulp.task('css', done => {
  gulp.src(paths.css)
    .pipe(sass())
    .pipe(gulp.dest('www/content/css/'))
    .on('end', done);
});

gulp.task('js', done => {
  return browserify({
    entries: 'src/app/app.js',
    debug  : true
  })
    .transform(babelify, {
      presets: ['es2015']
    })
    .bundle()
    .on('error', (err) => console.log(err.message))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('www/app'));
});

gulp.task('img', done => {
  gulp.src(paths.img)
    .pipe(gulp.dest('www/content/img/'))
    .on('end', done);
});

gulp.task('lib', done => {
  gulp.src(paths.lib)
    .pipe(gulp.dest('www/lib/'))
    .on('end', done);
});

gulp.task('watch', () => {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css , ['css']);
  gulp.watch(paths.img , ['img']);
  gulp.watch(paths.js  , ['js']);
  gulp.watch(paths.lib , ['lib']);
});

gulp.task('install', ['git-check'], () => {
  return bower.commands.install()
    .on('log', data => {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', done => {
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
