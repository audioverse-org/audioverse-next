import React from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';

import { PassageNavigationFragment } from './__generated__/index';
import styles from './chapterGrid.module.scss';

type Chapter = NonNullable<PassageNavigationFragment['recordings']['nodes']>[0];
export type ChapterId = Chapter['id'] | null;

type Props = {
	chapters: Array<Chapter>;
	chapterId: ChapterId;
};

export default function ChapterGrid({ chapters, chapterId }: Props) {
	return (
		<li className={styles.chaptersWrapper}>
			<ul className={styles.chapters}>
				{chapters?.map((chapter) => {
					const n = Number(chapter.title.split(' ').pop())
						.toString()
						.padStart(2, '0');
					return (
						<li key={n} className={styles.chapter}>
							<Link
								className={chapter.id === chapterId ? styles.active : ''}
								href={chapter.canonicalPath}
							>
								{n}
							</Link>
						</li>
					);
				})}
			</ul>
		</li>
	);
}
