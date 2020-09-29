import { useRouter } from 'next/router';
import React from 'react';
import { IntlProvider } from 'react-intl';

type Messages = {
	[langCode: string]: {
		[key: string]: string;
	};
};

const messages: Messages = {
	en: {},
	es: {
		title: 'Testimonios',
	},
};

const withIntl = <P extends any>(
	Component: React.ComponentType<P>
): React.ComponentType<P> => {
	function WithIntl(props: P) {
		const { query } = useRouter() || { query: { language: 'en' } };

		const language = Array.isArray(query.language)
			? query.language[0]
			: query.language || 'en';

		return (
			<IntlProvider
				messages={messages[language]}
				locale={language}
				defaultLocale="en"
			>
				<Component {...(props as any)} />
			</IntlProvider>
		);
	}

	return WithIntl;
};

export default withIntl;
