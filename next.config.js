const withPWA = require('next-pwa');

// TODO: /en/books >> /en/books/page/1
// TODO: /en/sermons/all >> /en/sermons/all/page/1 (also video, audio)
// TODO: /en/stories >> /en/stories/page/1

module.exports = withPWA({
	pwa: {
		dest: 'public',
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/en',
				permanent: false,
			},
			{
				source: '/:lang/sermons',
				destination: '/:lang/sermons/all/page/1',
				permanent: true,
			},
			{
				source: '/:lang/sponsors/:id/:slug',
				destination: '/:lang/sponsors/:id',
				permanent: true,
			},
			{
				source: '/:lang/blog/:id/:slug',
				destination: '/:lang/blog/:id',
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

		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		// WORKAROUND: "Error: Can't resolve 'fs'" during build
		// https://github.com/vercel/next.js/issues/9866#issuecomment-881799911
		// if (!isServer) {
		// config.resolve.fallback = {
		// 	fs: false,
		// 	os: false,
		// };
		// }

		return config;
	},
	images: {
		domains: ['ik.imagekit.io'],
	},
});
