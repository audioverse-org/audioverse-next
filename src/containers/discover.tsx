import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import CardSermon from '@components/molecules/card/sermon';
import CardMasonry from '@components/molecules/cardMasonry';
import { GetDiscoverPageDataQuery } from '@lib/generated/graphql';

import styles from './discover.module.scss';

export default function Discover({
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
			<CardMasonry
				items={sermons}
				render={({ data }) => <CardSermon recording={data} />}
				className={styles.grid}
			/>
		</div>
	);
}
