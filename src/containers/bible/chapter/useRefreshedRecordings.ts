import { useEffect, useState } from 'react';

import { RecordingContentType } from '~src/__generated__/graphql';
import isServerSide from '~src/lib/isServerSide';
import { FCBH_VERSIONS } from '~src/services/bibles/constants';

import { RefreshableFragment } from './__generated__/useRefreshedRecordings';
import { getRefreshedUrl } from './getRefreshedUrl';

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
		if (isServerSide()) {
			return;
		}

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
