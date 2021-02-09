import { LANGUAGES } from '@lib/constants';
import { Language } from '@lib/generated/graphql';

export function getLanguageRoutes(): string[] {
	const keys = Object.keys(LANGUAGES) as Language[];

	return keys.map((k: Language) => LANGUAGES[k].base_url);
}
