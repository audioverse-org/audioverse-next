import React from 'react';
import { IntlProvider } from 'react-intl';

import getIntlMessages from '@lib/getIntlMessages';
import useLanguage from '@lib/useLanguage';

const useTranslation = () => {
	const language = useLanguage();
	const messages = getIntlMessages(language);

	return { language, messages };
};

const withIntl = <P extends any>(
	Component: React.ComponentType<P>
): React.ComponentType<P> => {
	function WithIntl(props: P) {
		const { language, messages } = useTranslation();

		return (
			<IntlProvider messages={messages} locale={language} defaultLocale="en">
				<Component {...(props as any)} />
			</IntlProvider>
		);
	}

	return WithIntl;
};

export default withIntl;
