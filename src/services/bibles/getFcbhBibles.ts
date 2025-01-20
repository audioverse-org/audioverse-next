import fs from 'fs';

import { ApiBible } from './getApiBibles';

export function getFcbhBibles(languageRoute: string): ApiBible[] | null {
	if (languageRoute !== 'en') return null;

	return JSON.parse(fs.readFileSync('fcbh-bibles.json', 'utf8'));
}
