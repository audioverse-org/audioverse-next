import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';

export default function getIntlMessages(language: string): any {
	const lang = getLanguageByBaseUrl(language, 'en');

	return require(`../../public/compiled-lang/${lang?.base_url}.json`);
}
