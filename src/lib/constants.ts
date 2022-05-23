import { ResolvedIntlConfig } from 'react-intl';

import { Language } from './generated/graphql';

export const ENTRIES_PER_PAGE = 12;

export interface LanguageConfiguration {
	base_url: string;
	display_name: string;
	legacy_base_url: string;
	messages: ResolvedIntlConfig['messages'];
}

export type SupportedLanguages = Language;

export type LanguageConfigurations = {
	[key in SupportedLanguages]: LanguageConfiguration;
};

export const LANGUAGES: LanguageConfigurations = {
	ENGLISH: {
		base_url: 'en',
		display_name: 'English',
		legacy_base_url: 'english',
		messages: require(`../../public/compiled-lang/en.json`),
	},
	SPANISH: {
		base_url: 'es',
		display_name: 'Español',
		legacy_base_url: 'espanol',
		messages: require(`../../public/compiled-lang/es.json`),
	},
	FRENCH: {
		base_url: 'fr',
		display_name: 'Français',
		legacy_base_url: 'francais',
		messages: require(`../../public/compiled-lang/fr.json`),
	},
	GERMAN: {
		base_url: 'de',
		display_name: 'Deutsch',
		legacy_base_url: 'deutsch',
		messages: require(`../../public/compiled-lang/de.json`),
	},
	CHINESE: {
		base_url: 'zh',
		display_name: '中文',
		legacy_base_url: 'zhongwen',
		messages: require(`../../public/compiled-lang/zh.json`),
	},
	JAPANESE: {
		base_url: 'ja',
		display_name: '日本語',
		legacy_base_url: 'japanese',
		messages: require(`../../public/compiled-lang/ja.json`),
	},
	RUSSIAN: {
		base_url: 'ru',
		display_name: 'Русский',
		legacy_base_url: 'russian',
		messages: require(`../../public/compiled-lang/ru.json`),
	},
	NORDIC: {
		base_url: 'no',
		display_name: 'Scandinavia',
		legacy_base_url: 'no',
		messages: require(`../../public/compiled-lang/no.json`),
	},
};

export const IS_DEVELOPMENT =
	process.env.NODE_ENV === 'development' ||
	process.env.ENV_OVERRIDE === 'development';
export const IS_PRODUCTION_DEPLOYMENT = process.env.VERCEL_ENV === 'production';
export const DETAIL_PRERENDER_LIMIT = IS_PRODUCTION_DEPLOYMENT ? 25 : 10;
export const LIST_PRERENDER_LIMIT = IS_PRODUCTION_DEPLOYMENT ? 10 : 2;
export const REVALIDATE = 1 * 60 * 60;
export const REVALIDATE_FAILURE = 1 * 60;
export const FACEBOOK_APP_ID = IS_DEVELOPMENT
	? '484026402743558'
	: '1435507090029440';
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
