import React, { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';

import handleIntlError from '@lib/handleIntlError';
import useLanguageRoute from '@lib/useLanguageRoute';
import useIntlMessages from '@lib/useIntlMessages';

type ComponentType<P extends Record<string, unknown>> = (
	props: P
) => ReactElement;

const withIntl = <P extends Record<string, unknown>>(
	Component: ComponentType<P>
): ComponentType<P> => {
	function WithIntl(props: P): ReactElement {
		const language = useLanguageRoute();
		const { messages } = useIntlMessages();

		return (
			<IntlProvider
				messages={messages}
				locale={language}
				defaultLocale="en"
				onError={handleIntlError}
			>
				<Component {...props} />
			</IntlProvider>
		);
	}

	return WithIntl;
};

export default withIntl;
