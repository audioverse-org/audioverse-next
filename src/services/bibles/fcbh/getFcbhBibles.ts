import fs from 'fs';

import { IBibleVersion } from '../types';

export function getFcbhBibles(languageRoute: string): IBibleVersion[] | null {
	if (languageRoute !== 'en') return null;

	return JSON.parse(fs.readFileSync('fcbh-bibles.json', 'utf8'));
}
