import conf from '../config';
import glob from 'glob';

const { SRC, INDEX, EXTENSION_JS } = conf;

const entries = {};

glob
  .sync(`./${SRC}/**/${EXTENSION_JS}`, {
    ignore: `./${SRC}/**/_${EXTENSION_JS}`
  })
  .map(file => {
    const regEx = new RegExp(`./${SRC}/`);
    // `./src/`の文字列を取り除く
    const key = file
      .replace(regEx, '')
      .replace('.ts', '.js')
      .replace(`${INDEX}/`, '');

    return (entries[key] = file); // '{assets/js/general/index.js': './src/assets/js/general/index.js} こうなります'
  });

export default {
  entry: entries,

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
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
    extensions: ['.js', '.ts']
  }
};
