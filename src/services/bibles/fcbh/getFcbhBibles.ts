import { IBibleVersion } from '../types';
import { data } from './metadata';

export function getFcbhBibles(languageRoute: string): IBibleVersion[] | null {
	if (languageRoute !== 'en') return null;

	return JSON.parse(data);
}
