import { Language } from '~src/__generated__/graphql';

import { LANGUAGES } from './constants';

const isLangKey = (key: string): key is Language => {
	return Object.values(Language).includes(key as Language);
};

export function getValidLanguage(language: string | undefined): Language {
	const langKey = Object.keys(LANGUAGES).find(
		(k) => isLangKey(k) && LANGUAGES[k].base_urls.includes(language || '')
	);

	if (!langKey) return Language.English;

	return langKey as Language;
}
