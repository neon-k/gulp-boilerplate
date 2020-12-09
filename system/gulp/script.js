import gulp from 'gulp';
import util from 'gulp-util';
import webpack from 'webpack';
import webpackConfig from '../webpack/webpack.config.prod.babel';

gulp.task('js:prod', done => {
  const webpackSetting = webpack(webpackConfig);
  webpackSetting.run((err, stats) => {
    if (err) {
      throw new Error('webpack build failed');
    }
    util.log(
      stats.toString({
        colors: {
          yellow: '\u001b[33m',
          cyan: '\u001b[32m',
          bold: '\u001b[32m',
          magenta: '\u001b[32m',
          white: '\u001b[36m'
        },
        version: false,
        hash: false,
        timings: false,
        chunks: true,
        chunkModules: false
      })
    );
  });
  done();
});
