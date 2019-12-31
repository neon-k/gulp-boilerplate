import conf from './system/config';
import PrettierPlugin from 'prettier-webpack-plugin';
import glob from 'glob';

const entries = [];

glob
  .sync(`./${conf.src}/**/${conf.js}`, {
    ignore: `./${conf.src}/**/_${conf.js}`
  })
  .map(file => entries.push(file));

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
          fix: true,
          formatter: require('eslint/lib/cli-engine/formatters/stylish')
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  },
  plugins: [new PrettierPlugin()]
};
