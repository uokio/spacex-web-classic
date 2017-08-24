const path = require('path')
// 新引入
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const glob = require('glob')

// 文件查找
const jsFiles = glob.sync('./src/views/*/*.js')
const entryList = {}
const pluginList = []
for (const jsFile of jsFiles) {
  const entryName = jsFile.slice('./src/views/'.length, -'.js'.length)
  const entryPath = './' + jsFile.slice('./src/'.length)
  const htmlName = entryName + '.html'
  const templatePath = './' + jsFile.slice('./src/'.length, -'.js'.length) + '.html'
  console.log(entryName + ':' + entryPath)
  console.log(htmlName + ':' + templatePath)
  entryList[entryName] = entryPath
  pluginList.push(new HtmlWebpackPlugin({
    chunks: ['common', entryName],
    filename: htmlName,
    template: templatePath
  }))
}

module.exports = {
  context: path.resolve('./src'),
  entry: Object.assign({
    // 'vendor': ["jquery","bootstrap"],
    // 'common': ['jquery'],
  }, entryList),
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve('./dist')
  },

  module: {
    rules: [
      // {test: /\.jpg$/, loader: "file-loader"},
      // {test: /\.png$/, loader: "url-loader?mimetype=image/png"},
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, use: 'file-loader'},
      {test: /\.css$/, use: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', {modules: false}]]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]

      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  resolve: {
    alias: {
      // jquery: path.resolve(__dirname, "src/libs/jquery/jquery-1.12.4.min.js" ),
      // bootstrap: path.resolve(__dirname, "src/libs/bootstrap/js/bootstrap.min.js" )
      apis: path.resolve(__dirname, 'src/apis/')
    }
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //     $: "jquery",
    //     jQuery: "jquery",
    //     "window.jQuery": "jquery"
    // }),
    new CleanWebpackPlugin('dist'),
    new CopyWebpackPlugin([
      {from: 'libs', to: 'libs/'}
    ]),
    //  new HtmlWebpackPlugin({
    //   chunks: ['common','demo/page1'],
    //   filename: 'demo/page1.html',
    //   template: './views/demo/page1.html',
    // }),
    ...pluginList,
    new webpack.optimize.CommonsChunkPlugin({
      // 指代index.js引入的lodash库
      name: 'common'
    }),
    new ExtractTextPlugin('css/[name].[hash].css'),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['libs/jquery/jquery-1.12.4.min.js', 'libs/bootstrap/js/bootstrap.min.js', 'libs/bootstrap/css/bootstrap.min.css', 'libs/bootstrap/css/bootstrap-theme.min.css'],
      append: false
    })
  ]
}
