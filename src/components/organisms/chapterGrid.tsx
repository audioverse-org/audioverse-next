import React from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';

import { PassageNavigationFragment } from './__generated__/passageNavigation';
import styles from './passageNavigation.module.scss';

type Chapter = NonNullable<PassageNavigationFragment['recordings']['nodes']>[0];

type Props = {
	chapters: Array<Chapter>;
};

export default function ChapterGrid({ chapters }: Props) {
	return (
		<li className={styles.chaptersWrapper}>
			<ul className={styles.chapters}>
				{chapters?.map((chapter) => {
					const n = Number(chapter.title.split(' ').pop());
					return (
						<li key={n} className={styles.chapter}>
							<Link href={chapter.canonicalPath}>{n}</Link>
						</li>
					);
				})}
			</ul>
		</li>
	);
}
