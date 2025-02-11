import React from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';
import { Language } from '~src/__generated__/graphql';
import root from '~src/lib/routes';
import { parseChapterNumber } from '~src/services/bibles/utils';

import { Chapter } from '.';
import styles from './chapterGrid.module.scss';

export type ChapterId = Chapter['id'] | null;

type Props = {
	chapters: Array<Chapter>;
	chapterId: ChapterId;
	bookName: string;
	versionId: string | number;
};

export default function ChapterGrid({
	chapters,
	chapterId,
	bookName,
	versionId,
}: Props) {
	return (
		<ul className={styles.chapters}>
			{chapters?.map((chapter) => {
				const n = parseChapterNumber(chapter.title);
				const s = n.toString().padStart(2, '0');
				const baseUrl = root
					.lang(Language.English)
					.bibles.versionId(versionId)
					.bookName(bookName)
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
