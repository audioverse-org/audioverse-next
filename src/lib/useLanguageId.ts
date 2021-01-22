import { Language } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import useLanguageRoute from '@lib/useLanguageRoute';

export function useLanguageId(fallback: Language = Language.English): Language {
	const route = useLanguageRoute();

	return getLanguageIdByRoute(route, fallback);
}
