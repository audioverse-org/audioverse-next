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
});
