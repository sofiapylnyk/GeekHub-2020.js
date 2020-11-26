const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: resolve(__dirname, 'src', 'index.js'),
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
    module: {
        rules: [
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
          },
        ]
      },
      optimization: {
        splitChunks: { chunks: "all" }
      },
    plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    })
  ]
};
