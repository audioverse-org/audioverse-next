const withPWA = require('next-pwa');

// TODO: /en/sermons/all >> /en/sermons/all/page/1 (also video, audio)

module.exports = withPWA({
	pwa: {
		dest: 'public',
	},
	async redirects() {
		const languagePrefixMap = {
			english: 'en',
			deutsch: 'de',
			german: 'de',
			espanol: 'es',
			francais: 'fr',
			french: 'fr',
			zhongwen: 'zh',
		};
		return [
			...Object.keys(languagePrefixMap).map((prefix) => ({
				source: `/${prefix}/:path*`,
				destination: `/${languagePrefixMap[prefix]}/:path*`,
				permanent: true,
			})),
			{
				source: '/',
				destination: '/en',
				permanent: false,
			},
			{
				source: '/:lang/audiobooks/books/:path*',
				destination: '/:lang/books/:path*',
				permanent: true,
			},
			{
				source: '/:lang/music/browse/:id/:slug',
				destination: '/:lang/songs/albums/:id',
				permanent: true,
			},
			{
				source: '/:lang/music/browse/sponsors/:id/:slug',
				destination: '/:lang/sponsors/:id/:slug',
				permanent: true,
			},
			{
				source: '/:lang/music/browse/tag/:tagName/:slug',
				destination: '/:lang/tags/:tagName/page/1',
				permanent: true,
			},
			{
				source: '/:lang/sermons/conferences/:id/:slug',
				destination: '/:lang/collections/:id/:slug',
				permanent: true,
			},
			{
				source: '/:lang/sermons',
				destination: '/:lang/sermons/all/page/1',
				permanent: true,
			},
			{
				source: '/:lang/sermons/recordings/:id/:slug',
				destination: '/:lang/teachings/:id/:slug',
				permanent: true,
			},
			{
				source: '/:lang/sermons/presenters/:id/:slug',
				destination: '/:lang/presenters/:id/:slug',
				permanent: true,
			},
			{
				source: '/:lang/sermons/seriess/:id/:slug',
				destination: '/:lang/series/:id/:slug',
				permanent: true,
			},
			{
				source: '/:lang/blog/:id(\\d{1,})/:slug',
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
