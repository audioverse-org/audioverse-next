import { LANGUAGES } from '@/lib/constants';

import getLanguageIds from './getLanguageIds';

export function getLanguageRoutes(): string[] {
	const keys = getLanguageIds();

	return keys.map((k) => LANGUAGES[k].base_url);
}
