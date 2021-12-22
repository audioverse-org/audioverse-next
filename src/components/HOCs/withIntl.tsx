import React from 'react';
import { IntlProvider } from 'react-intl';

import getIntlMessages from '@lib/getIntlMessages';
import handleIntlError from '@lib/handleIntlError';
import useLanguageRoute from '@lib/useLanguageRoute';

const withIntl = <P extends Record<string, unknown>>(
	Component: React.ComponentType<P>
): React.ComponentType<P> => {
	function WithIntl(props: P) {
		const language = useLanguageRoute();
		const [messages, setMessages] = React.useState({});
		React.useEffect(() => {
			getIntlMessages(language).then((m) => setMessages(m));
		}, [language]);

		return (
			<IntlProvider
				messages={messages}
				locale={language}
				defaultLocale="en"
				onError={handleIntlError}
			>
				<Component {...(props as P)} />
			</IntlProvider>
		);
	}

	return WithIntl;
};

export default withIntl;
