/** @type {import('next-sitemap').IConfig} */

const ALLOW_INDEX = process.env.SITE_URL === 'https://www.audioverse.org';
const ALLOW_ROBOTS_POLICY = [{ userAgent: '*', allow: '/' }];
const DISALLOW_ROBOTS_POLICY = [{ userAgent: '*', disallow: '/' }];

module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_APP_URL,
	generateRobotsTxt: true,
	generateIndexSitemap: ALLOW_INDEX,
	robotsTxtOptions: {
		policies: ALLOW_INDEX ? ALLOW_ROBOTS_POLICY : DISALLOW_ROBOTS_POLICY,
		// includeNonIndexSitemaps
	},
};
