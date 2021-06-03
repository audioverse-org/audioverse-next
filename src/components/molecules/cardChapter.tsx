import React, { CSSProperties } from 'react';

import Card from '@components/molecules/card';

import BibleIcon from '../../../public/img/icon-bible-solid.svg';

export default function CardChapter(): JSX.Element {
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
			title={'Chapter 1'}
			duration={2520}
			progress={0.3}
		/>
	);
}
