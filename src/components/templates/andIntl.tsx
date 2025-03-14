import React from 'react';
import { IntlProvider } from 'react-intl';

import handleIntlError from '~lib/handleIntlError';
import useLanguageRoute from '~lib/hooks/useLanguageRoute';
import useIntlMessages from '~src/lib/useIntlMessages';

function AndIntl({ children }: { children: React.ReactNode }) {
	const language = useLanguageRoute();
	const messages = useIntlMessages(language);
	return (
		<IntlProvider
			messages={messages}
			locale={language}
			defaultLocale="en"
			onError={handleIntlError}
		>
			{children}
		</IntlProvider>
	);
}

export default AndIntl;
