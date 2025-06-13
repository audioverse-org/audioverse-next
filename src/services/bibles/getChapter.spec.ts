import { fetchApi } from '~lib/api/fetchApi';
import root from '~src/lib/routes';

import { getBibleRelatedTeachings } from './__generated__/getRelatedTeachings';
import getChapter from './getChapter';
import fetchChapterText from './graphql/fetchChapterText';
import { getGraphqlChapterId } from './graphql/getGraphqlChapterId';

jest.mock('./graphql/fetchChapterText');
jest.mock('./graphql/getGraphqlChapterId');
jest.mock('./__generated__/getRelatedTeachings');

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
	sequencePreviousRecording: {
		canonicalPath: 'graphql_previous',
	},
	sequenceNextRecording: {
		canonicalPath: 'graphql_next',
	},
};

describe('getChapter', () => {
	beforeEach(() => {
		jest.mocked(fetchChapterText).mockResolvedValue('In the beginning...');

		jest.mocked(getGraphqlChapterId).mockResolvedValue('graphql-123');

		jest.mocked(fetchApi).mockResolvedValue({
			recording: chapterFixture,
		});

		jest.mocked(getBibleRelatedTeachings).mockResolvedValue({
			recordings: {
				nodes: [],
			},
		});
	});

	it('looks up book case insensitively', async () => {
		const result = await getChapter('ENGKJV2', 'gen', 1);

		expect(result).toBeDefined();
		expect(result?.id).toBe('ENGKJVO2DA/GEN/1');
	});

	it('sets canonicalPath using the routes format for GraphQL chapters', async () => {
		const result = await getChapter('456', 'GEN', 1);

		const expectedPath = root
			.lang('en')
			.bibles.versionId('456')
			.fcbhId('GEN')
			.chapterNumber(1)
			.get();

		expect(result?.canonicalPath).toBe(expectedPath);
	});

	it('sets chapter text', async () => {
		jest.mocked(fetchChapterText).mockResolvedValue('In the beginning...');

		const result = await getChapter('ENGKJV2', 'gen', 1);

		expect(result?.transcript?.text).toBe('In the beginning...');
	});

	it('returns FCBH chapter with audio files', async () => {
		const result = await getChapter('ENGKJV2', 'gen', 1);

		expect(result?.audioFiles).toBeDefined();
		expect(result?.audioFiles?.length).toBe(1);
	});

	it('sets sequencePreviousRecording and sequenceNextRecording', async () => {
		const result = await getChapter('ENGKJV2', 'GEN', 2);

		expect(result?.sequencePreviousRecording).toBeTruthy();
		expect(result?.sequenceNextRecording).toBeTruthy();
	});

	it('does not set sequencePreviousRecording for the first chapter', async () => {
		const result = await getChapter('ENGKJV2', 'GEN', 1);

		expect(result?.sequencePreviousRecording).toBeNull();
	});

	it('does not set sequenceNextRecording for the last chapter', async () => {
		const result = await getChapter('ENGKJV2', 'GEN', 50);

		expect(result?.sequenceNextRecording).toBeNull();
	});

	it('sets sequencePreviousRecording and sequenceNextRecording for a GraphQL chapter', async () => {
		const result = await getChapter('456', 'GEN', 2);

		expect(result?.sequencePreviousRecording).toBeTruthy();
		expect(result?.sequenceNextRecording).toBeTruthy();
	});

	it('does not set sequencePreviousRecording if GraphQL chapter is first chapter', async () => {
		const result = await getChapter('456', 'GEN', 1);

		expect(result?.sequencePreviousRecording).toBeNull();
	});

	it('does not set sequenceNextRecording if GraphQL chapter is last chapter', async () => {
		jest.mocked(fetchApi).mockResolvedValue({
			recording: {
				...chapterFixture,
				sequenceNextRecording: null,
			},
		});

		const result = await getChapter('456', 'GEN', 50);

		expect(result?.sequenceNextRecording).toBeNull();
	});
});
