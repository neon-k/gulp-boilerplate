import fs from 'fs';

import conf from '../../config';

const { EXTENSION_HTML, SRC, DIST, INDEX, DATA } = conf;

const entry = [
  `./${SRC}/**/!(_)${EXTENSION_HTML}`,
  `!./${SRC}/${INDEX}/**/${EXTENSION_HTML}`
];

const entryIndex = `./${SRC}/${INDEX}/**/!(_)${EXTENSION_HTML}`;

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

export const PROCESS_DATAS = [
  {
    name: 'pug:dev',
    entry,
    dist: DIST,
    data: getJsonData()
  },
  {
    name: 'pug:index:dev',
    entry: entryIndex,
    dist: DIST,
    data: getJsonData()
  },
  {
    name: 'pug:prod',
    entry,
    dist: process.env.NODE_ENV,
    data: getJsonData()
  },
  {
    name: 'pug:index:prod',
    entry: entryIndex,
    dist: process.env.NODE_ENV,
    data: getJsonData()
  }
];
