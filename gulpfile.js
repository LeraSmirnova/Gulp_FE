const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

gulp.task('html', function () {
    gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'))
});

gulp.task('images', function () {
    gulp.src('./src/img/*.svg')
      .pipe(gulp.dest('./dist/img'))
      .pipe(browserSync.reload({stream: true}));

    gulp.src('./src/img/*.png')
      .pipe(gulp.dest('./dist/img'))
      .pipe(browserSync.reload({stream: true}));

    gulp.src('./src/img/*.jpg')
      .pipe(gulp.dest('./dist/img'))
      .pipe(browserSync.reload({stream: true}));

    gulp.src('./src/img/*.gif')
      .pipe(gulp.dest('./dist/img'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function () {
    gulp.src('./src/scss/main.scss')
      .pipe(sass({includePaths: ['./src/scss']}))
      .pipe(autoprefixer())
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('script', function () {
    gulp.src('./src/js/index.js')
      .pipe(babel({
          presets:[
            ['env'],
            ['es2015']
          ]
        }))
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './dist/',
    },
    notify: false
  });

  gulp.watch('./src/scss/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch('./**/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('./src/js/*.js', ['script']).on('change', browserSync.reload);
});

gulp.task('default', ['html', 'images', 'styles', 'script', 'serve']);
