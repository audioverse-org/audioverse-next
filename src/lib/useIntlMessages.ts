import { useEffect, useState } from 'react';
import { ResolvedIntlConfig } from 'react-intl';

import getLanguageByBaseUrl from '~lib/getLanguageByBaseUrl';
import english from '~public/compiled-lang/en.json';

import getIntlMessages from './getIntlMessages';

type Messages = ResolvedIntlConfig['messages'];

export default function useIntlMessages(languageRoute: string): Messages {
	const [messages, setMessages] = useState<Messages>(english);

	useEffect(() => {
		const lang = getLanguageByBaseUrl(languageRoute, 'en');

		if (!lang) return;

		if (lang.base_urls?.[0] === 'en') {
			setMessages(english);
			return;
		}

		const loadMessages = async () => {
			try {
				const m = await getIntlMessages(lang);
				setMessages(m);
			} catch (error) {
				console.error('Failed to load intl messages:', error);
			}
		};

		loadMessages();
	}, [languageRoute]);

	return messages;
}
