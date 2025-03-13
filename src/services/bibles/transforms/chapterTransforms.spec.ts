import { IBibleBook } from '../types';
import {
	transformChapterFull,
	transformChapterPartial,
} from './chapterTransforms';

const fcbhBookFixture: IBibleBook = {
	bible: {
		abbreviation: 'KJV',
	},
	book_id: 'ENGKJV2/SNG',
	name: 'Song of Solomon',
	name_short: 'Song of Solomon',
	chapters: [],
	book_seq: '',
	testament: 'OT',
};

describe('transformChapterFull', () => {
	it('capitalizes first letter of each word in title', () => {
		const chapter = transformChapterFull(fcbhBookFixture, 1);

		expect(chapter.title).toBe('Song Of Solomon 1');
	});
});

describe('transformChapterPartial', () => {
	it('includes sequence title', () => {
		const chapter = transformChapterPartial(fcbhBookFixture, 1);

		expect(chapter.sequence?.title).toBe('Song Of Solomon');
	});
});
