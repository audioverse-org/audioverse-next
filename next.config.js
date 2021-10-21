const withPWA = require('next-pwa');

module.exports = withPWA({
	pwa: {
		dest: 'public',
	},
	headers: [
		{
			source: '/(.*)',
			headers: [
				{
					key: 'Permissions-Policy',
					value: 'interest-cohort=()',
				},
			],
		},
	],
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
			...Object.keys(languagePrefixMap).map((prefix) => ({
				source: '/',
				destination: `/${languagePrefixMap[prefix]}`,
				has: [
					{
						type: 'cookie',
						key: 'lang',
						value: languagePrefixMap[prefix],
					},
				],
				permanent: false,
			})),
			{
				source: '/',
				destination: '/en',
				permanent: false,
			},
			{
				source: '/:lang/sermons/podcasts/latest',
				destination: '/:lang/teachings/all/feed.xml',
				permanent: true,
			},
			{
				source: '/:lang/sermons/seriess/podcast/:seriesId/latest/:slug',
				destination: '/:lang/series/:seriesId/feed.xml',
				permanent: true,
			},
			{
				source: '/:lang/audiobooks/books/podcast/:seriesId/latest/:slug',
				destination: '/:lang/books/:seriesId/feed.xml',
				permanent: true,
			},
			{
				source: '/:lang/music/browse/podcast/:seriesId/latest/:slug',
				destination: '/:lang/songs/albums/:seriesId/feed.xml',
				permanent: true,
			},
			{
				source: '/:lang/sermons/conferences/podcast/:conferenceId/latest/:slug',
				destination: '/:lang/conferences/:conferenceId/feed.xml',
				permanent: true,
			},
			{
				source: '/:lang/sponsors/podcast/:sponsorId/latest/:slug',
				destination: '/:lang/sponsors/:sponsorId/teachings/feed.xml',
				permanent: true,
			},
			{
				source: '/:lang/sermons/presenters/podcast/:presenterId/latest/:slug',
				destination: '/:lang/presenters/:presenterId/feed.xml',
				permanent: true,
			},
			{
				source: '/:lang/account',
				destination: '/:lang/account/login',
				permanent: true,
			},
			{
				source: '/:lang/account/history',
				destination: '/:lang/library/history',
				permanent: true,
			},
			{
				source: '/:lang/account/favorite',
				destination: '/:lang/library',
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
				source: '/:lang/audiobooks/books',
				has: [
					{
						type: 'query',
						key: 'stories',
						value: '1',
					},
				],
				permanent: false,
				destination: '/:lang/stories/albums/page/1',
			},
			{
				source: '/:lang/audiobooks/books/:path*',
				destination: '/:lang/books/:path*',
				permanent: true,
			},
			{
				source: '/:lang/music/browse',
				destination: '/:lang/songs/albums/page/1',
				permanent: false,
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
				source: '/:lang/sponsors',
				destination: '/:lang/sponsors/page/1',
				permanent: true,
			},
			{
				source: '/:lang/music/browse/tag/:tagName/:slug',
				destination: '/:lang/songs/albums/page/1',
				permanent: true,
			},
			{
				source: '/:lang/sermons/conferences',
				destination: '/:lang/conferences/page/1',
				permanent: true,
			},
			{
				source: '/:lang/sermons/conferences/:id/:slug',
				destination: '/:lang/conferences/:id/:slug',
				permanent: true,
			},
			{
				source: '/:lang/recordings/arrivals',
				destination: '/:lang/teachings/all/page/1',
				permanent: true,
			},
			{
				source: '/:lang/sermons',
				has: [
					{
						type: 'query',
						key: 'filter-media',
						value: 'video',
					},
				],
				permanent: false,
				destination: '/:lang/teachings/video/page/1',
			},
			{
				source: '/:lang/sermons',
				has: [
					{
						type: 'query',
						key: 'filter-media',
						value: 'audio',
					},
				],
				permanent: false,
				destination: '/:lang/teachings/audio/page/1',
			},
			{
				source: '/:lang/sermons',
				destination: '/:lang/teachings/all/page/1',
				permanent: true,
			},
			{
				source: '/:lang/trending/index',
				destination: '/:lang/teachings/trending',
				permanent: true,
			},
			{
				source: '/:lang/sermons/recordings/:id/:slug',
				destination: '/:lang/teachings/:id/:slug',
				permanent: true,
			},
			{
				source: '/:lang/sermons/presenters',
				destination: '/:lang/presenters/page/1',
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
				source: '/:lang/sermons/seriess',
				destination: '/:lang/series/page/1',
				permanent: true,
			},
			{
				source: '/:lang/playlists/lists',
				destination: '/:lang/discover/collections',
				permanent: true,
			},
			{
				source: '/:lang/playlists/lists/:id/:slugs',
				destination: '/:lang/discover/collections',
				permanent: true,
			},
			{
				source: '/:lang/topics',
				destination: '/:lang/discover/collections',
				permanent: true,
			},
			{
				source: '/:lang/topics/:topicId/:slugs',
				destination: '/:lang/discover/collections',
				permanent: true,
			},
			{
				source: '/:lang/testimonials',
				destination: '/:lang/testimonies/page/1',
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
