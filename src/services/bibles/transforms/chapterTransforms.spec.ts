import { IBibleBookChapter } from '../types';
import { transformChapterFull } from './chapterTransforms';

describe('transformChapterFull', () => {
	it('capitalizes first letter of each word in title', () => {
		const input: IBibleBookChapter = {
			id: '1',
			number: 1,
			title: 'the_chapter_title',
			duration: 100,
			book_name: 'Song of Solomon',
			version_id: '1',
			version_name: 'Version 1',
			text: 'the_chapter_text',
		};

		const chapter = transformChapterFull(input);

		expect(chapter.title).toBe('Song Of Solomon 1');
	});
});
