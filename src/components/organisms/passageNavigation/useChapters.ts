import { useEffect, useMemo, useState } from 'react';

import {
	BIBLE_BOOK_METAS,
	FCBH_VERSIONS,
} from '~src/services/bibles/constants';
import getChapters from '~src/services/bibles/getChapters';

import { useBooksQuery, useChaptersQuery } from './__generated__/useChapters';

interface Chapter {
	id: string | number;
	title: string;
}

export default function useChapters(
	versionId: string | number,
	bookId: string,
): Chapter[] | undefined {
	const isFcbhVersion = useMemo(
		() => FCBH_VERSIONS.some((v) => v.id === versionId),
		[versionId],
	);

	const { data: booksData } = useBooksQuery(
		{
			collectionId: versionId,
		},
		{
			enabled: !isFcbhVersion,
		},
	);

	const sequenceId = useMemo(() => {
		if (isFcbhVersion) return;

		const bookName = BIBLE_BOOK_METAS.find(
			(b) => b.fcbhId === bookId,
		)?.fullName;

		if (!bookName) return;

		const sequences = booksData?.sequences.nodes;

		return sequences?.find((s) => s.title === bookName)?.id;
	}, [booksData, bookId, isFcbhVersion]);

	const { data: chaptersData } = useChaptersQuery(
		{
			sequenceId: sequenceId ?? '',
		},
		{
			enabled: !isFcbhVersion && !!sequenceId,
		},
	);

	const [chapters, setChapters] = useState<Chapter[]>();

	useEffect(() => {
		(async () => {
			if (!isFcbhVersion) {
				setChapters(chaptersData?.recordings.nodes || undefined);
				return;
			}

			const fcbhChapters = await getChapters(versionId.toString(), bookId);

			if (!fcbhChapters) return;

			setChapters(
				fcbhChapters.map((c) => ({
					id: c.id.toString(),
					title: c.title,
				})),
			);
		})();
	}, [bookId, chaptersData, isFcbhVersion, versionId]);

	return chapters;
}
