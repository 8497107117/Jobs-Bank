var webpack = require('webpack');

module.exports = {
	entry: './main.js',
	output: {
		filename: './build/bundle.js'
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: 'style-loader!css-loader'}
		]
	},
	/*devtool: "cheap-module-eval-source-map",
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
		})
	]*/
};
