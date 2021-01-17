import _ from 'lodash';

import { LanguageConfiguration, LANGUAGES } from '@lib/constants';
import { Language } from '@lib/generated/graphql';
import useLanguageRoute from '@lib/useLanguageRoute';

export function useLanguageId(fallback: Language = Language.English): Language {
	const route = useLanguageRoute();
	const id = _.findKey(
		LANGUAGES,
		(l: LanguageConfiguration) => l.base_url === route
	) as Language;

	return id || fallback;
}
