import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardRecording from '@components/molecules/card/recording';
import RecordingHasVideoFilter from '@components/molecules/recordingHasVideoFilter';
import RssAlternate from '@components/molecules/rssAlternate';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { GetSermonListPageDataQuery } from '@containers/sermon/list.gql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import {
	makeDiscoverRoute,
	makeSermonListRoute,
	makeSermonsFeedRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export type SermonListProps = PaginatedProps<
	NonNullable<GetSermonListPageDataQuery['sermons']['nodes']>[0],
	GetSermonListPageDataQuery
> & { filter: string };

function SermonList({ nodes, pagination, filter }: SermonListProps) {
	const language = useLanguageRoute();

	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={makeDiscoverRoute(language)}
			heading={
				<FormattedMessage
					id="sermonList__heading"
					defaultMessage="All Teachings"
				/>
			}
			makeRoute={(lang, page) => makeSermonListRoute(lang, filter, page)}
			filter={
				<RecordingHasVideoFilter
					filter={filter}
					makeRoute={makeSermonListRoute}
				/>
			}
		>
			<RssAlternate url={makeSermonsFeedRoute(language)} />
			{nodes.map((node) => (
				<CardRecording recording={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(
	SermonList,
	(props: SermonListProps) => !props.nodes?.length
);
