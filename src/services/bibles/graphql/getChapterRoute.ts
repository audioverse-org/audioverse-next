import root from '~src/lib/routes';

import getBookMeta from '../getBookMeta';
import { parseBookName, parseChapterNumber } from '../utils';
import { getRecordingRoute } from './__generated__/getChapterRoute';

export default async function getChapterRoute(
	recordingId: string,
): Promise<string> {
	const result = await getRecordingRoute({ recordingId });

	const { recording } = result;

	if (!recording) {
		throw new Error(`Recording not found: ${recordingId}`);
	}

	const versionId = recording.collection?.id;

	if (!versionId) {
		throw new Error(`Version not found for recording: ${recordingId}`);
	}

	const bookName = parseBookName(recording.title);
	const bookMeta = getBookMeta(bookName);

	if (!bookMeta) {
		throw new Error(`Book not found: ${bookName}`);
	}

	const bookId = bookMeta.fcbhId;
	const chapterNumber = parseChapterNumber(recording.title);

	return root
		.lang('en')
		.bibles.versionId(versionId)
		.fcbhId(bookId)
		.chapterNumber(chapterNumber)
		.get();
}
