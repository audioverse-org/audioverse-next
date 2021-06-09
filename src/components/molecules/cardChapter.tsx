import React from 'react';

import Card from '@components/molecules/card';

import BibleIcon from '../../../public/img/icon-bible-solid.svg';

export default function CardChapter(): JSX.Element {
	return (
		<Card
			container={{
				icon: <BibleIcon width={12} height={12} />,
				title: 'Genesis (KJV)',
			}}
			title={'Chapter 1'}
			duration={2520}
			progress={0.3}
			theme={'chapter'}
		/>
	);
}
