import findKey from 'lodash/findKey';

import { LANGUAGES } from './constants';

export function getValidLanguage(language: string | undefined): Language {
	const langKey = findKey(
		LANGUAGES,
		(l) => l.base_url === language
	) as Language;

	if (!langKey) return 'ENGLISH';

	return langKey;
}
