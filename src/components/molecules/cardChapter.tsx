import React from 'react';

import Card from '@components/molecules/card';

export default function CardChapter(): JSX.Element {
	return (
		<Card
			container={{
				icon: 'BIBLE',
				title: 'Genesis (KJV)',
			}}
			title={'Chapter 1'}
			duration={2520}
			progress={0.3}
		/>
	);
}
