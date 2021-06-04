import React, { CSSProperties } from 'react';

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
			style={
				{
					'--hatBg': 'black',
					'--hatColor': 'white',
					'--cardBg': '#F1F2F4',
				} as CSSProperties
			}
			container={{
				icon: <BibleIcon width={12} height={12} />,
				title: 'Genesis (KJV)',
			}}
			duration={2520}
			progress={0.3}
			{...chapter}
		/>
	);
}
