import { Language } from '~src/__generated__/graphql';

export const ENTRIES_PER_PAGE = 12;

export interface LanguageConfiguration {
	base_urls: string[];
	display_name: string;
	legacy_base_url: string;
}

export type SupportedLanguages = Language;

export type LanguageConfigurations = {
	[key in SupportedLanguages]: LanguageConfiguration;
};

export const LANGUAGES: LanguageConfigurations = {
	ENGLISH: {
		base_urls: ['en'],
		display_name: 'English',
		legacy_base_url: 'english',
	},
	SPANISH: {
		base_urls: ['es'],
		display_name: 'Español',
		legacy_base_url: 'espanol',
	},
	FRENCH: {
		base_urls: ['fr'],
		display_name: 'Français',
		legacy_base_url: 'francais',
	},
	GERMAN: {
		base_urls: ['de'],
		display_name: 'Deutsch',
		legacy_base_url: 'deutsch',
	},
	CHINESE: {
		base_urls: ['zh'],
		display_name: '中文',
		legacy_base_url: 'zhongwen',
	},
	JAPANESE: {
		base_urls: ['ja'],
		display_name: '日本語',
		legacy_base_url: 'japanese',
	},
	RUSSIAN: {
		base_urls: ['ru'],
		display_name: 'Русский',
		legacy_base_url: 'russian',
	},
	NORDIC: {
		base_urls: ['no'],
		display_name: 'Scandinavia',
		legacy_base_url: 'no',
	},
	PORTUGUESE: {
		base_urls: ['br', 'pt'],
		display_name: 'Português',
		legacy_base_url: 'pt',
	},
};

export const IS_DEVELOPMENT =
	process.env.NODE_ENV === 'development' ||
	process.env.ENV_OVERRIDE === 'development';
export const IS_PRODUCTION_DEPLOYMENT = process.env.VERCEL_ENV === 'production';
export const DETAIL_PRERENDER_LIMIT = IS_PRODUCTION_DEPLOYMENT ? 25 : 2;
export const LIST_PRERENDER_LIMIT = IS_PRODUCTION_DEPLOYMENT ? 10 : 1;
export const REVALIDATE = 1 * 60 * 60;
export const REVALIDATE_FAILURE = 1 * 60;
export const FACEBOOK_APP_ID = IS_DEVELOPMENT
	? '804579714840682'
	: '2085245451868293';
export const GOOGLE_CLIENT_ID =
	'555720614796-29k08to8g49c25mq6smacl116ps06m1c.apps.googleusercontent.com';

export const BIBLE_BOOKS = [
	'Genesis',
	'Exodus',
	'Leviticus',
	'Numbers',
	'Deuteronomy',
	'Joshua',
	'Judges',
	'Ruth',
	'1 Samuel',
	'2 Samuel',
	'1 Kings',
	'2 Kings',
	'1 Chronicles',
	'2 Chronicles',
	'Ezra',
	'Nehemiah',
	'Esther',
	'Job',
	'Psalms',
	'Proverbs',
	'Ecclesiastes',
	'Song of Solomon',
	'Isaiah',
	'Jeremiah',
	'Lamentations',
	'Ezekiel',
	'Daniel',
	'Hosea',
	'Joel',
	'Amos',
	'Obadiah',
	'Jonah',
	'Micah',
	'Nahum',
	'Habakkuk',
	'Zephaniah',
	'Haggai',
	'Zechariah',
	'Malachi',
	'Matthew',
	'Mark',
	'Luke',
	'John',
	'Acts',
	'Romans',
	'1 Corinthians',
	'2 Corinthians',
	'Galatians',
	'Ephesians',
	'Philippians',
	'Colossians',
	'1 Thessalonians',
	'2 Thessalonians',
	'1 Timothy',
	'2 Timothy',
	'Titus',
	'Philemon',
	'Hebrews',
	'James',
	'1 Peter',
	'2 Peter',
	'1 John',
	'2 John',
	'3 John',
	'Jude',
	'Revelation',
];

export enum BaseColors {
	WHITE = 'white',
	CREAM = 'cream',
	RED = 'red',
	DARK = 'dark',
	SALMON = 'salmon',
	LIGHT_TONE = 'lightTone',
	MID_TONE = 'midTone',
	BIBLE_B = 'bibleB',
	BIBLE_H = 'bibleH',
	BOOK_B = 'bookB',
	BOOK_H = 'bookH',
	SONG_B = 'songB',
	SONG_H = 'songH',
	STORY_B = 'storyB',
	STORY_H = 'storyH',
	TOPIC_B = 'topicB',
	PLAYLIST_H = 'playlistH',
	PLAYLIST_B = 'playlistB',
	SMART_PLAYLIST_H = 'smartPlaylistH',
}
