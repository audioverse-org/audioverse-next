import { fetchApi } from '~lib/api/fetchApi';
import root from '~src/lib/routes';

import { GetGraphqlChapterDocument } from './__generated__/getChapter';
import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
import getChapter from './getChapter';
import fetchChapterText from './graphql/fetchChapterText';

jest.mock('./fcbh/fetchFcbhChapters');
jest.mock('./graphql/fetchChapterText');

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
	});

	it('looks up book case insensitively', async () => {
		const result = await getChapter('ENGKJV2', 'GENESIS', 1);

		expect(result).toBeDefined();
		expect(result?.id).toBe('GEN/1');
	});

	it('converts book name to title case', async () => {
		jest.mocked(fetchFcbhChapters).mockRejectedValue(new Error('Not found'));

		await getChapter('ENGKJV2', 'genesis', 1);

		expect(fetchApi).toHaveBeenCalledWith(
			GetGraphqlChapterDocument,
			expect.objectContaining({
				variables: expect.objectContaining({
					titleSearch: expect.stringContaining('Genesis'),
				}),
			}),
		);
	});

	it('sets canonicalPath using the routes format for GraphQL chapters', async () => {
		jest.mocked(fetchFcbhChapters).mockRejectedValue(new Error('Not found'));

		jest.mocked(fetchApi).mockResolvedValueOnce({
			recordings: {
				nodes: [
					{
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
						videoFiles: [],
						videoStreams: [],
						transcript: { text: 'In the beginning...' },
						videoDownloads: [],
						audioDownloads: [],
						sequencePreviousRecording: null,
						sequenceNextRecording: null,
					},
				],
			},
		});

		const result = await getChapter('456', 'Genesis', 1);

		const expectedPath = root
			.lang('en')
			.bibles.versionId('456')
			.bookName('Genesis')
			.chapterNumber(1)
			.get();

		expect(result?.canonicalPath).toBe(expectedPath);
	});
});
