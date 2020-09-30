import { useRouter } from 'next/router';
import React from 'react';
import { IntlProvider } from 'react-intl';

const withIntl = <P extends any>(
	Component: React.ComponentType<P>
): React.ComponentType<P> => {
	function WithIntl(props: P) {
		const { query } = useRouter() || { query: { language: 'en' } };

		const language = Array.isArray(query.language)
			? query.language[0]
			: query.language || 'en';

		// TODO: Use uriencodecomponent
		const messages = require(`../../../public/compiled-lang/${language}.json`);

		return (
			<IntlProvider messages={messages} locale={language} defaultLocale="en">
				<Component {...(props as any)} />
			</IntlProvider>
		);
	}

	return WithIntl;
};

export default withIntl;
