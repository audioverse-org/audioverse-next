import React from 'react';

import Card from '@components/molecules/card';
import { CardBibleChapterFragment } from '@lib/generated/graphql';

import BibleIcon from '../../../public/img/icon-bible-solid.svg';

interface CardBibleChapterProps {
	chapter: CardBibleChapterFragment;
}

export default function CardBibleChapter({
	chapter,
}: CardBibleChapterProps): JSX.Element {
	return (
		<Card
			container={{
				icon: <BibleIcon width={12} height={12} />,
				title: 'Genesis (KJV)',
			}}
			duration={2520}
			progress={0.3}
			theme={'chapter'}
			{...chapter}
		/>
	);
}
