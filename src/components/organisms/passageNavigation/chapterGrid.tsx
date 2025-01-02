import React from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';

import { Chapter } from '.';
import styles from './chapterGrid.module.scss';

export type ChapterId = Chapter['id'] | null;

type Props = {
	chapters: Array<Chapter>;
	chapterId: ChapterId;
};

export default function ChapterGrid({ chapters, chapterId }: Props) {
	return (
		<ul className={styles.chapters}>
			{chapters?.map((chapter) => {
				const n = Number(chapter.title.split(' ').pop())
					.toString()
					.padStart(2, '0');
				return (
					<li key={n} className={styles.chapter}>
						<Link
							className={chapter.id === chapterId ? styles.active : ''}
							href={`${chapter.canonicalPath}?autoplay`}
						>
							{n}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
