import { Masonry } from 'masonic';
import React from 'react';

import LineHeading from '@components/atoms/lineHeading';
import CardSermon from '@components/molecules/cardSermon';
import { GetDiscoverPageDataQuery } from '@lib/generated/graphql';

export default function discover({
	data,
}: {
	data: GetDiscoverPageDataQuery;
}): JSX.Element {
	const sermons = data.sermons.nodes || [];
	return (
		<>
			<LineHeading>Recent Content</LineHeading>
			<Masonry
				items={sermons}
				render={({ data }) => <CardSermon recording={data} />}
				columnGutter={20}
				columnWidth={300}
			/>
		</>
	);
}
