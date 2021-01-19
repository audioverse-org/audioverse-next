import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';

export default function getIntlMessages(languageRoute: string): any {
	const lang = getLanguageByBaseUrl(languageRoute, 'en');

	return require(`../../public/compiled-lang/${lang?.base_url}.json`);
}
