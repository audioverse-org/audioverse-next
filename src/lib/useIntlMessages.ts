import { useEffect, useState } from 'react';
import { ResolvedIntlConfig } from 'react-intl';

import getLanguageByBaseUrl from '~lib/getLanguageByBaseUrl';
import english from '~public/compiled-lang/en.json';

import getIntlMessages from './getIntlMessages';

type Messages = ResolvedIntlConfig['messages'];

export default function useIntlMessages(languageRoute: string): Messages {
	const [messages, setMessages] = useState<Messages>(english);
	const lang = getLanguageByBaseUrl(languageRoute, 'en');

	useEffect(() => {
		if (!lang || lang.base_urls[0] === 'en') return;

		getIntlMessages(lang).then((m) => setMessages(m));
	}, [lang]);

	return messages;
}
