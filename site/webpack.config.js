const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: isProduction ? false : 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.(js)$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	externals: {
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery'
	}
};