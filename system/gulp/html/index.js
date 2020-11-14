import fs from 'fs';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';
import pugLintStylish from 'puglint-stylish';
import htmlbeautify from 'gulp-html-beautify';
import rename from 'gulp-rename';

import conf from '../../config';

import { PROCESS_DATAS, BEATIFY_CONF } from './data';

const { EXTENSION_HTML, SRC, DATA } = conf;

gulp.task('pug:lint', () => {
  return gulp.src(`./${SRC}/**/${EXTENSION_HTML}`).pipe(
    pugLinter({
      reporter: pugLintStylish
    })
  );
});

const onProcess = config => {
  const { name, entry, dist, isClean, isBeatify } = config;
  return gulp.task(
    name,
    gulp.parallel('pug:lint', () => {
      /**
       * jsonデータをまとめる関数
       * @returns {object} - page配下のjsonデータをまとめたオブジェクトを返す
       */
      const getJsonData = () => {
        const dirname = `./${DATA}/page`; // jsonデータが格納されているファイル
        const files = fs.readdirSync(dirname); // jsonファイルの名前を取得
        let jsonData = {}; // jsonデータを格納する変数

        files.forEach(fileName => {
          const parse = JSON.parse(
            fs.readFileSync(`${process.cwd()}/${DATA}/page/${fileName}`, 'utf8')
          ); // 各jsonをパースする
          Object.assign(jsonData, parse); // パースしたjsonを用意した変数にマージしていく
        });

        return jsonData; // マージしたjsonを返す
      };

      const data = getJsonData();

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
            pretty: !isClean,
            cache: false,
            data: { data }
          })
        )
        .pipe(gulpIf(isBeatify, htmlbeautify(BEATIFY_CONF)))
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
  const { name, entry, dist, isClean, isBeatify } = r;

  onProcess({
    name,
    entry,
    dist,
    isClean,
    isBeatify
  });
});
