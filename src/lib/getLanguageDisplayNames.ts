import { LANGUAGES } from '@lib/constants';
import type { Language } from '@lib/generated/graphql';

import getLanguageIds from './getLanguageIds';

export function getLanguageDisplayNames(): string[] {
	const keys = getLanguageIds();

	return keys.map((k: Language) => LANGUAGES[k].display_name);
}
