import { createIntl, IntlShape } from 'react-intl';

import getIntlMessages from '@lib/getIntlMessages';
import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';

export default function getIntl(languageRoute: string): IntlShape {
	const locale = getLanguageByBaseUrl(languageRoute)?.base_url || 'en';
	const messages = getIntlMessages(languageRoute);

	return createIntl({
		locale,
		messages,
	});
}
