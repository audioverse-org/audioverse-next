import React from 'react';
import { IntlProvider } from 'react-intl';

import getIntlMessages from '@lib/getIntlMessages';
import useLanguageRoute from '@lib/useLanguageRoute';

const useTranslation = () => {
	const language = useLanguageRoute();
	const messages = getIntlMessages(language);

	return { language, messages };
};

const withIntl = <P extends any>(
	Component: React.ComponentType<P>
): React.ComponentType<P> => {
	function WithIntl(props: P) {
		const { language, messages } = useTranslation();

		return (
			<IntlProvider
				messages={messages}
				locale={language}
				defaultLocale="en"
				onError={(err) => {
					// TODO: Stop swallowing these errors
					if (err.code === 'MISSING_TRANSLATION') {
						return;
					}
					throw err;
				}}
			>
				<Component {...(props as any)} />
			</IntlProvider>
		);
	}

	return WithIntl;
};

export default withIntl;
