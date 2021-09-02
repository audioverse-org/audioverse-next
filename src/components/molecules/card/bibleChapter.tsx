import React from 'react';

import CardWithPlayable from '@components/molecules/card/base/withPlayable';
import { CardBibleChapterFragment } from '@lib/generated/graphql';

import BibleIcon from '../../../../public/img/icon-bible-solid.svg';

interface CardBibleChapterProps {
	chapter: CardBibleChapterFragment;
}

export default function CardBibleChapter({
	chapter,
}: CardBibleChapterProps): JSX.Element {
	return (
		<CardWithPlayable
			recording={{
				id: chapter.id,
				canonicalPath: chapter.url,
				title: chapter.title,
				duration: 2520,
				sequence: null,
				sequenceIndex: null,
				sponsor: null,
				persons: [],
				writers: [],
				audioFiles: [],
				videoFiles: [],
				videoStreams: [],
			}}
			container={{
				icon: <BibleIcon width={12} height={12} />,
				title: 'Genesis (KJV)',
				content: <h1>TODO</h1>,
				label: 'TODO',
				url: 'TODO',
			}}
			theme={'chapter'}
		/>
	);
}
