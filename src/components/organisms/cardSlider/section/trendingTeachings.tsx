import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import { useIntl } from 'react-intl';

import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import CardRecording from '~src/components/molecules/card/recording';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import {
	GetDiscoverTrendingTeachingsQuery,
	useInfiniteGetDiscoverTrendingTeachingsQuery,
} from './__generated__/trendingTeachings';
import Section, { SectionNode } from './index';

function NodeRecording({
	node,
}: {
	node: SectionNode<CardRecordingFragment>;
}): JSX.Element {
	return <CardRecording recording={node} />;
}

export default function TrendingTeachings(): JSX.Element {
	const language = useLanguageId();
	const route = useLanguageRoute();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverTrendingTeachingsQuery(
		'after',
		{
			language,
			first: 6,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverTrendingTeachingsQuery>) =>
				last?.trendingTeachings.pageInfo.hasNextPage
					? {
							language,
							first: 6,
							after: last.trendingTeachings.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverTrendingTeachingsQuery, CardRecordingFragment>
			heading={intl.formatMessage({
				id: 'discover_trendingTeachingsHeading',
				defaultMessage: 'Trending Teachings',
			})}
			previous={intl.formatMessage({
				id: 'discover__trendingTeachingsPrevious',
				defaultMessage: 'Previous trending teachings',
			})}
			next={intl.formatMessage({
				id: 'discover__trendingTeachingsNext',
				defaultMessage: 'Next trending teachings',
			})}
			seeAllUrl={root.lang(route).teachings.trending.get()}
			infiniteQueryResult={result}
			selectNodes={(p) => p?.trendingTeachings.nodes?.map((n) => n.recording)}
			Card={NodeRecording}
			rows={2}
		/>
	);
}
