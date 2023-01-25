const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].bundle.js', //! [name] 동적
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
            exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          use: ["babel-loader"], //! 1개 이상은 use 1개는 loader : 'balbel-loader'
          exclude: /node_modules/,          
        },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html")
    }), 
  ],
  mode: 'development'

};