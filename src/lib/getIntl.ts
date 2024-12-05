import { createIntl, IntlShape } from 'react-intl';

import getLanguageByBaseUrl from '~lib/getLanguageByBaseUrl';
import handleIntlError from '~lib/handleIntlError';

import getIntlMessages from './getIntlMessages';

export default async function getIntl(
	languageRoute: string,
): Promise<IntlShape> {
	const langConfig = getLanguageByBaseUrl(languageRoute, 'en');

	if (!langConfig) {
		throw new Error(
			`Language not found for ${languageRoute} and fallabck failed to load`,
		);
	}

	const locale = langConfig.base_urls[0];
	const messages = await getIntlMessages(langConfig);

	return createIntl({
		locale,
		messages,
		onError: handleIntlError,
	});
}
