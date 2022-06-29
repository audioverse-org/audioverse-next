import useLanguageRoute from '@lib/useLanguageRoute';
import { ResolvedIntlConfig } from 'react-intl';
import getIntlMessages from '@lib/getIntlMessages';
import { useEffect, useState } from 'react';

// https://stackoverflow.com/a/66071205/937377
export default function useIntlMessages(): {
	messages: ResolvedIntlConfig['messages'];
	loading: boolean;
} {
	const language = useLanguageRoute();
	const [messages, setMessages] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let active = true;
		setLoading(true);

		async function loadMessages() {
			const messages = await getIntlMessages(language);
			if (!active) return;
			setMessages(messages);
			setLoading(false);
		}

		loadMessages().then(() => {
			// noop
		});

		return () => {
			active = false;
		};
	}, [language]);

	return {
		messages,
		loading,
	};
}
