const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

const router = () => {
  const router = express.Router();

  const getRandomTime = (timeout = 1000) => Math.floor(Math.random() * timeout);

  router.get('/token', (req, res) => {
    setTimeout(() => {
      res.send({
        token: Math.random()
      })
    }, getRandomTime(2000))
  })

  router.get('/tabs', (req, res) => {
    setTimeout(() => {
      res.send({
        error: 0,
        data: [
          {
            id: 1,
            name: '国内'
          },
          {
            id: 2,
            name: '体育'
          },
          {
            id: 3,
            name: '娱乐'
          },
        ]
      })
    }, getRandomTime(2000))
  })

  router.get('/newsList', (req, res) => {
    setTimeout(() => {
      res.send({
        error: 0,
        data: require('./mock/news-list.json')
      })
    }, getRandomTime(2000))
  })
  
  return router;
}

app.use('/api', router())


// Serve the files on port 3002.
app.listen(3002, function () {
  console.log('Example app listening on port 3002!\n');
});