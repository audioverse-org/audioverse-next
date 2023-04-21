import { ResolvedIntlConfig } from 'react-intl';

import getLanguageByBaseUrl from '~lib/getLanguageByBaseUrl';

export default function getIntlMessages(
	languageRoute: string
): Promise<ResolvedIntlConfig['messages']> {
	const lang = getLanguageByBaseUrl(languageRoute, 'en');

	if (!lang) {
		throw new Error(`Language "${languageRoute}" not found`);
	}

	return import(`../../public/compiled-lang/${lang.base_urls[0]}.json`);
}
