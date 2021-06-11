import { LANGUAGES } from '@lib/constants';
import { Language } from '@lib/generated/graphql';

export default function getLanguageIds(): Language[] {
	return Object.keys(LANGUAGES) as Language[];
}
