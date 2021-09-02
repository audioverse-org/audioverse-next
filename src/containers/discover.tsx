import { Masonry } from 'masonic';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import CardSermon from '@components/molecules/card/sermon';
import { GetDiscoverPageDataQuery } from '@lib/generated/graphql';

import styles from './discover.module.scss';

export default function discover({
	data,
}: {
	data: GetDiscoverPageDataQuery;
}): JSX.Element {
	const sermons = data.sermons.nodes || [];
	return (
		<div>
			<LineHeading>
				<FormattedMessage
					id="discover_recentHeading"
					defaultMessage="Recent Content"
					description="Discover recent content heading"
				/>
			</LineHeading>
			<Masonry
				items={sermons}
				render={({ data }) => <CardSermon recording={data} />}
				columnGutter={20}
				columnWidth={300}
				className={styles.grid}
			/>
		</div>
	);
}
