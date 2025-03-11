import { useEffect, useState } from 'react';

import { fetchFcbhChapterMediaUrl } from '~services/bibles/fcbh/fetchFcbhChapterMediaUrl';
import { RecordingContentType } from '~src/__generated__/graphql';
import {
	BIBLE_BOOK_METAS,
	FCBH_VERSIONS,
} from '~src/services/bibles/constants';

import { RefreshableFragment } from './__generated__/useAudioUrlRefresh';

function shouldRefreshRecording(recording: RefreshableFragment): boolean {
	const isBibleChapter =
		recording.recordingContentType === RecordingContentType.BibleChapter;
	const hasCollection = recording.collection !== null;
	const isFcbhVersion = FCBH_VERSIONS.some(
		(v) => v.id === recording.collection?.id,
	);

	return isBibleChapter && hasCollection && isFcbhVersion;
}

function shouldRefreshRecordings(recordings: RefreshableFragment[]): boolean {
	return recordings.some((r) => shouldRefreshRecording(r));
}

async function getRefreshedUrl(
	recording: RefreshableFragment,
): Promise<string> {
	const initialUrl = recording.audioFiles?.[0]?.url ?? '';
	const pathParts = recording.canonicalPath.split('/');

	if (pathParts.length < 6) {
		console.error('Failed to refresh FCBH URL: Invalid canonical path format');
		return initialUrl;
	}

	const versionId = pathParts[3];
	const bookId = pathParts[4];
	const chapterNumber = Number(pathParts[5]);

	if (!versionId || !bookId || isNaN(chapterNumber)) {
		console.error(
			'Failed to refresh FCBH URL: Missing or invalid path parameters',
			{
				versionId,
				bookId,
				chapterNumber,
			},
		);
		return initialUrl;
	}

	const testament = BIBLE_BOOK_METAS.find(
		(b) => b.fcbhId === bookId.toUpperCase(),
	)?.testament;

	if (!testament) {
		console.error('Failed to refresh FCBH URL: Invalid book ID', bookId);
		return initialUrl;
	}

	try {
		const freshUrl = await fetchFcbhChapterMediaUrl(
			versionId,
			testament,
			bookId,
			chapterNumber,
		);

		if (!freshUrl) {
			console.error('Failed to refresh FCBH URL: No URL returned from API');
			return initialUrl;
		}

		return freshUrl;
	} catch (err: unknown) {
		const m = err instanceof Error ? err.message : String(err);
		console.error('Failed to refresh FCBH URL:', m);
		return initialUrl;
	}
}

async function getRefreshedRecordings<T extends RefreshableFragment>(
	recordings: T[],
): Promise<T[]> {
	return Promise.all(
		recordings.map(async (r) => {
			return {
				...r,
				audioFiles: [
					{
						url: await getRefreshedUrl(r),
						mimeType: 'audio/mpeg',
						filesize: 'unknown',
						duration: 0,
					},
				],
			};
		}),
	);
}

export function useRefreshedRecordings<T extends RefreshableFragment>(
	recordings: T[] | undefined,
): T[] | null {
	const [refreshed, setRefreshed] = useState<T[]>();

	useEffect(() => {
		if (!recordings) {
			return;
		}

		if (!shouldRefreshRecordings(recordings)) {
			setRefreshed(recordings);
			return;
		}

		getRefreshedRecordings(recordings).then((v) => setRefreshed(v));
	}, [recordings]);

	return refreshed ?? null;
}
