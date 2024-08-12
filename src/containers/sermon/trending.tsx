import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import withFailStates from '~components/HOCs/withFailStates';
import CardRecording from '~components/molecules/card/recording';
import CardGroup from '~components/molecules/cardGroup';
import RecordingHasVideoFilter from '~components/molecules/recordingHasVideoFilter';
import root from '~lib/routes';
import { Must } from '~src/types/types';

import { GetTrendingTeachingsPageDataQuery } from './__generated__/trending';
import styles from './trending.module.scss';

export type TrendingTeachingsProps = NonNullable<
	GetTrendingTeachingsPageDataQuery['recordings']
> & { filter: string };

function TeachingsTrending({
	nodes,
	filter,
}: Must<TrendingTeachingsProps>): JSX.Element {
	return (
		<div>
			<Heading1>
				<FormattedMessage
					id="trendingTeachings__heading"
					defaultMessage="Trending Teachings"
				/>
				<div className={styles.filterRow}>
					<RecordingHasVideoFilter
						filter={filter}
						makeRoute={(l: string, f: 'all' | 'audio' | 'video', i: number) =>
							root.lang(l).teachings.trending[f].page(i).get()
						}
					/>
				</div>
			</Heading1>

			<CardGroup>
				{nodes.map(({ recording }) => (
					<CardRecording
						recording={recording}
						key={recording.canonicalPath}
						fullBleed
					/>
				))}
			</CardGroup>
		</div>
	);
}

export default withFailStates(TeachingsTrending, {
	useShould404: ({ nodes }) => !nodes?.length,
});
