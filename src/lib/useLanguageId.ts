import _ from 'lodash';

import { Language, LANGUAGES } from '@lib/constants';
import useLanguageRoute from '@lib/useLanguageRoute';

export function useLanguageId(fallback = 'ENGLISH'): string {
	const route = useLanguageRoute();
	const id = _.findKey(LANGUAGES, (l: Language) => l.base_url === route);

	return id || fallback;
}
