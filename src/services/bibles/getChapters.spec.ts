import { when } from 'jest-when';

import { fetchApi } from '~lib/api/fetchApi';
import root from '~src/lib/routes';

import { GetGraphqlChaptersDocument } from './__generated__/getChapters';
import fetchResponse from './fcbh/fetchResponse';
import getChapters from './getChapters';
import { getGraphqlBookId } from './graphql/getGraphqlBookId';

jest.mock('./graphql/getGraphqlBookId');

describe('getChapters', () => {
	beforeEach(() => {
		when(fetchApi)
			.calledWith(GetGraphqlChaptersDocument, expect.anything())
			.mockResolvedValue({
				recordings: {
					nodes: [],
				},
			});
	});

	it('returns book chapters case insensitive', async () => {
		const result = await getChapters('ENGKJV2', 'gen');

		expect(result?.length).toBeGreaterThan(0);
	});

	it('sets canonicalPath for GraphQL-retrieved chapters', async () => {
		jest.mocked(fetchResponse).mockRejectedValue(new Error('Not found'));
		jest.mocked(getGraphqlBookId).mockResolvedValue('graphql-123');

		when(fetchApi)
			.calledWith(GetGraphqlChaptersDocument, expect.anything())
			.mockResolvedValue({
				recordings: {
					nodes: [
						{
							id: 'recording-123',
							title: 'Genesis 1',
							canonicalPath: '/old/path',
							duration: 123,
							recordingContentType: 'BIBLE_CHAPTER',
							collection: {
								id: '456',
								title: 'KJV',
								contentType: 'BIBLE_VERSION',
							},
							speakers: [],
							sponsor: { title: 'Example Sponsor' },
							sequence: null,
							sequenceIndex: null,
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
						},
					],
				},
			});

		const result = await getChapters('456', 'GEN');
		const chapter = result?.[0];

		const expectedPath = root
			.lang('en')
			.bibles.versionId('456')
			.fcbhId('GEN')
			.chapterNumber(1)
			.get();

		expect(chapter?.canonicalPath).toBe(expectedPath);
	});

	it('sorts chapters by number numerically', async () => {
		jest.mocked(fetchResponse).mockRejectedValue(new Error('Not found'));
		jest.mocked(getGraphqlBookId).mockResolvedValue('graphql-123');

		when(fetchApi)
			.calledWith(GetGraphqlChaptersDocument, expect.anything())
			.mockResolvedValue({
				recordings: {
					nodes: [
						{
							id: 'recording-123',
							title: 'Genesis 10',
						},
						{
							id: 'recording-456',
							title: 'Genesis 2',
						},
					],
				},
			});

		const result = await getChapters('456', 'GEN');
		const chapter = result?.[0];

		expect(chapter?.title).toBe('Genesis 2');
	});
});
