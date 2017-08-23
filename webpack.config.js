  const path = require('path');
  // 新引入
  const webpack = require('webpack');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const ExtractTextPlugin = require("extract-text-webpack-plugin");
  const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin');


  module.exports = {
    context: __dirname+"/src",
    entry: {
     // 'vendor': ["jquery","bootstrap"],
 //     'common': ['jquery'],
      'demo/page1': './views/demo/page1.js',
      'demo/page2': './views/demo/page2.js'
    },
    output: {
      filename: 'js/[name].[hash].js',
      path: __dirname + '/dist'
    },

    module: {
      preLoaders: [
          {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
      ],
      loaders: [
      // {test: /\.jpg$/, loader: "file-loader"},
      // {test: /\.png$/, loader: "url-loader?mimetype=image/png"},
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,loader: 'file-loader'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })},
      ],
    },
    externals: { 
      jquery: "jQuery" 
    },
    resolve: { 
      alias: { 
       // jquery: path.resolve(__dirname, "src/libs/jquery/jquery-1.12.4.min.js" ),
       // bootstrap: path.resolve(__dirname, "src/libs/bootstrap/js/bootstrap.min.js" )
      } 
    },
    plugins: [
    // new webpack.ProvidePlugin({
    //     $: "jquery",
    //     jQuery: "jquery",
    //     "window.jQuery": "jquery"
    // }),
    new CopyWebpackPlugin([
      { from: 'libs', to: 'libs/'},
    ]),
    new HtmlWebpackPlugin({
     chunks: ['common','demo/page1'],
     filename: 'demo/page1.html',
     template: './views/demo/page1.html',
   }),
    new HtmlWebpackPlugin({
     chunks: ['demo/page2'],
     filename: 'demo/page2.html',
     template: './views/demo/page2.html',
   }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'  // 指代index.js引入的lodash库
    }),
    new ExtractTextPlugin('css/[name].[hash].css'),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['libs/jquery/jquery-1.12.4.min.js','libs/bootstrap/js/bootstrap.min.js','libs/bootstrap/css/bootstrap.min.css', 'libs/bootstrap/css/bootstrap-theme.min.css'],
      append: false
    }),
    ]
  };
