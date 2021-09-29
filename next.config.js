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
				source: '/:lang/account',
				destination: '/:lang/account/login',
				permanent: true,
			},
			{
				source: '/:lang/account/playlists',
				destination: '/:lang/library/collections',
				permanent: true,
			},
			{
				source: '/:lang/account/playlist/:id',
				destination: '/:lang/library/playlist/:id',
				permanent: true,
			},
			{
				source: '/:lang/account/registrar',
				destination: '/:lang/account/register',
				permanent: true,
			},
			{
				source: '/:lang/audiobibles/books/ENGKJV/:testamentCode/:bookCode/1',
				destination: '/:lang/bibles/ENGKJVC/:bookCode/1',
				permanent: true,
			},
			{
				source: '/:lang/audiobibles/books/ENGKJV/:testamentCode/:bookCode/2',
				destination: '/:lang/bibles/ENGKJVC2/:bookCode/1',
				permanent: true,
			},
			{
				source: '/:lang/audiobibles/books/ENGESV/:testamentCode/:bookCode/2',
				destination: '/:lang/bibles/ENGESVC/:bookCode/1',
				permanent: true,
			},
			{
				source: '/:lang/audiobibles/volumes',
				destination: '/:lang/bibles',
				permanent: true,
			},
			{
				source: '/:lang/audiobibles/books/ENGKJV/1',
				destination: '/:lang/bibles/ENGKJVC',
				permanent: true,
			},
			{
				source: '/:lang/audiobibles/books/ENGKJV/2',
				destination: '/:lang/bibles/ENGKJVC2',
				permanent: true,
			},
			{
				source: '/:lang/audiobibles/books/ENGESV/2',
				destination: '/:lang/bibles/ENGESVC',
				permanent: true,
			},
			{
				source: '/:lang/audiobibles/books/ENGESV/2',
				destination: '/:lang/bibles/ENGKJV1',
				permanent: true,
			},
			{
				source: '/:lang/bibles/:bibleCode/:bookCode',
				destination: '/:lang/bibles/:bibleCode/:bookCode/1',
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

		return config;
	},
	images: {
		domains: ['ik.imagekit.io'],
	},
});
