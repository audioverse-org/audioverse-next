import { IBibleBook } from '../types';
import { transformChapterFull } from './chapterTransforms';

describe('transformChapterFull', () => {
	it('capitalizes first letter of each word in title', () => {
		const input: IBibleBook = {
			bible: {
				abbreviation: 'SongOfSolomon',
			},
			book_id: 'ENGKJV2/SNG',
			name: 'Song of Solomon',
			name_short: 'Song of Solomon',
			chapters: [],
			book_seq: '',
			testament: 'OT',
		};

		const chapter = transformChapterFull(input, 1);

		expect(chapter.title).toBe('Song Of Solomon 1');
	});
});
