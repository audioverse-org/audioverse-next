export const ENTRIES_PER_PAGE = 25;

export interface Language {
	base_url: string;
	display_name: string;
}

interface Languages {
	[key: string]: Language;
}

export const LANGUAGES: Languages = {
	ENGLISH: { base_url: 'en', display_name: 'English' },
	SPANISH: { base_url: 'es', display_name: 'Español' },
	FRENCH: { base_url: 'fr', display_name: 'Français' },
	GERMAN: { base_url: 'de', display_name: 'Deutsch' },
	CHINESE: { base_url: 'zh', display_name: '中文' },
	JAPANESE: { base_url: 'ja', display_name: '日本語' },
	RUSSIAN: { base_url: 'ru', display_name: 'Русский' },
};

export const PROJECT_ROOT = process.cwd();
