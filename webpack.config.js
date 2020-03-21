const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});
const webpack = require("webpack");

module.exports = {
  // Which file is the entry point to the application
  entry: "./src/index.jsx",
  // Which file types are in our project, and where they are located
  resolve: {
    extensions: [".js", ".jsx"]
  },
  // Where to output the final bundled code to
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    sourceMapFilename: "bundle.map.js"
  },
  plugins: [htmlPlugin],
  devtool: "#source-map",
  module: {
    // How to process project files with loaders
    rules: [
      // Process any .js or .jsx file with Babel
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      }
    ]
  }
};

