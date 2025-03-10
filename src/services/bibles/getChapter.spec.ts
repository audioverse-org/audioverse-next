import { fetchApi } from '~lib/api/fetchApi';
import root from '~src/lib/routes';

import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
import getChapter from './getChapter';
import fetchChapterText from './graphql/fetchChapterText';
import { getGraphqlChapterId } from './graphql/getGraphqlChapterId';

jest.mock('./fcbh/fetchFcbhChapters');
jest.mock('./graphql/fetchChapterText');
jest.mock('./graphql/getGraphqlChapterId');

const chapterFixture = {
	id: 'graphql-123',
	title: 'Genesis 1',
	contentType: 'BIBLE_CHAPTER',
	duration: 123,
	isDownloadAllowed: true,
	shareUrl: 'https://example.com/share',
	recordingContentType: 'BIBLE_CHAPTER',
	collection: {
		id: '456',
		title: 'KJV',
		contentType: 'BIBLE_VERSION',
	},
	speakers: [],
	sponsor: { title: 'Example Sponsor' },
	sequence: null,
	audioFiles: [
		{
			url: 'https://example.com/audio.mp3',
			mimeType: 'audio/mpeg',
			filesize: '1MB',
			duration: 123,
		},
	],
};

describe('getChapter', () => {
	beforeEach(() => {
		jest.mocked(fetchFcbhChapters).mockResolvedValue([
			{
				id: 'GEN/1',
				number: 1,
				title: 'Genesis 1',
				duration: 123,
				url: 'https://example.com/audio.mp3',
				book_name: 'Genesis',
				version_id: 'ENGKJV2',
				version_name: 'King James Version',
			},
		]);

		jest.mocked(fetchChapterText).mockResolvedValue('In the beginning...');

		jest.mocked(getGraphqlChapterId).mockResolvedValue('graphql-123');

		jest.mocked(fetchApi).mockResolvedValue({
			recording: chapterFixture,
		});
	});

	it('looks up book case insensitively', async () => {
		const result = await getChapter('ENGKJV2', 'gen', 1);

		expect(result).toBeDefined();
		expect(result?.id).toBe('GEN/1');
	});

	it('sets canonicalPath using the routes format for GraphQL chapters', async () => {
		jest.mocked(fetchFcbhChapters).mockRejectedValue(new Error('Not found'));

		const result = await getChapter('456', 'GEN', 1);

		const expectedPath = root
			.lang('en')
			.bibles.versionId('456')
			.fcbhId('GEN')
			.chapterNumber(1)
			.get();

		expect(result?.canonicalPath).toBe(expectedPath);
	});
});
