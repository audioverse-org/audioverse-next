const path = require('path');

module.exports = ({ config }) => {
	config.resolve.alias = {
		'@lib': path.resolve(__dirname, '..', 'src', 'lib'),
		'@components': path.resolve(__dirname, '..', 'src', 'components'),
		'@containers': path.resolve(__dirname, '..', 'src', 'containers'),
		'@pages': path.resolve(__dirname, '..', 'src', 'pages'),
	};

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
