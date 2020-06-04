import conf from '../../config';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';
import pugLintStylish from 'puglint-stylish';
import rename from 'gulp-rename';

import { PROCESS_DATAS } from './data';

const { EXTENSION_HTML, SRC } = conf;

gulp.task('pug:lint', () => {
  return gulp.src(`./${SRC}/**/${EXTENSION_HTML}`).pipe(
    pugLinter({
      reporter: pugLintStylish
    })
  );
});

const onProcess = config => {
  const { name, entry, dist, data } = config;

  return gulp.task(
    name,
    gulp.parallel('pug:lint', () => {
      return gulp
        .src(entry)
        .pipe(
          plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
          })
        )
        .pipe(
          pug({
            basedir: SRC,
            pretty: true,
            cache: false,
            data: { data }
          })
        )
        .pipe(
          rename(path => {
            path.dirname += '/../'; // 一つ上の階層に移動
          })
        )
        .pipe(gulp.dest(dist));
    })
  );
};

PROCESS_DATAS.forEach(r => {
  const { name, entry, dist, data } = r;

  onProcess({
    name,
    entry,
    dist,
    data
  });
});
