import _ from 'lodash';

import { LanguageConfiguration, LANGUAGES } from '@lib/constants';
import useLanguageRoute from '@lib/useLanguageRoute';

export function useLanguageId(fallback = 'ENGLISH'): string {
	const route = useLanguageRoute();
	const id = _.findKey(
		LANGUAGES,
		(l: LanguageConfiguration) => l.base_url === route
	);

	return id || fallback;
}
