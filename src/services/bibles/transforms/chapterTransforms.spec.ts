import { IBibleBook } from '../types';
import {
	transformChapterFull,
	transformChapterPartial,
} from './chapterTransforms';

const fcbhBookFixture: IBibleBook = {
	bible: {
		abbreviation: 'KJV',
	},
	book_id: 'SNG',
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

	it('includes fileset id in id', () => {
		const chapter = transformChapterFull(fcbhBookFixture, 1);

		expect(chapter.id).toBe('ENGKJVO2DA/SNG/1');
	});

	it('sets canonicalPath', () => {
		const chapter = transformChapterFull(fcbhBookFixture, 1);

		expect(chapter.canonicalPath).toBe('/en/bibles/ENGKJV2/SNG/1');
	});
});

describe('transformChapterPartial', () => {
	it('includes sequence title', () => {
		const chapter = transformChapterPartial(fcbhBookFixture, 1);

		expect(chapter.sequence?.title).toBe('Song Of Solomon');
	});

	it('includes fileset id in id', () => {
		const chapter = transformChapterPartial(fcbhBookFixture, 1);

		expect(chapter.id).toBe('ENGKJVO2DA/SNG/1');
	});
});
