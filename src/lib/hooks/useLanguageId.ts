import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { Language } from '~src/__generated__/graphql';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';

import { SupportedLanguages } from '../constants';

export function useLanguageId(
	fallback: SupportedLanguages = Language.English,
): Language {
	const route = useLanguageRoute();

	return getLanguageIdByRoute(route, fallback);
}
