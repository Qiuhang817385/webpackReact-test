// 对象module的exports方法,module代表当前模块
// path模块是内置模块,利用内置模块获取当前结构路径
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // 指定路口文件
  entry: './src/js/index.js',
  output: {
    // 文件名和路径
    // 获得当前的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包生成的文件
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [{
      // 正则表达式,test是正则表达式对象的方法
      test: /\.css$/,
      // 现在已经改成rules了
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    },
    {
      test: /\.js?$/,
      loader: 'babel-loader',/* 要装载的模块 */
      exclude: /node_modules/,/* 表示不编译哪些模块 */
      query: {
        compact: false,/* 表示不压缩 */
        // 2017需要专门生成一个配置文件,把react配置文件剥离出去
        presets: ['es2015', 'react']/* 需要编译的是react */
      }
    }]
  },
  resolve: {
    extensions: ['.less', '.js', '.css']
  }
}