import { act, renderHook, waitFor } from '@testing-library/react';

import { FCBH_VERSIONS } from '~services/bibles/fcbh/fetchFcbhBibles';
import { fetchFcbhChapterMediaUrl } from '~services/bibles/fcbh/fetchFcbhChapterMediaUrl';
import {
	CollectionContentType,
	RecordingContentType,
} from '~src/__generated__/graphql';
import loadControlledPromise from '~src/lib/test/loadControlledPromise';

import { PlayerFragment } from './__generated__';
import { useAudioUrlRefresh } from './useAudioUrlRefresh';

jest.mock('~src/services/bibles/fcbh/fetchFcbhChapterMediaUrl');

const mockFetchFcbhChapterMediaUrl = jest.mocked(fetchFcbhChapterMediaUrl);

const baseRecording = {
	id: '123',
	title: 'Test Recording',
	contentType: RecordingContentType.Sermon,
	duration: 100,
	isDownloadAllowed: true,
	shareUrl: 'share-url',
	recordingContentType: RecordingContentType.Sermon,
	canonicalPath: '/en/bibles/ENGKJV2/Genesis/1',
	speakers: [],
	sponsor: null,
	sequence: null,
	collection: null,
	videoFiles: [],
	videoStreams: [],
	videoDownloads: [],
	audioDownloads: [],
};

describe('useAudioUrlRefresh', () => {
	beforeEach(() => {
		mockFetchFcbhChapterMediaUrl.mockReset();
		mockFetchFcbhChapterMediaUrl.mockResolvedValue('refreshed-url');
	});

	it('returns initial audio URL', () => {
		const { result } = renderHook(() =>
			useAudioUrlRefresh({
				...baseRecording,
				audioFiles: [
					{
						url: 'initial-url',
						mimeType: 'audio/mp3',
						filesize: '1000',
						duration: 100,
					},
				],
			}),
		);

		expect(result.current).toBe('initial-url');
	});

	it('returns empty string if no audio files', () => {
		const { result } = renderHook(() =>
			useAudioUrlRefresh({
				...baseRecording,
				audioFiles: [],
			}),
		);

		expect(result.current).toBe('');
	});

	it('refreshes FCBH Bible chapter URLs', async () => {
		mockFetchFcbhChapterMediaUrl.mockResolvedValue('refreshed-url');

		const { result } = renderHook(() =>
			useAudioUrlRefresh({
				...baseRecording,
				recordingContentType: RecordingContentType.BibleChapter,
				canonicalPath: '/en/bibles/ENGKJV2/Genesis/1',
				collection: {
					id: FCBH_VERSIONS[0].id,
					title: 'King James Version',
					contentType: CollectionContentType.BibleVersion,
				},
				audioFiles: [
					{
						url: 'initial-url',
						mimeType: 'audio/mp3',
						filesize: '1000',
						duration: 100,
					},
				],
			}),
		);

		expect(result.current).toBe('initial-url');

		await waitFor(() => {
			expect(mockFetchFcbhChapterMediaUrl).toHaveBeenCalledWith(
				'ENGKJV2',
				'OT',
				'Genesis',
				1,
			);
		});
	});

	it('handles invalid canonical paths', () => {
		const consoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		const { result } = renderHook(() =>
			useAudioUrlRefresh({
				...baseRecording,
				recordingContentType: RecordingContentType.BibleChapter,
				canonicalPath: '/invalid/path',
				collection: {
					id: FCBH_VERSIONS[0].id,
					title: 'King James Version',
					contentType: CollectionContentType.BibleVersion,
				},
				audioFiles: [
					{
						url: 'initial-url',
						mimeType: 'audio/mp3',
						filesize: '1000',
						duration: 100,
					},
				],
			}),
		);

		expect(result.current).toBe('initial-url');
		expect(consoleError).toHaveBeenCalledWith(
			'Failed to refresh FCBH URL: Invalid canonical path format',
		);

		consoleError.mockRestore();
	});

	it('handles missing path parameters', () => {
		const consoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		const { result } = renderHook(() =>
			useAudioUrlRefresh({
				...baseRecording,
				recordingContentType: RecordingContentType.BibleChapter,
				canonicalPath: '/en/bibles///',
				collection: {
					id: FCBH_VERSIONS[0].id,
					title: 'King James Version',
					contentType: CollectionContentType.BibleVersion,
				},
				audioFiles: [
					{
						url: 'initial-url',
						mimeType: 'audio/mp3',
						filesize: '1000',
						duration: 100,
					},
				],
			}),
		);

		expect(result.current).toBe('initial-url');
		expect(consoleError).toHaveBeenCalledWith(
			'Failed to refresh FCBH URL: Missing or invalid path parameters',
			{
				versionId: '',
				bookId: '',
				chapterNumber: 0,
			},
		);

		consoleError.mockRestore();
	});

	it('handles API errors', async () => {
		const consoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		mockFetchFcbhChapterMediaUrl.mockRejectedValue(new Error('API Error'));

		const { result } = renderHook(() =>
			useAudioUrlRefresh({
				...baseRecording,
				recordingContentType: RecordingContentType.BibleChapter,
				canonicalPath: '/en/bibles/ENGKJV2/Genesis/1',
				collection: {
					id: FCBH_VERSIONS[0].id,
					title: 'King James Version',
					contentType: CollectionContentType.BibleVersion,
				},
				audioFiles: [
					{
						url: 'initial-url',
						mimeType: 'audio/mp3',
						filesize: '1000',
						duration: 100,
					},
				],
			}),
		);

		// Need to wait for the effect to run and error to be logged
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		expect(result.current).toBe('initial-url');
		expect(consoleError).toHaveBeenCalledWith(
			'Failed to refresh FCBH URL:',
			'API Error',
		);

		consoleError.mockRestore();
	});

	it('updates URL after successful refresh', async () => {
		const { resolve } = loadControlledPromise(mockFetchFcbhChapterMediaUrl);

		const recording: PlayerFragment = {
			...baseRecording,
			recordingContentType: RecordingContentType.BibleChapter,
			canonicalPath: '/en/bibles/ENGKJV2/Genesis/1',
			collection: {
				id: FCBH_VERSIONS[0].id,
				title: 'King James Version',
				contentType: CollectionContentType.BibleVersion,
			},
			audioFiles: [
				{
					url: 'initial-url',
					mimeType: 'audio/mp3',
					filesize: '1000',
					duration: 100,
				},
			],
		};

		const { result } = renderHook(() => useAudioUrlRefresh(recording));

		expect(result.current).toBe('initial-url');

		await act(async () => {
			resolve('refreshed-url');
		});

		await waitFor(() => {
			expect(result.current).toBe('refreshed-url');
		});
	});

	it('correctly determines the testament', async () => {
		const recording: PlayerFragment = {
			...baseRecording,
			recordingContentType: RecordingContentType.BibleChapter,
			canonicalPath: '/en/bibles/ENGKJV2/Exodus/1',
			collection: {
				id: FCBH_VERSIONS[0].id,
				title: 'King James Version',
				contentType: CollectionContentType.BibleVersion,
			},
			audioFiles: [
				{
					url: 'initial-url',
					mimeType: 'audio/mp3',
					filesize: '1000',
					duration: 100,
				},
			],
		};

		renderHook(() => useAudioUrlRefresh(recording));

		await waitFor(() => {
			expect(mockFetchFcbhChapterMediaUrl).toHaveBeenCalledWith(
				'ENGKJV2',
				'OT',
				'Exodus',
				1,
			);
		});
	});

	it('determines the testament case insentively', async () => {
		const recording: PlayerFragment = {
			...baseRecording,
			recordingContentType: RecordingContentType.BibleChapter,
			canonicalPath: '/en/bibles/ENGKJV2/exodus/1',
			collection: {
				id: FCBH_VERSIONS[0].id,
				title: 'King James Version',
				contentType: CollectionContentType.BibleVersion,
			},
			audioFiles: [
				{
					url: 'initial-url',
					mimeType: 'audio/mp3',
					filesize: '1000',
					duration: 100,
				},
			],
		};

		renderHook(() => useAudioUrlRefresh(recording));

		await waitFor(() => {
			expect(mockFetchFcbhChapterMediaUrl).toHaveBeenCalledWith(
				'ENGKJV2',
				'OT',
				'exodus',
				1,
			);
		});
	});
});
