import { FCBH_VERSIONS } from '../constants';
import { IBBBook } from '../types';
import {
	transformChapterFull,
	transformChapterPartial,
} from './chapterTransforms';

const versionId = FCBH_VERSIONS[0].id;

const fcbhBookFixture: IBBBook = {
	book_id: 'SNG',
	name: 'Song of Solomon',
	name_short: 'Song of Solomon',
	chapters: [],
	book_seq: '',
	testament: 'OT',
};

describe('transformChapterFull', () => {
	it('capitalizes first letter of each word in title', async () => {
		const chapter = await transformChapterFull(versionId, fcbhBookFixture, 1);

		expect(chapter.title).toBe('Song Of Solomon 1');
	});

	it('includes fileset id in id', async () => {
		const chapter = await transformChapterFull(versionId, fcbhBookFixture, 1);

		expect(chapter.id).toBe('ENGKJVO2DA/SNG/1');
	});

	it('sets canonicalPath', async () => {
		const chapter = await transformChapterFull(versionId, fcbhBookFixture, 1);

		expect(chapter.canonicalPath).toBe('/en/bibles/ENGKJV2/SNG/1');
	});

	it('sets logUrl in correct format', async () => {
		const chapter = await transformChapterFull(versionId, fcbhBookFixture, 1);

		expect(chapter.audioFiles[0].logUrl).toBe('/en/download/bible/6/SNG/1');
	});
});

describe('transformChapterPartial', () => {
	it('includes sequence title', async () => {
		const chapter = await transformChapterPartial(
			versionId,
			fcbhBookFixture,
			1,
		);

		expect(chapter.sequence?.title).toBe('Song Of Solomon');
	});

	it('includes fileset id in id', async () => {
		const chapter = await transformChapterPartial(
			versionId,
			fcbhBookFixture,
			1,
		);

		expect(chapter.id).toBe('ENGKJVO2DA/SNG/1');
	});
});
