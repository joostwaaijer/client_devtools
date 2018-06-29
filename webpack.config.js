var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "./bundle.js"
  },
  module:{
    rules:[
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ]
}