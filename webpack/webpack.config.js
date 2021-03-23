module.exports = {
  entry: './src/index.js',//入口文件
  output: {
    path: __dirname,
    fileName: './build/bundle.js'//出口文件，文件名
  },
  module: {//定义的模块
    rules: [//规则
      {
        test: /\.js?$/,
        exclude: /(nodu_modules)/,
        loader: 'babel-loader'//匹配规则是：所有以js结尾的文件，除了第三方的，都用babel-loader来编译
      },

    ]
  }
}