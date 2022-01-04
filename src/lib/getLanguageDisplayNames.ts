import { LANGUAGES } from '@lib/constants';

import getLanguageIds from './getLanguageIds';

export function getLanguageDisplayNames(): string[] {
	const keys = getLanguageIds();

	return keys.map((k) => LANGUAGES[k].display_name);
}
