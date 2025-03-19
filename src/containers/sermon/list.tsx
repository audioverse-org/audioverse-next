import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardRecording from '~components/molecules/card/recording';
import RecordingHasVideoFilter from '~components/molecules/recordingHasVideoFilter';
import RssAlternate from '~components/molecules/rssAlternate';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import AndFailStates from '~src/components/templates/andFailStates';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';

import { GetSermonListPageDataQuery } from './__generated__/list';

export type SermonListProps = PaginatedProps<
	NonNullable<GetSermonListPageDataQuery['sermons']['nodes']>[0],
	GetSermonListPageDataQuery
> & { filter: 'all' | 'audio' | 'video' };

function SermonList({ nodes, pagination, filter }: SermonListProps) {
	const language = useLanguageRoute();

	return (
		<PaginatedCardList
			pagination={pagination}
			heading={
				<FormattedMessage
					id="sermonList__heading"
					defaultMessage="All Teachings"
				/>
			}
			makeRoute={(l, i) => root.lang(l).teachings[filter].page(i).get()}
			filter={
				<RecordingHasVideoFilter
					filter={filter}
					makeRoute={(l: string, f: 'all' | 'audio' | 'video', i: number) =>
						root.lang(l).teachings[f].page(i).get()
					}
				/>
			}
		>
			<RssAlternate url={root.lang(language).teachings.all.feed.get()} />
			{nodes.map((node) => (
				<CardRecording recording={node} key={node.canonicalPath} fullBleed />
			))}
		</PaginatedCardList>
	);
}

const WithFailStates = (props: Parameters<typeof SermonList>[0]) => (
	<AndFailStates
		Component={SermonList}
		componentProps={props}
		options={{ should404: (props: SermonListProps) => !props.nodes?.length }}
	/>
);
export default WithFailStates;
