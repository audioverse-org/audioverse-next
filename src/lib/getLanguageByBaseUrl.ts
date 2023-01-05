import find from 'lodash/find';

import { LanguageConfiguration, LANGUAGES } from '@/lib/constants';

export default function getLanguageByBaseUrl(
	base_url: string,
	fallback: string | null = null
): LanguageConfiguration | undefined {
	return (
		find(LANGUAGES, (l) => l.base_url === base_url) ||
		find(LANGUAGES, (l) => l.base_url === fallback) ||
		undefined
	);
}
