const path = require("path");
var webpack = require("webpack");

module.exports = {
	mode: "development",
	entry: ["webpack-hot-middleware/client","./src/index.js"],
	devtool: "inline-source-map",
	output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/bundle/',
    publicPath: '/static/',
  },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				exclude: /node_modules/,
				type: "asset/resource",
			},
		],
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
};
