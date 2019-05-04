const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'
const SRC_DIR = path.join(__dirname, '/src')
const DIST_DIR = path.join(__dirname, '/dist')

module.exports = {
  mode: 'development',
  entry: [
    SRC_DIR + '/index.js'
  ],
  devtool: 'source-map',
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 3000,
    historyApiFallback: true,
    contentBase: DIST_DIR,
    hot: true,
    writeToDisk: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss|sass|css)$/,
        exclude: /node_modules/,
        loaders: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[local]'
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: { minimize: true }
        }
      }
    ]
  },
  resolve: {
    alias: {
      Actions: path.resolve(__dirname, 'src/actions/'),
      Form: path.resolve(__dirname, 'src/components/form'),
      Menu: path.resolve(__dirname, 'src/components/menu/'),
      List: path.resolve(__dirname, 'src/components/list'),
      Navigation: path.resolve(__dirname, 'src/components/navigation/'),
      Pages: path.resolve(__dirname, 'src/components/pages/'),
      Reducers: path.resolve(__dirname, 'src/reducers/'),
      DataUtil: path.resolve(__dirname, 'src/util/dataUtil.js'),
      RequestDetails: path.resolve(__dirname, 'src/util/RequestDetails.js')
    },
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'src/static', to: './static' },
      { from: 'data', to: './data' }
    ])
  ]
}
