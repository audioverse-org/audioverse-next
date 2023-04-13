import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import withFailStates from '@components/HOCs/withFailStates';
import ButtonBack from '@components/molecules/buttonBack';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import RecordingHasVideoFilter from '@components/molecules/recordingHasVideoFilter';
import { GetTrendingTeachingsPageDataQuery } from '@lib/generated/graphql';
import root from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './trending.module.scss';

export type TrendingTeachingsProps = NonNullable<
	GetTrendingTeachingsPageDataQuery['recordings']
> & { filter: string };

function TeachingsTrending({
	nodes,
	filter,
}: Must<TrendingTeachingsProps>): JSX.Element {
	const languageRoute = useLanguageRoute();
	return (
		<div>
			<div className={styles.filterRow}>
				<ButtonBack
					backUrl={root.lang(languageRoute).discover.get()}
					className={styles.back}
				/>
				<RecordingHasVideoFilter
					filter={filter}
					makeRoute={(l: string, f: 'all' | 'audio' | 'video', i: number) =>
						root.lang(l).teachings.trending[f].page(i).get()
					}
				/>
			</div>
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

export default withFailStates(TeachingsTrending, {
	useShould404: ({ nodes }) => !nodes?.length,
});
