import conf from './system/config';
import glob from 'glob';

const entries = {};

glob
  .sync(`./${conf.src}/**/${conf.js}`, {
    ignore: `./${conf.src}/**/_${conf.js}`
  })
  .map(file => {
    const regEx = new RegExp(`./src/`);
    const key = file.replace(regEx, ''); // `./src/`の文字列を取り除く
    const keyName = key.replace('ts', 'js');
    return (entries[keyName] = file); // '{assets/js/general/index.js': './src/assets/js/general/index.js} こうなります'
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
