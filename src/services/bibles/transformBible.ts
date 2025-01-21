import {
	CollectionContentType,
	RecordingContentType,
} from '~src/__generated__/graphql';
import root from '~src/lib/routes';

import { BOOK_ID_MAP } from './constants';
import { ApiBible } from './getApiBible';
import { getBibleBookChapters } from './getBibleBookChapters';
import { IBibleBookChapter, IBibleVersion } from './types';

type ApiBook = NonNullable<ApiBible['sequences']['nodes']>[0];
type ApiChapter = NonNullable<ApiBook['recordings']['nodes']>[0];

const makeCanonicalPath = (bookId: string, n: number) =>
	root.lang('en').bibles.bookId(bookId).chapterNumber(n).get();

export default async function transformBible(
	languageRoute: string,
	bible: IBibleVersion,
): Promise<ApiBible> {
	const books = Object.keys(BOOK_ID_MAP).map(
		async (bookId, i): Promise<ApiBook> => {
			const testament = i < 39 ? 'OT' : 'NT';
			const bbChapters = await getBibleBookChapters(
				bible.id,
				testament,
				bookId,
			);
			const title = bbChapters[0].book_name;

			if (!title) {
				console.log({ bible, testament, bookId, bbChapters });
				throw new Error(
					`Could not determine book title: ${bible.id} ${testament} ${bookId}`,
				);
			}

			const chapters = bbChapters.map(
				(bbChapter: IBibleBookChapter): ApiChapter => {
					const urlPathnameComponents =
						new URL(bbChapter.url).pathname.match(/(\d+)_([^_]+)/i) || [];
					const fakeAlias = `KJV_${urlPathnameComponents[2]}_${urlPathnameComponents[1]}`;
					const canonicalPath = root
						.lang(languageRoute)
						.bibles.versionId(bible.id)
						.bookId(bookId)
						.chapterNumber(bbChapter.number)
						.get();
					const canonicalUrl = `https://www.audioverse.org${canonicalPath}`;

					return {
						id: bbChapter.id,
						title: bbChapter.title,
						canonicalPath,
						canonicalUrl,
						collection: {
							id: bible.id,
							title: bible.title,
							canonicalPath: root
								.lang(languageRoute)
								.bibles.versionId(bible.id)
								.get(),
							contentType: CollectionContentType.BibleVersion,
						},
						duration: bbChapter.duration,
						contentType: RecordingContentType.BibleChapter,
						recordingContentType: RecordingContentType.BibleChapter,
						sequencePreviousRecording:
							bbChapter.number > 1
								? {
										canonicalPath: makeCanonicalPath(
											title,
											bbChapter.number - 1,
										),
									}
								: null,
						sequenceNextRecording:
							bbChapter.number < bbChapters.length
								? {
										canonicalPath: makeCanonicalPath(
											title,
											bbChapter.number + 1,
										),
									}
								: null,
						speakers: [],
						sponsor: {
							title: 'Faith Comes By Hearing',
							canonicalPath: 'htts://www.faithcomesbyhearing.com/',
						},
						sequence: null,
						audioFiles: [
							{
								url: bbChapter.url,
								mimeType: 'audio/mpeg',
								filesize: 'unknown',
								duration: bbChapter.duration,
								logUrl: `https://www.audioverse.org/en/download/audiobible/${fakeAlias}/filename.mp3`,
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
							} as any,
						],
						videoFiles: [],
						videoStreams: [],
						description: '',
						recordingDate: null,
						sequenceIndex: null,
						copyrightYear: null,
						isDownloadAllowed: false,
						shareUrl: canonicalUrl,
						writers: [],
						attachments: [],
						imageWithFallback: {
							url: '',
						},
						recordingTags: {
							nodes: [],
						},
						transcript: {
							text: bbChapter.text,
						},
						distributionAgreement: null,
						videoDownloads: [],
						audioDownloads: [],
					};
				},
			);

			return {
				id: bookId,
				title,
				recordings: {
					nodes: chapters,
				},
			};
		},
	);
	return {
		...bible,
		description: bible.description || '',
		sequences: {
			nodes: await Promise.all(books),
		},
	};
}
