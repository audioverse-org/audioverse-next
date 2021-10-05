import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import withFailStates from '@components/HOCs/withFailStates';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import { GetTrendingTeachingsPageDataQuery } from '@lib/generated/graphql';

export type TrendingTeachingsProps = NonNullable<
	GetTrendingTeachingsPageDataQuery['recordings']
>;

function TeachingsTrending({
	nodes,
}: Must<TrendingTeachingsProps>): JSX.Element {
	return (
		<div>
			<Heading1>
				<FormattedMessage
					id="trendingTeachings__heading"
					defaultMessage="Trending Teachings"
				/>
			</Heading1>
			<CardGroup>
				{nodes.map(({ recording }) => (
					<CardRecording recording={recording} key={recording.canonicalPath} />
				))}
			</CardGroup>
		</div>
	);
}

export default withFailStates(TeachingsTrending, ({ nodes }) => !nodes?.length);
