import { useEffect, useState } from 'react';

import { fetchFcbhChapterMediaUrl } from '~services/bibles/fcbh/fetchFcbhChapterMediaUrl';
import { RecordingContentType } from '~src/__generated__/graphql';
import {
	BIBLE_BOOK_METAS,
	FCBH_VERSIONS,
} from '~src/services/bibles/constants';

import { PlayerFragment } from './__generated__/index';

export function useAudioUrlRefresh(recording: PlayerFragment): string {
	const [audioUrl, setAudioUrl] = useState(
		recording.audioFiles?.[0]?.url ?? '',
	);

	useEffect(() => {
		(async () => {
			const initialUrl = recording.audioFiles?.[0]?.url ?? '';
			setAudioUrl((prev) => (prev !== initialUrl ? initialUrl : prev));

			if (
				recording.recordingContentType === RecordingContentType.BibleChapter &&
				recording.collection &&
				FCBH_VERSIONS.some((v) => v.id === recording.collection?.id)
			) {
				const pathParts = recording.canonicalPath.split('/');
				if (pathParts.length < 6) {
					console.error(
						'Failed to refresh FCBH URL: Invalid canonical path format',
					);
					return;
				}

				const versionId = pathParts[3];
				const bookName = pathParts[4];
				const chapterNumber = Number(pathParts[5]);

				if (!versionId || !bookName || isNaN(chapterNumber)) {
					console.error(
						'Failed to refresh FCBH URL: Missing or invalid path parameters',
						{
							versionId,
							bookId: bookName,
							chapterNumber,
						},
					);
					return;
				}

				const testament = BIBLE_BOOK_METAS.find(
					(b) => b.fullName.toLowerCase() === bookName.toLowerCase(),
				)?.testament;

				if (!testament) {
					console.error(
						'Failed to refresh FCBH URL: Invalid book ID',
						bookName,
					);
					return;
				}

				const currentRecordingId = recording.id;

				try {
					const freshUrl = await fetchFcbhChapterMediaUrl(
						versionId,
						testament,
						bookName,
						chapterNumber,
					);

					if (!freshUrl) {
						console.error(
							'Failed to refresh FCBH URL: No URL returned from API',
						);
						return;
					}

					setAudioUrl((prevUrl) => {
						if (recording.id !== currentRecordingId) {
							console.debug('Skipping stale FCBH URL update');
							return prevUrl;
						}
						if (freshUrl !== prevUrl) {
							return freshUrl;
						}
						return prevUrl;
					});
				} catch (err: unknown) {
					const m = err instanceof Error ? err.message : String(err);
					console.error('Failed to refresh FCBH URL:', m);
				}
			}
		})();
	}, [
		recording.id,
		recording.canonicalPath,
		recording.recordingContentType,
		recording.collection,
		recording.audioFiles,
	]);

	return audioUrl;
}
