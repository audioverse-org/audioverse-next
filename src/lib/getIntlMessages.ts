import { ResolvedIntlConfig } from 'react-intl';

import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';

export default function getIntlMessages(
	languageRoute: string
): ResolvedIntlConfig['messages'] {
	const lang = getLanguageByBaseUrl(languageRoute, 'en');

	if (!lang) {
		throw new Error(`Language "${languageRoute}" not found`);
	}

	return require(`../../public/compiled-lang/${lang.base_url}.json`);
}
