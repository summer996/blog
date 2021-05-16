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

function apiHandler() {

  const getRandomTime = (ms = 1000) => {
    return Math.floor(Math.random() * ms)
  }

  const router = express.Router()
  router.get('/tabs', (req, res) => {
    setTimeout(() => {
      res.send([
        {
          id: '1',
          name: '生活'
        },
        {
          id: '2',
          name: '科技'
        },
        {
          id: '3',
          name: '体育'
        }
      ])
    }, getRandomTime());
  })

  router.get('/news/list', (req, res) => {
    setTimeout(() => {
      res.send(require('./mock/news-list.json'))
    }, getRandomTime(800));
  })

  router.get('/token', (req, res) => {
    setTimeout(() => {
      res.send({
        token: '42gd2'
      })
    }, getRandomTime(600));
  })

  return router
}

app.use('/api', function(req, res, next) {
  if(req.path === '/token' || req.headers.token === '42gd2') {
    next()
  } else {
    next('invalid token')
  }
})

app.use('/api', apiHandler())

app.use('/api', function(err, req, res, next) {
  res.send({
    error: 1,
    message: err
  })
})

// Serve the files on port 3002.
app.listen(3002, function () {
  console.log('Example app listening on port 3002!\n');
});