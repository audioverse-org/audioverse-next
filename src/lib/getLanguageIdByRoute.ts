import { LANGUAGES, SupportedLanguages } from '@lib/constants';
import { Language } from '@src/__generated__/graphql';

export function getLanguageIdByRoute(
	route: string | undefined,
	fallback: SupportedLanguages = Language.English
): SupportedLanguages {
	const id = Object.entries(LANGUAGES).find(([, v]) =>
		v.base_urls.includes(route || '')
	)?.[0];

	return (id as Language) || fallback;
}
