import _ from 'lodash';

import { LanguageConfiguration, LANGUAGES } from '@lib/constants';

export default function getLanguageByBaseUrl(
	base_url: string,
	fallback: string | null = null
): LanguageConfiguration | undefined {
	return (
		_.find(LANGUAGES, (l) => l.base_url === base_url) ||
		_.find(LANGUAGES, (l) => l.base_url === fallback) ||
		undefined
	);
}
