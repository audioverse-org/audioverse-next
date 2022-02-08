import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import withFailStates from '@components/HOCs/withFailStates';
import ButtonBack from '@components/molecules/buttonBack';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import { GetTrendingTeachingsPageDataQuery } from '@lib/generated/graphql';
import { makeDiscoverRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './trending.module.scss';

export type TrendingTeachingsProps = NonNullable<
	GetTrendingTeachingsPageDataQuery['recordings']
>;

function TeachingsTrending({
	nodes,
}: Must<TrendingTeachingsProps>): JSX.Element {
	const languageRoute = useLanguageRoute();
	return (
		<div>
			<ButtonBack
				backUrl={makeDiscoverRoute(languageRoute)}
				className={styles.back}
			/>
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
