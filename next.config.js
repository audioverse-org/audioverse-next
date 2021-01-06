const withPWA = require('next-pwa');

module.exports = withPWA({
	pwa: {
		dest: 'public',
	},
	async redirects() {
		return [
			{
				source: '/:lang/sermons',
				destination: '/:lang/sermons/all/page/1',
				permanent: true,
			},
		];
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		});

		return config;
	},
});
