import React from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';
import { useLocalStorage } from '~src/lib/hooks/useLocalStorage';

import { PassageNavigationFragment } from './__generated__/index';
import styles from './index.module.scss';

type Chapter = NonNullable<PassageNavigationFragment['recordings']['nodes']>[0];
type ChapterId = Chapter['id'];

type Props = {
	chapters: Array<Chapter>;
};

export default function ChapterGrid({ chapters }: Props) {
	const [selectedChapterId] = useLocalStorage<ChapterId | null>(
		'selectedChapterId',
		null,
	);

	return (
		<li className={styles.chaptersWrapper}>
			<ul className={styles.chapters}>
				{chapters?.map((chapter) => {
					const n = Number(chapter.title.split(' ').pop());
					return (
						<li key={n} className={styles.chapter}>
							<Link
								className={
									chapter.id === selectedChapterId ? styles.active : ''
								}
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
