var path = require('path')
var config = require('../config')
var utils = require('./utils')
//path.resolve()相当于先cd到__dirname，然后再cd到'../'，最终得到根目录为sell。
var projectRoot = path.resolve(__dirname, '../')
module.exports = {
  entry: {
    //编译开始的入口文件
    app: './src/main.js'
  },
  output: {
    //资源文件输出的根目录
    path: config.build.assetsRoot,
    //资源文件输出的路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    //对应entry里面的key，此处输出的文件名应该就是app.js
    filename: '[name].js'
  },
  resolve: {
    //为import...from...的文件自动补全后缀
    extensions: ['', '.js', '.vue'],
    //如果import...from...后面接的是模块名，告诉引擎模块的位置
    fallback: [path.join(__dirname, '../node_modules')],
    //路径别名
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'common': path.resolve(__dirname, '../src/common'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    //和resolve里面的fallback功能类似
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    //preLoaders会在loaders之前进行处理，常常用于在编译前检查代码的编码规范
    preLoaders: [
      // {
      //   test: /\.vue$/,
      //   loader: 'eslint',
      //   //指定需要检查的目录
      //   include: projectRoot,
      //   //指定不需要检查的目录
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.js$/,
      //   loader: 'eslint',
      //   include: projectRoot,
      //   exclude: /node_modules/
      // }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          //当图片文件小于10kb的时候，将图片转换成base64字符串
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          //当字体文件小于10kb的时候，将图片转换成base64字符串
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    //当文件出现es6错误编码时，会进行友好的错误提示，并提供一个官网链接
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    //对vue里面的样式文件进行处理，css，postcss，less，sass，scss，stylus，styl
    loaders: utils.cssLoaders()
  }
}
