import { LanguageConfiguration } from './constants';

export default function getIntlMessages(language: LanguageConfiguration) {
	return import(`~public/compiled-lang/${language.base_urls[0]}.json`);
}
