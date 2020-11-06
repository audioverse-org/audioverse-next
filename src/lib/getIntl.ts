import { createIntl, IntlShape } from 'react-intl';

import getIntlMessages from '@lib/getIntlMessages';

export default function getIntl(language: string): IntlShape {
	const messages = getIntlMessages(language);

	return createIntl({
		locale: language,
		messages,
	});
}
