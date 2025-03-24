// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/scripts/index.js", // or wherever your main JS file is
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'main.js',
  },
  
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // source HTML file
    }),
  ],
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
  },
  mode: "development", // or 'production'
};
