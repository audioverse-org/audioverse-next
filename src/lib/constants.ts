import { Language } from './generated/graphql';

export const ENTRIES_PER_PAGE = 25;

export interface LanguageConfiguration {
	base_url: string;
	display_name: string;
}

export type LanguageConfigurations = {
	[key in Language]: LanguageConfiguration;
};

export const LANGUAGES: LanguageConfigurations = {
	ENGLISH: { base_url: 'en', display_name: 'English' },
	SPANISH: { base_url: 'es', display_name: 'Español' },
	FRENCH: { base_url: 'fr', display_name: 'Français' },
	GERMAN: { base_url: 'de', display_name: 'Deutsch' },
	CHINESE: { base_url: 'zh', display_name: '中文' },
	JAPANESE: { base_url: 'ja', display_name: '日本語' },
	RUSSIAN: { base_url: 'ru', display_name: 'Русский' },
};

export const PROJECT_ROOT = process.cwd();
