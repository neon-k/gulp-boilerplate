import conf from '../config';
import glob from 'glob';

const { SRC, INDEX, EXTENSION_JS, EXTENSION_TSX } = conf;

const entries = {};

const defaultStatsOptions = {
  colors: {
    yellow: '\u001b[33m',
    magenta: '\u001b[33m',
    cyan: '\u001b[33m',
    bold: '\u001b[33m',
    green: '\u001b[33m'
  },
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: true,
  cachedAssets: true,
  reasons: true,
  source: true,
  errorDetails: true
};



glob.sync(`./${SRC}/**/index${EXTENSION_JS}`, {}).forEach(file => {
  const regEx = new RegExp(`./${SRC}/`);
  // `./src/`の文字列を取り除く
  const key = file
    .replace(regEx, '')
    .replace('.ts', '.js')
    .replace(`${INDEX}/`, '');

  return (entries[key] = file);
});

glob.sync(`./${SRC}/**/index${EXTENSION_TSX}`, {}).forEach(file => {
  const regEx = new RegExp(`./src/`);
  const key = file
    .replace(regEx, '')
    .replace('.tsx', '.js')
    .replace(`${INDEX}/`, '');

  entries[key] =
    process.env.NODE_ENV !== 'production'
      ? [file, 'webpack/hot/dev-server', 'webpack-hot-middleware/client']
      : file;
});

export default {
  entry: entries,

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(vert|frag|glsl)$/i,
        use: [{ loader: 'raw-loader' }, { loader: 'glslify-loader' }],
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: 'shared/script/vendor.js',
      chunks: 'initial'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  stats: defaultStatsOptions
};
