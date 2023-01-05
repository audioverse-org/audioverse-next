import { Language } from '@/lib/generated/graphql';
import { getLanguageIdByRoute } from '@/lib/getLanguageIdByRoute';
import useLanguageRoute from '@/lib/useLanguageRoute';

import { SupportedLanguages } from './constants';

export function useLanguageId(
	fallback: SupportedLanguages = Language.English
): Language {
	const route = useLanguageRoute();

	return getLanguageIdByRoute(route, fallback);
}
