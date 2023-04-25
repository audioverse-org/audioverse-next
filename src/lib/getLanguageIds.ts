import { LANGUAGES, SupportedLanguages } from '~lib/constants';

export default function getLanguageIds(): SupportedLanguages[] {
	return Object.keys(LANGUAGES) as SupportedLanguages[];
}
