import conf from '../../config';

const { EXTENSION_HTML, SRC, DIST, INDEX } = conf;

const entry = [
  `./${SRC}/**/!(_)${EXTENSION_HTML}`,
  `!./${SRC}/${INDEX}/**/${EXTENSION_HTML}`
];

const entryIndex = `./${SRC}/${INDEX}/**/!(_)${EXTENSION_HTML}`;

const isBeatifyDev = false; // 開発時の整形
const isBeatifyProd = false; // 本番時の整形

const isCleanDev = false; // 開発時の圧縮
const isCleanProd = true; // 本番時の圧縮

export const PROCESS_DATAS = [
  {
    name: 'html:dev',
    entry,
    dist: DIST,
    isClean: isCleanDev,
    isBeatify: isBeatifyDev
  },
  {
    name: 'html:index:dev',
    entry: entryIndex,
    dist: DIST,
    isClean: isCleanDev,
    isBeatify: isBeatifyDev
  },
  {
    name: 'html:prod',
    entry,
    dist: process.env.NODE_ENV,
    isClean: isCleanProd,
    isBeatify: isBeatifyProd
  },
  {
    name: 'html:index:prod',
    entry: entryIndex,
    dist: process.env.NODE_ENV,
    isClean: isCleanProd,
    isBeatify: isBeatifyProd
  }
];

// 整形の設定
export const BEATIFY_CONF = {
  indent_size: 2,
  indent_char: ' ',
  eol: '\n',
  indent_level: 0,
  indent_with_tabs: true,
  preserve_newlines: true,
  max_preserve_newlines: 10,
  jslint_happy: false,
  space_after_anon_function: false,
  brace_style: 'collapse',
  keep_array_indentation: false,
  keep_function_indentation: false,
  space_before_conditional: true,
  break_chained_methods: false,
  eval_code: false,
  unescape_strings: false,
  wrap_line_length: 0,
  wrap_attributes: 'auto',
  wrap_attributes_indent_size: 4,
  end_with_newline: false
};
