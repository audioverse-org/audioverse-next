import findKey from 'lodash/findKey';

import {
	LanguageConfiguration,
	LANGUAGES,
	SupportedLanguages,
} from '@lib/constants';

export function getLanguageIdByRouteOrLegacyRoute(
	route: string | undefined
): SupportedLanguages | undefined {
	return findKey(
		LANGUAGES,
		(l: LanguageConfiguration) =>
			l.base_url === route || l.legacy_base_url === route
	) as SupportedLanguages | undefined;
}
