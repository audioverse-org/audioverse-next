import { ResolvedIntlConfig } from 'react-intl';

import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';

export default function getIntlMessages(
	languageRoute: string
): Promise<ResolvedIntlConfig['messages']> {
	const lang = getLanguageByBaseUrl(languageRoute, 'en');

	return import(`../../public/compiled-lang/${lang?.base_url}.json`);
}
