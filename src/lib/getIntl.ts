import { createIntl, IntlShape } from 'react-intl';

import getIntlMessages from '@/lib/getIntlMessages';
import getLanguageByBaseUrl from '@/lib/getLanguageByBaseUrl';
import handleIntlError from '@/lib/handleIntlError';

export default async function getIntl(
	languageRoute: string
): Promise<IntlShape> {
	const locale = getLanguageByBaseUrl(languageRoute)?.base_url || 'en';
	const messages = await getIntlMessages(languageRoute);

	return createIntl({
		locale,
		messages,
		onError: handleIntlError,
	});
}
