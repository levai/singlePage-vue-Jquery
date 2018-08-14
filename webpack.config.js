const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var ImageminPlugin = require('imagemin-webpack-plugin').default

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devtool: '#eval-source-map',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['*', '.js', '.vue', '.json', 'css', 'less']
  },
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/build.js'
  },
  module: {
    rules: [{
        // Exposes jQuery for use outside Webpack build
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader','postcss-loader','less-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            less: 'vue-style-loader!css-loader!postcss-loader!less-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: { // options选项参数可以定义多大的图片转换为base64
            limit: 10000,
            name: 'assets/images/[name].[ext]?[hash]',
          }
        }]
      },
    ]
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: true, //向html引入的src链接后面增加一段hash值,消除缓存
      minify: {
        collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
        removeComments: true //如果 true ，则去掉 html 里的注释。
      },
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    }),
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production', // Disable during development
      pngquant: {
        quality: '95-100'
      }
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
