import { data } from '~/../fcbh-bibles';

import { IBibleVersion } from '../types';

export function getFcbhBibles(languageRoute: string): IBibleVersion[] | null {
	if (languageRoute !== 'en') return null;

	return JSON.parse(data);
}
