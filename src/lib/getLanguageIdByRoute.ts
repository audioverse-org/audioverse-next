import findKey from 'lodash/findKey';

import { LanguageConfiguration, LANGUAGES } from '@lib/constants';
import { Language } from '@lib/generated/graphql';

export function getLanguageIdByRoute(
	route: string | undefined,
	fallback: Language = Language.English
): Language {
	const id = findKey(
		LANGUAGES,
		(l: LanguageConfiguration) => l.base_url === route
	) as Language;

	return id || fallback;
}
