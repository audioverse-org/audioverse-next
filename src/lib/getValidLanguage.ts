import findKey from 'lodash/findKey';

import { LANGUAGES } from './constants';
import { Language } from '@src/__generated__/graphql';

export function getValidLanguage(language: string | undefined): Language {
	const langKey = findKey(
		LANGUAGES,
		(l) => l.base_url === language
	) as Language;

	if (!langKey) return 'ENGLISH';

	return langKey;
}
