import React from 'react';
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl';
import { useRouter } from 'next/router';

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

const Testimonies = () => {
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
			<h2>
				<FormattedMessage id={'title'} defaultMessage={'Testimonies'} />
			</h2>
		</IntlProvider>
	);
};

export default Testimonies;
