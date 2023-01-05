module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
		'@babel/preset-typescript',
		'@babel/preset-react',
	],
	plugins: [
		'@babel/plugin-proposal-optional-chaining',
		[
			'react-intl',
			{
				extractFromFormatMessageCall: true,
				idInterpolationPattern: '[sha512:contenthash:base64:6]',
				ast: true,
			},
		],
		'./babel/disable-nextjs-link-prefetching',
	],
};
