import React from 'react';
import { FormattedMessage } from 'react-intl';

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
	const {
		data: chapters,
		isLoading,
		isError,
		error,
	} = useChapters(versionId, bookId);

	if (isLoading) {
		return (
			<div className={styles.loading}>
				<FormattedMessage
					id="organisms-passageNavigation__chapterGridLoading"
					defaultMessage="Loading chapters..."
				/>
			</div>
		);
	}

	if (isError) {
		console.error(error);
		return (
			<div className={styles.error}>
				<FormattedMessage
					id="organisms-passageNavigation__chapterGridError"
					defaultMessage="Something went wrong. Please try again later."
				/>
			</div>
		);
	}

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
