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
	it('capitalizes first letter of each word in title', async () => {
		const chapter = await transformChapterFull(fcbhBookFixture, 1);

		expect(chapter.title).toBe('Song Of Solomon 1');
	});

	it('includes fileset id in id', async () => {
		const chapter = await transformChapterFull(fcbhBookFixture, 1);

		expect(chapter.id).toBe('ENGKJVO2DA/SNG/1');
	});

	it('sets canonicalPath', async () => {
		const chapter = await transformChapterFull(fcbhBookFixture, 1);

		expect(chapter.canonicalPath).toBe('/en/bibles/ENGKJV2/SNG/1');
	});

	it('sets logUrl in correct format', async () => {
		const chapter = await transformChapterFull(fcbhBookFixture, 1);

		expect(chapter.audioFiles[0].logUrl).toMatch(
			/^https:\/\/www\.audioverse\.org\/en\/download\/audiobible\/KJV_[^_]+_\d+\/filename\.mp3$/,
		);
	});

	it('encodes book name in log url', async () => {
		const chapter = await transformChapterFull(fcbhBookFixture, 1);

		expect(chapter.audioFiles[0].logUrl).toMatch(
			/^https:\/\/www\.audioverse\.org\/en\/download\/audiobible\/KJV_SongOfSolomon_01\/filename\.mp3$/,
		);
	});

	it('does not break for three-digit chapter numbers', async () => {
		const chapter = await transformChapterFull(fcbhBookFixture, 100);

		expect(chapter.audioFiles[0].logUrl).toMatch(
			/^https:\/\/www\.audioverse\.org\/en\/download\/audiobible\/KJV_SongOfSolomon_100\/filename\.mp3$/,
		);
	});
});

describe('transformChapterPartial', () => {
	it('includes sequence title', async () => {
		const chapter = await transformChapterPartial(fcbhBookFixture, 1);

		expect(chapter.sequence?.title).toBe('Song Of Solomon');
	});

	it('includes fileset id in id', async () => {
		const chapter = await transformChapterPartial(fcbhBookFixture, 1);

		expect(chapter.id).toBe('ENGKJVO2DA/SNG/1');
	});
});
