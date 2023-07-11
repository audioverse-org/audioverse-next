import React from 'react';
import { useIntl } from 'react-intl';

import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import CardRecording from '~src/components/molecules/card/recording';
import root from '~src/lib/routes';
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
	const route = useLanguageRoute();
	const intl = useIntl();

	return (
		<Section<GetDiscoverTrendingTeachingsQuery, CardRecordingFragment>
			infiniteQuery={useInfiniteGetDiscoverTrendingTeachingsQuery}
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
			selectNodes={(p) => p?.trendingTeachings.nodes?.map((n) => n.recording)}
			Card={NodeRecording}
			rows={2}
		/>
	);
}
