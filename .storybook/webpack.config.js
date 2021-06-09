const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = ({ config }) => {
	config.resolve.plugins = [new TsconfigPathsPlugin({
		baseUrl: '../'
	})];

	// config.module.rules.push({
	// 	test: /\.(s*)css$/,
	// 	loaders: ['style-loader', 'css-loader', 'sass-loader'],
	// });

	// config.module.rules.push({
	// 	test: /\.scss$/,
	// 	use: ['style-loader', 'css-loader', 'sass-loader'],
	// 	include: path.resolve(__dirname, '../'),
	// 	exclude: /\.module\.scss$/,
	// });
	//
	// config.module.rules.push({
	// 	test: /\.module\.scss$/,
	// 	use: [
	// 		'style-loader',
	// 		{
	// 			loader: 'css-loader',
	// 			options: {
	// 				modules: true,
	// 				importLoaders: 1,
	// 				localIdentName: '[path]__[name]___[local]',
	// 			},
	// 		},
	// 		'sass-loader',
	// 	],
	// });

	return config;
};
