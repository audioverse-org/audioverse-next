import { resolve } from 'path';

export const ENTRIES_PER_PAGE = 25;

export const LANGUAGES: { [key: string]: { base_url: string } } = {
	ENGLISH: { base_url: 'en' },
	SPANISH: { base_url: 'es' },
	FRENCH: { base_url: 'fr' },
	GERMAN: { base_url: 'de' },
	CHINESE: { base_url: 'zh' },
	JAPANESE: { base_url: 'ja' },
	RUSSIAN: { base_url: 'ru' },
};

export const PROJECT_ROOT = resolve(__dirname, '../..');
