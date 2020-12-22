import _ from 'lodash';

import { Language, LANGUAGES } from '@lib/constants';

export default function getLanguageByBaseUrl(
	base_url: string,
	fallback: string | null = null
): Language | undefined {
	const key = _.findKey(LANGUAGES, (l) => l.base_url === base_url);
	const fallbackKey = _.findKey(LANGUAGES, (l) => l.base_url === fallback);

	if (key) {
		return LANGUAGES[key];
	}

	if (fallbackKey) {
		return LANGUAGES[fallbackKey];
	}

	return undefined;
}
