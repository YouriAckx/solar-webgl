var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var banner = ['/*!\n',
  ' * solar-webgl - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2014-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' */\n',
  ''
].join('');

gulp.task('dist', ['default'], function () {
    gulp.src(['./index.html',]).pipe(gulp.dest('./dist'));
    gulp.src(['./app/img/*']).pipe(gulp.dest('./dist/img'));
    gulp.src(['./vendor/**/*']).pipe(gulp.dest('./dist/vendor'));
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

// Dev task
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('./img/*', ['img']);
  gulp.watch('./*.html', browserSync.reload);
});
