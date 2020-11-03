import _ from 'lodash';

import { Language, LANGUAGES } from '@lib/constants';

export default function getLanguageByBaseUrl(base_url: string): Language {
	const key = _.findKey(LANGUAGES, (l) => l.base_url === base_url);

	if (!key) throw Error('Missing or invalid language');

	return LANGUAGES[key];
}
