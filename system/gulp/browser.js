import conf from '../config';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack/webpack.config.dev.babel';

const { SRC, DIST, PORT, INDEX } = conf;

gulp.task('reload', done => {
  browserSync.reload();
  done();
});

gulp.task('browser', () => {
  const bundle = webpack(webpackConfig);
  return browserSync({
    notify: false,
    port: PORT,
    open: false,
    reloadOnRestart: true,
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    },
    server: {
      baseDir: [SRC, DIST, `${SRC}/${INDEX}`],
      middleware: [
        webpackDevMiddleware(bundle, {
          publicPath: webpackConfig.output.publicPath
        }),
        webpackHotMiddleware(bundle)
      ]
    }
  });
});
