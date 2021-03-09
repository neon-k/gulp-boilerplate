import conf from '../config';
import gulp from 'gulp';

import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import imageminPng from 'imagemin-pngquant';

const { SRC, INDEX, EXTENSION_IMG, EXTENSION_FONT } = conf;

// path
const imgPath = [
  `./${SRC}/**/${EXTENSION_IMG}`,
  `!./${SRC}/${INDEX}/**/${EXTENSION_IMG}`
];
const imgIndexPath = `./${SRC}/${INDEX}/**/${EXTENSION_IMG}`;

gulp.task(
  'build',
  gulp.series(
    'html:prod',
    'html:index:prod',
    () => {
      return gulp.src(imgPath).pipe(imagemin([
        imageminPng(),
        mozjpeg({
          quality: 80, // 画質
          progressive: true
        }),
        imagemin.svgo()
      ])).pipe(gulp.dest(process.env.NODE_ENV));
    },
    () => {
      return gulp.src(imgIndexPath).pipe(imagemin([
        imageminPng(),
        mozjpeg({
          quality: 80, // 画質
          progressive: true
        }),
        imagemin.svgo()
      ])).pipe(gulp.dest(process.env.NODE_ENV));
    },
    () => {
      return gulp
        .src(`./${SRC}/**/${EXTENSION_FONT}`)
        .pipe(gulp.dest(process.env.NODE_ENV));
    },
    'js:prod',
    'css:prod',
    'css:index:prod'
  )
);

gulp.task(
  'build:dev',
  gulp.series('html:dev', 'html:index:dev', 'css:dev', 'css:index:dev', 'iconfont:build', 'watch')
);
