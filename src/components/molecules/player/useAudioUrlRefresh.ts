import { useState } from 'react';

import { PlayerFragment } from './__generated__/index';

export function useAudioUrlRefresh(recording: PlayerFragment): string {
	const [audioUrl] = useState(recording.audioFiles?.[0]?.url ?? '');

	// TODO: Re-enable

	// useEffect(() => {
	// 	// Reset URL when recording changes
	// 	setAudioUrl(recording.audioFiles[0]?.url);

	// 	// Only refresh URL for FCBH bible chapters
	// 	if (
	// 		recording.recordingContentType === RecordingContentType.BibleChapter &&
	// 		recording.collection &&
	// 		FCBH_VERSIONS.some((v) => v.id === recording.collection.id)
	// 	) {
	// 		// Extract version ID and book info from the canonical path
	// 		// e.g. /en/bibles/ENGKJV2/Genesis/1
	// 		const pathParts = recording.canonicalPath.split('/');
	// 		const versionId = pathParts[3];
	// 		const bookId = pathParts[4];
	// 		const chapterNumber = Number(pathParts[5]);
	// 		const testament = bookId === 'Genesis' ? 'OT' : 'NT'; // This is a simplification - we should get actual testament

	// 		fetchFcbhChapterMediaUrl(versionId, testament, bookId, chapterNumber)
	// 			.then((freshUrl) => {
	// 				setAudioUrl(freshUrl);
	// 			})
	// 			.catch((err) => {
	// 				console.error('Failed to refresh FCBH media URL:', err);
	// 			});
	// 	}
	// }, [recording]);

	return audioUrl;
}
