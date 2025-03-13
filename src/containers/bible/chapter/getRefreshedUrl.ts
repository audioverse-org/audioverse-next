import { fetchFcbhChapterMediaUrl } from '~src/services/bibles/fcbh/fetchFcbhChapterMediaUrl';

import { RefreshableFragment } from './__generated__/useRefreshedRecordings';

export async function getRefreshedUrl(
	recording: RefreshableFragment,
): Promise<string> {
	const initialUrl = recording.audioFiles?.[0]?.url ?? '';
	try {
		const [filesetId, bookId, chapterNumber] = recording.id
			.toString()
			.split('/');

		const freshUrl = await fetchFcbhChapterMediaUrl(
			filesetId,
			bookId,
			Number(chapterNumber),
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
