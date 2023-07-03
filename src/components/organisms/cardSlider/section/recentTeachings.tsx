import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import { useIntl } from 'react-intl';

import {
	GetDiscoverRecentTeachingsQuery,
	useInfiniteGetDiscoverRecentTeachingsQuery,
} from '~containers/discover/__generated__';
import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import CardRecording from '~src/components/molecules/card/recording';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import Section, { SectionNode } from './index';

function selectRecentTeachings(p: GetDiscoverRecentTeachingsQuery | undefined) {
	return p?.recentTeachings.nodes;
}

function NodeRecording({
	node,
}: {
	node: SectionNode<CardRecordingFragment>;
}): JSX.Element {
	return <CardRecording recording={node} />;
}

export default function RecentTeachings(): JSX.Element {
	const language = useLanguageId();
	const route = useLanguageRoute();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverRecentTeachingsQuery(
		'after',
		{
			language,
			first: 6,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverRecentTeachingsQuery>) =>
				last?.recentTeachings.pageInfo.hasNextPage
					? {
							language,
							first: 6,
							after: last.recentTeachings.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverRecentTeachingsQuery, CardRecordingFragment>
			heading={intl.formatMessage({
				id: 'discover_recentTeachingsHeading',
				defaultMessage: 'Recent Teachings',
			})}
			previous={intl.formatMessage({
				id: 'discover__recentTeachingsPrevious',
				defaultMessage: 'Previous recent teachings',
			})}
			next={intl.formatMessage({
				id: 'discover__recentTeachingsNext',
				defaultMessage: 'Next recent teachings',
			})}
			seeAllUrl={root.lang(route).teachings.all.get()}
			infiniteQueryResult={result}
			selectNodes={selectRecentTeachings}
			Card={NodeRecording}
			rows={2}
		/>
	);
}
