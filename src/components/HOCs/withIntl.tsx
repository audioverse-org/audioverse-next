import React, { useState } from 'react';
import { IntlProvider, ResolvedIntlConfig } from 'react-intl';

import getIntlMessages from '@lib/getIntlMessages';
import handleIntlError from '@lib/handleIntlError';
import useLanguageRoute from '@lib/useLanguageRoute';

type Messages = ResolvedIntlConfig['messages'];

const withIntl = <P extends Record<string, unknown>>(
	Component: React.ComponentType<P>
): React.ComponentType<P> => {
	function WithIntl(props: P) {
		const language = useLanguageRoute();
		const [messages, setMessages] = useState<Messages>({});

		React.useEffect(() => {
			getIntlMessages(language).then(setMessages);
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
