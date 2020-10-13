import { useRouter } from 'next/router';
import React from 'react';
import { IntlProvider } from 'react-intl';
import _ from 'lodash';

const useTranslation = () => {
	const router = useRouter(),
		languageParam = _.get(router, 'query.language', 'en'),
		language = Array.isArray(languageParam) ? languageParam[0] : languageParam;

	let messages = {};

	try {
		// TODO: Use uriencodecomponent
		messages = require(`../../../public/compiled-lang/${language}.json`);
	} catch (e) {
		messages = require(`../../../public/compiled-lang/en.json`);
	}

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
