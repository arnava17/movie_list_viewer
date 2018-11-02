const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/index.jsx",
    vendor: "./src/styles/vendor.scss"
  },
  mode: "development",
  module: {
    rules : [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {presets : ['env', 'react']}
          }
        ]
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      }
    ]
  },
  resolve: { extensions : ['*', '.js', '.jsx']},
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}
