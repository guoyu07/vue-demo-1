var config = require('../config');
var webpack = require('webpack');
//用于合并配置文件
var merge = require('webpack-merge');
var utils = require('./utils');
//开发环境和生产环境都会用到的配置文件
var baseWebpackConfig = require('./webpack.base.conf');
//webpack操作html的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 将入口文件设置值转换成一个数组，加入热加载的功能
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});
//合并全局通用配置文件与开发环境的配置文件
module.exports = merge(baseWebpackConfig, {
  module: {
    // 对独立的style文件进行处理，全局中只定义了vue中的配置文件要怎样处理
    loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // 用于开发调试
  devtool: '#eval-source-map',
  plugins: [
    //定义webpack的环境变量
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    //webpack优化插件，为经常使用的模块分配一个最小的ID，作用不大
    new webpack.optimize.OccurenceOrderPlugin(),
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),
    // 编译遇到错误时，跳过错误的代码块，继续编译
    new webpack.NoErrorsPlugin(),
    // 关键插件，帮你自动生成引入webpack编译文件的html文件
    new HtmlWebpackPlugin({
      //输出的html文件名
      filename: 'index.html',
      //模板文件路径，支持加载器
      template: 'index.html',
      //注入所有的资源到特定的 template 中, 如果设置为true，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
      inject: true
    })
  ]
});
