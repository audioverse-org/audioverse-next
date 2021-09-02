import _ from 'lodash';

import { LanguageConfiguration, LANGUAGES } from '@lib/constants';
import { Language } from '@lib/generated/graphql';

export function getLanguageIdByRoute(
	route: string | undefined,
	fallback: Language = Language.English
): Language {
	const id = _.findKey(
		LANGUAGES,
		(l: LanguageConfiguration) => l.base_url === route
	) as Language;

	return id || fallback;
}
