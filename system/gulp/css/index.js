import conf from '../../config';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import postcss from 'gulp-postcss';
import autoPrefixer from 'autoprefixer';
import sass from 'gulp-sass';
import mqpacker from 'css-mqpacker';
import reporter from 'postcss-reporter';
import stylelints from 'stylelint';
import _import from 'postcss-easy-import';
import easing from 'postcss-easings';
import nested from 'postcss-nested';
import cleancss from 'gulp-clean-css';
import flexbugs from 'postcss-flexbugs-fixes';
import scss from 'postcss-scss';

const { SRC, DIST, EXTENSION_CSS } = conf;

// entry
const entryPath = `./${SRC}/**/!(_)${EXTENSION_CSS}`;

const opts = [
  _import({
    path: ['node_modules'],
    glob: true
  }),
  easing(),
  autoPrefixer(),
  mqpacker({ sort: true }),
  flexbugs(),
  reporter({ clearMessages: true }),
  nested
];

gulp.task('stylelint', () => {
  return gulp
    .src(`./${SRC}/**/${EXTENSION_CSS}`)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(
      postcss([stylelints, reporter({ clearMessages: true })], { syntax: scss })
    );
});

const onProcess = config => {
  const { name, entry, dist, renamePath, options } = config;

  return gulp.task(
    name,
    gulp.parallel('stylelint', () => {
      return gulp
        .src(entry)
        .pipe(
          plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
          })
        )
        .pipe(
          sass({
            outputStyle: 'expand'
          })
        )
        .pipe(postcss(options))
        .pipe(
          rename(path => {
            path.dirname += renamePath; // 一つ上の階層に移動
          })
        )
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest(dist));
    })
  );
};

const data = [
  {
    name: 'css:dev',
    entry: entryPath,
    dist: DIST,
    renamePath: '/',
    options: opts
  },
  {
    name: 'css:prod',
    entry: entryPath,
    dist: process.env.NODE_ENV,
    renamePath: '/',
    options: opts
  }
];

data.forEach(r => {
  const { name, entry, dist, options } = r;

  onProcess({
    name,
    entry,
    dist,
    options
  });
});
