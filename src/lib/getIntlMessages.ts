import { ResolvedIntlConfig } from 'react-intl';

import getLanguageByBaseUrl from '~lib/getLanguageByBaseUrl';

export default async function getIntlMessages(
	languageRoute: string,
): Promise<ResolvedIntlConfig['messages']> {
	const lang = getLanguageByBaseUrl(languageRoute, 'en');

	if (!lang) {
		throw new Error(`Language "${languageRoute}" not found`);
	}

	// Import pre-compiled messages
	const messages = await import(
		`~public/compiled-lang/${lang.base_urls[0]}.json`
	);

	// Ensure messages are in the correct format for react-intl v6
	return Object.entries(messages).reduce(
		(acc, [key, value]) => {
			acc[key] = Array.isArray(value) ? value : [{ type: 0, value }];
			return acc;
		},
		{} as ResolvedIntlConfig['messages'],
	);
}
