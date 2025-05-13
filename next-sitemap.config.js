/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: process.env.SITE_URL || 'https://www.audioverse.org',
	generateRobotsTxt: true,
};
