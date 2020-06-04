import conf from '../config';
import gulp from 'gulp';

const { SRC } = conf;

gulp.task(
  'build',
  gulp.series(
    'pug:prod',
    'pug:index:prod',
    () => {
      return gulp
        .src(`./${SRC}/**/*.+(jpg|jpeg|png|gif|svg|mp4|ico)`)
        .pipe(gulp.dest(process.env.NODE_ENV));
    },
    () => {
      return gulp
        .src(`./${SRC}/**/*.+(eot|ttf|woff|woff2)`)
        .pipe(gulp.dest(`${process.env.NODE_ENV}`));
    },
    'js:prod',
    'css:prod',
    'css:index:prod'
  )
);

gulp.task(
  'build:dev',
  gulp.series('pug:dev', 'pug:index:dev', 'css:dev', 'css:index:dev', 'watch')
);
