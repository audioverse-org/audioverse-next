import { PROJECT_ROOT } from '@lib/constants';
import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';

export default function getIntlMessages(language: string): any {
	const lang = getLanguageByBaseUrl(language, 'en');

	return require(`${PROJECT_ROOT}/public/compiled-lang/${lang.base_url}.json`);
}
