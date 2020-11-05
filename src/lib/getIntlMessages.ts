import { PROJECT_ROOT } from '@lib/constants';

export default function getIntlMessages(language: string): any {
	try {
		return require(`${PROJECT_ROOT}/public/compiled-lang/${language}.json`);
	} catch (e) {
		return require(`${PROJECT_ROOT}/public/compiled-lang/en.json`);
	}
}
