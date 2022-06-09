import findKey from 'lodash/findKey';

import {
	LanguageConfiguration,
	LANGUAGES,
	SupportedLanguages,
} from '@lib/constants';

export function getLanguageIdByRoute(
	route: string | undefined,
	fallback: SupportedLanguages = Language.English
): SupportedLanguages {
	const id = findKey(
		LANGUAGES,
		(l: LanguageConfiguration) => l.base_url === route
	) as SupportedLanguages;

	return id || fallback;
}
