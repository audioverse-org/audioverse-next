import { LANGUAGES, SupportedLanguages } from '@lib/constants';

export function getLanguageIdByRouteOrLegacyRoute(
	route: string | undefined
): SupportedLanguages | undefined {
	return Object.keys(LANGUAGES)
		.filter((k): k is SupportedLanguages => k in LANGUAGES)
		.find(
			(k) =>
				LANGUAGES[k].base_urls.includes(route || '') ||
				LANGUAGES[k].legacy_base_url === route
		);
}
