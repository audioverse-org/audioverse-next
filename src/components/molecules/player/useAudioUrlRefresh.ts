import { useEffect,useState } from 'react';

import { FCBH_VERSIONS } from '~services/bibles/fcbh/fetchFcbhBibles';
import { fetchFcbhChapterMediaUrl } from '~services/bibles/fcbh/fetchFcbhChapterMediaUrl';
import { RecordingContentType } from '~src/__generated__/graphql';

import { PlayerFragment } from './__generated__/index';

export function useAudioUrlRefresh(recording: PlayerFragment): string {
	const [audioUrl, setAudioUrl] = useState(
		recording.audioFiles?.[0]?.url ?? '',
	);

	useEffect(() => {
		// Set the default audio URL on recording changes
		const initialUrl = recording.audioFiles?.[0]?.url ?? '';
		setAudioUrl(initialUrl);

		// Only refresh URL for FCBH Bible chapters
		if (
			recording.recordingContentType === RecordingContentType.BibleChapter &&
			recording.collection &&
			FCBH_VERSIONS.some((v) => v.id === recording.collection?.id)
		) {
			// Extract version ID and book info from the canonical path (e.g. /en/bibles/ENGKJV2/Genesis/1)
			const pathParts = recording.canonicalPath.split('/');
			if (pathParts.length < 6) {
				console.error(
					'Failed to refresh FCBH URL: Invalid canonical path format',
				);
				return;
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
				return;
			}

			const testament = bookId === 'Genesis' ? 'OT' : 'NT'; // Simplified testament logic

			// Capture the current recording id to prevent stale updates
			const currentRecordingId = recording.id;

			fetchFcbhChapterMediaUrl(versionId, testament, bookId, chapterNumber)
				.then((freshUrl: string) => {
					if (!freshUrl) {
						console.error(
							'Failed to refresh FCBH URL: No URL returned from API',
						);
						return;
					}

					// Use functional update to compare with the current value and avoid unnecessary re-renders
					setAudioUrl((prevUrl) => {
						// If the recording has changed since the fetch started, abort the update
						if (recording.id !== currentRecordingId) {
							console.debug('Skipping stale FCBH URL update');
							return prevUrl;
						}
						// Only update if the fetched url is valid and different (avoiding feedback loop with videojs)
						if (freshUrl !== prevUrl) {
							return freshUrl;
						}
						return prevUrl;
					});
				})
				.catch((err: Error) => {
					console.error('Failed to refresh FCBH URL:', err?.message || err);
				});
		}
	}, [recording.id, recording.canonicalPath, recording.recordingContentType, recording.collection, recording.audioFiles]);

	return audioUrl;
}
