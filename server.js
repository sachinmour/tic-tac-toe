import path from 'path';
import express from 'express';
import http from 'http';
import reload from 'reload';
import serverRoutes from './app/server/routes/index';

const app = express();

app.use(express.static(path.join(__dirname, '/app/client/public')));

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('./webpack.config.js');

  const compiler = webpack(config);

  const morgan = require('morgan');

  app.use(morgan('dev'));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
  reload(server, app);
}

serverRoutes(app);

const PORT = process.env.PORT || 4545;
server.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});
