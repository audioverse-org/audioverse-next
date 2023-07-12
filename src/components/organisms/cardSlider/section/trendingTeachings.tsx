import React from 'react';
import { useIntl } from 'react-intl';

import CardRecording from '~src/components/molecules/card/recording';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import { useInfiniteGetDiscoverTrendingTeachingsQuery } from './__generated__/trendingTeachings';
import Section from './index';

export default function TrendingTeachings(): JSX.Element {
	const route = useLanguageRoute();
	const intl = useIntl();

	return (
		<Section
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
			Card={(p) => <CardRecording recording={p.node} />}
			rows={2}
		/>
	);
}
