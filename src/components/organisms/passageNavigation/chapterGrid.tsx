import React from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';
import root from '~src/lib/routes';
import { parseChapterNumber } from '~src/services/bibles/utils';

import { Chapter } from '.';
import styles from './chapterGrid.module.scss';
import useChapters from './useChapters';

export type ChapterId = Chapter['id'] | null;

type Props = {
	chapterId: ChapterId;
	bookId: string;
	versionId: string | number;
};

export default function ChapterGrid({ chapterId, bookId, versionId }: Props) {
	const chapters = useChapters(versionId, bookId);

	if (!chapters) return;

	return (
		<ul className={styles.chapters}>
			{chapters?.map((chapter) => {
				const n = parseChapterNumber(chapter.title);
				const s = n.toString().padStart(2, '0');
				const baseUrl = root
					.lang('en')
					.bibles.versionId(versionId)
					.fcbhId(bookId)
					.chapterNumber(n)
					.get({
						params: {
							autoplay: 'true',
						},
					});

				return (
					<li key={s} className={styles.chapter}>
						<Link
							className={chapter.id === chapterId ? styles.active : ''}
							href={baseUrl}
						>
							{s}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
