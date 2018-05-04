var gulp = require('gulp');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

var banner = ['/*!\n',
  ' * solar-webgl - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2014-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' */\n',
  ''
].join('');

gulp.task('dist', ['js'], function () {
    gulp.src(['./index.html',]).pipe(gulp.dest('./dist'));
    gulp.src(['./app/img/*']).pipe(gulp.dest('./dist/img'));
    gulp.src(['./vendor/**/*.min.js']).pipe(gulp.dest('./dist/vendor'));
});

// Default task
gulp.task('default', ['dist']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './vendor/*.js',
      '!./vendor/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./vendor'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// Dev task
gulp.task('dev', ['js', 'browserSync'], function() {
  gulp.watch('./img/*', ['img']);
  gulp.watch('./*.html', browserSync.reload);
});
