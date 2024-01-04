const withPWA = require('next-pwa')({
	dest: 'public',
	// WORKAROUND: https://github.com/shadowwalker/next-pwa/issues/288#issuecomment-955777098
	buildExcludes: [/server\/middleware-manifest\.json$/],
});
const path = require('path');

const withBundleAnalyzer =
	process.env.ANALYZE === 'true'
		? require('@next/bundle-analyzer')()
		: (x) => x;

module.exports = withBundleAnalyzer(
	withPWA({
		headers() {
			return [
				{
					source: '/apple-app-site-association',
					headers: [
						{
							key: 'Content-Type',
							value: 'application/json',
						},
					],
				},
				{
					source: '/(.*)',
					headers: [
						{
							key: 'Permissions-Policy',
							value: 'interest-cohort=()',
						},
					],
				},
			];
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
				portuguese: 'pt',
			};
			return [
				...Object.keys(languagePrefixMap).map((prefix) => ({
					source: `/${prefix}`,
					destination: `/${languagePrefixMap[prefix]}`,
					permanent: true,
				})),
				...Object.keys(languagePrefixMap).map((prefix) => ({
					source: `/${prefix}/:path((?!podcasts\/latest|sermons\/podcasts\/latest|sermones\/podcasts\/ultima|predications\/podcasts\/plusrecent).*)`,
					destination: `/${languagePrefixMap[prefix]}/:path*`,
					statusCode: 301,
				})),
				...Object.keys(languagePrefixMap).map((prefix) => ({
					source: '/',
					destination: `/${languagePrefixMap[prefix]}/discover`,
					has: [
						{
							type: 'cookie',
							key: 'avSession',
							value: undefined,
						},
						{
							type: 'cookie',
							key: 'lang',
							value: languagePrefixMap[prefix],
						},
					],
					permanent: false,
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
					source: '/give',
					destination: '/en/give',
					permanent: false,
				},
				{
					source: '/brochure',
					destination: '/en',
					permanent: false,
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
					source: '/:lang/audiobooks/egwbooks/podcast/:seriesId/latest/:slug',
					destination: '/:lang/egwbooks/:seriesId/feed.xml',
					permanent: true, //egw
				},
				{
					source: '/:lang/music/browse/podcast/:seriesId/latest/:slug',
					destination: '/:lang/songs/albums/:seriesId/feed.xml',
					permanent: true,
				},
				{
					source:
						'/:lang/sermons/conferences/podcast/:conferenceId/latest/:slug',
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
					source: '/sermons/presenters/podcast/:presenterId/latest/:slug',
					destination: '/en/presenters/:presenterId/feed.xml',
					permanent: false,
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
					destination: '/:lang/library/playlists',
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
					source: '/:lang/registrar/help',
					destination: '/:lang/account/login',
					permanent: true,
				},
				{
					source: '/:lang/blog/page/1',
					destination: '/:lang/blog',
					permanent: true,
				},
				{
					source: '/:lang/books/page/1',
					destination: '/:lang/books',
					permanent: true,
				},
				{
					source: '/:lang/egwbooks/page/1',
					destination: '/:lang/egwbooks',
					permanent: true,
				},
				{
					source: '/:lang/conferences/page/1',
					destination: '/:lang/conferences',
					permanent: true,
				},
				{
					source: '/:lang/conferences/:id/presenters/page/1',
					destination: '/:lang/conferences/:id/presenters',
					permanent: true,
				},
				{
					source: '/:lang/conferences/:id/sequences/page/1',
					destination: '/:lang/conferences/:id/sequences',
					permanent: true,
				},
				{
					source: '/:lang/conferences/:id/teachings/page/1',
					destination: '/:lang/conferences/:id/teachings',
					permanent: true,
				},
				{
					source: '/:lang/series/page/1',
					destination: '/:lang/series',
					permanent: true,
				},
				{
					source: '/:lang/sponsors/page/1',
					destination: '/:lang/sponsors',
					permanent: true,
				},
				{
					source: '/:lang/stories/albums/page/1',
					destination: '/:lang/stories/albums',
					permanent: true,
				},
				{
					source: '/:lang/presenters/:id/appears/page/1',
					destination: '/:lang/presenters/:id/appears',
					permanent: true,
				},
				{
					source: '/:lang/presenters/:id/sequences/page/1',
					destination: '/:lang/presenters/:id/sequences',
					permanent: true,
				},
				{
					source: '/:lang/presenters/:id/teachings/page/1',
					destination: '/:lang/presenters/:id/teachings',
					permanent: true,
				},
				{
					source: '/:lang/sponsors/:id/conferences/page/1',
					destination: '/:lang/sponsors/:id/conferences',
					permanent: true,
				},
				{
					source: '/:lang/sponsors/:id/series/page/1',
					destination: '/:lang/sponsors/:id/series',
					permanent: true,
				},
				{
					source: '/:lang/sponsors/:id/teachings/page/1',
					destination: '/:lang/sponsors/:id/teachings',
					permanent: true,
				},
				{
					source: '/:lang/testimonies/page/1',
					destination: '/:lang/testimonies',
					permanent: true,
				},
				{
					source: '/:lang/topics/page/1',
					destination: '/:lang/topics',
					permanent: true,
				},
				{
					source: '/:lang/audiobibles/books/ENGKJV/:testamentCode/:bookCode/1',
					destination: '/:lang/bibles/472',
					permanent: false,
				},
				{
					source: '/:lang/audiobibles/books/ENGKJV/:testamentCode/:bookCode/2',
					destination: '/:lang/bibles/ENGKJV2',
					permanent: false,
				},
				{
					source: '/:lang/audiobibles/books/ENGESV/:testamentCode/:bookCode/2',
					destination: '/:lang/bibles',
					permanent: false,
				},
				{
					source: '/:lang/audiobibles/volumes',
					destination: '/:lang/bibles',
					permanent: true,
				},
				{
					source: '/:lang/bibles/ENGKJV1',
					destination: '/:lang/bibles/472',
					permanent: false,
				},
				{
					source: '/:lang/bibles/ENGKJV1/:path*',
					destination: '/:lang/bibles/472',
					permanent: false,
				},
				{
					source: '/:lang/audiobibles/books/ENGKJV/1',
					destination: '/:lang/bibles/472',
					permanent: true,
				},
				{
					source: '/:lang/audiobibles/books/ENGKJV/2',
					destination: '/:lang/bibles/ENGKJV2',
					permanent: true,
				},
				{
					source: '/:lang/audiobibles/books/ENGESV/2',
					destination: '/:lang/bibles',
					permanent: false,
				},
				{
					source: '/:lang/audiobibles/books/ENGESV/2',
					destination: '/:lang/bibles',
					permanent: false,
				},
				{
					source: '/:lang/bibles/:bibleCode/:bookCode([\\w\\d]\\w+)',
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
					source: '/:lang/audiobooks/egwbooks',
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
					source: '/:lang/bibles/:path*',
					destination: '/:lang/biles/:path*',
					permanent: true,
				},
				{
					source: '/:lang/audiobooks/books/:path*',
					destination: '/:lang/books/:path*',
					permanent: true,
				},
				{
					source: '/:lang/audiobooks/egwbooks/:path*',
					destination: '/:lang/egwbooks/:path*',
					permanent: true,
				},
				{
					source: '/:lang/music/browse',
					destination: '/:lang/songs/albums',
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
					source: '/:lang/music/browse/tag/:tagName/:slug',
					destination: '/:lang/songs/albums',
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
					destination: '/:lang/teachings/trending/all',
					permanent: true,
				},
				{
					source: '/:lang/sermons/recordings/:id/:slug',
					destination: '/:lang/teachings/:id/:slug',
					permanent: true,
				},
				{
					source: '/:lang/sermons/presenters',
					destination: '/:lang/presenters',
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
					source: '/:lang/testimonials',
					destination: '/:lang/testimonies/page/1',
					permanent: true,
				},
				{
					source: '/:lang/contact',
					destination: '/:lang/contact/general',
					permanent: false,
				},
				{
					source: '/:lang/feedback',
					destination: '/:lang/contact/general',
					permanent: false,
				},
				{
					source: '/:lang/feedback/media',
					destination: '/:lang/contact/support',
					permanent: false,
				},
				{
					source: '/:lang/feedback/technical',
					destination: '/:lang/contact/support',
					permanent: false,
				},
				{
					source: '/:lang/feedback/testimonial',
					destination: '/:lang/contact/testimonies',
					permanent: false,
				},
				{
					source: '/:lang/feedback/contact',
					destination: '/:lang/contact/general',
					permanent: false,
				},
				{
					source: '/qr-code',
					destination: 'http://qr.audioverse.org/',
					permanent: true,
					basePath: false,
				},
			];
		},
		async rewrites() {
			return [
				{
					source: '/:lang/podcasts/latest',
					destination: '/:lang/teachings/all/feed.xml',
				},
				{
					source: '/:lang/podcasts/trending',
					destination: '/:lang/teachings/all/feed.xml',
				},
				{
					source: '/:lang/sermons/podcasts/latest',
					destination: '/:lang/teachings/all/feed.xml',
				},
				{
					source: '/:lang/sermones/podcasts/ultima',
					destination: '/:lang/teachings/all/feed.xml',
				},
				{
					source: '/:lang/predications/podcasts/plusrecent',
					destination: '/:lang/teachings/all/feed.xml',
				},
				{
					source: '/:lang/blog',
					destination: '/:lang/blog/page/1',
				},
				{
					source: '/:lang/books',
					destination: '/:lang/books/page/1',
				},
				{
					source: '/:lang/egwbooks',
					destination: '/:lang/egwbooks/page/1',
				},
				{
					source: '/:lang/conferences',
					destination: '/:lang/conferences/page/1',
				},
				{
					source: '/:lang/conferences/:id/presenters',
					destination: '/:lang/conferences/:id/presenters/page/1',
				},
				{
					source: '/:lang/topics',
					destination: '/:lang/topics/page/1',
				},
				{
					source: '/:lang/conferences/:id/sequences',
					destination: '/:lang/conferences/:id/sequences/page/1',
				},
				{
					source: '/:lang/conferences/:id/teachings',
					destination: '/:lang/conferences/:id/teachings/page/1',
				},
				{
					source: '/:lang/presenters',
					destination: '/:lang/presenters/all',
				},
				{
					source: '/:lang/presenters/:id/appears',
					destination: '/:lang/presenters/:id/appears/page/1',
				},
				{
					source: '/:lang/presenters/:id/sequences',
					destination: '/:lang/presenters/:id/sequences/page/1',
				},
				{
					source: '/:lang/presenters/:id/teachings',
					destination: '/:lang/presenters/:id/teachings/page/1',
				},
				{
					source: '/:lang/series',
					destination: '/:lang/series/page/1',
				},
				{
					source: '/:lang/sponsors',
					destination: '/:lang/sponsors/all',
				},
				{
					source: '/:lang/sponsors/:id/conferences',
					destination: '/:lang/sponsors/:id/conferences/page/1',
				},
				{
					source: '/:lang/sponsors/:id/series',
					destination: '/:lang/sponsors/:id/series/page/1',
				},
				{
					source: '/:lang/sponsors/:id/teachings',
					destination: '/:lang/sponsors/:id/teachings/page/1',
				},
				{
					source: '/:lang/stories/albums',
					destination: '/:lang/stories/albums/page/1',
				},
				{
					source: '/:lang/teachings/all',
					destination: '/:lang/teachings/all/page/1',
				},
				{
					source: '/:lang/teachings/audio',
					destination: '/:lang/teachings/audio/page/1',
				},
				{
					source: '/:lang/teachings/video',
					destination: '/:lang/teachings/video/page/1',
				},
				{
					source: '/:lang/teachings/trending',
					destination: '/:lang/teachings/trending/all',
				},
				{
					source: '/:lang/testimonies',
					destination: '/:lang/testimonies/page/1',
				},
				{
					source: '/:lang/download/:path*',
					destination: '/api/download/:lang/:path*',
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

			// https://github.com/videojs/video.js/issues/6166#issuecomment-520539730
			config.resolve.alias = {
				...config.resolve.alias,
				'video.js$': path.resolve(
					'node_modules/video.js/dist/alt/video.novtt.js'
				),
			};

			if (!dev) {
				// https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
				config.resolve.alias['@formatjs/icu-messageformat-parser'] =
					'@formatjs/icu-messageformat-parser/no-parser';
			}

			return config;
		},
		images: {
			domains: ['ik.imagekit.io', 's3.amazonaws.com'],
		},
	})
);
