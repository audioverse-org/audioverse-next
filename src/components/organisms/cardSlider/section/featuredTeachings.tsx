import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import { useIntl } from 'react-intl';

import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import CardRecording from '~src/components/molecules/card/recording';
import { useLanguageId } from '~src/lib/useLanguageId';

import {
	GetDiscoverFeaturedTeachingsQuery,
	useInfiniteGetDiscoverFeaturedTeachingsQuery,
} from '../../../../containers/discover/__generated__';
import Section, { SectionNode } from './index';

function selectFeaturedTeachings(
	p: GetDiscoverFeaturedTeachingsQuery | undefined
) {
	return p?.featuredTeachings.nodes;
}

function NodeRecording({
	node,
}: {
	node: SectionNode<CardRecordingFragment>;
}): JSX.Element {
	return <CardRecording recording={node} />;
}

export default function FeaturedTeachings(): JSX.Element {
	const language = useLanguageId();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverFeaturedTeachingsQuery(
		'after',
		{
			language,
			first: 3,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverFeaturedTeachingsQuery>) =>
				last?.featuredTeachings.pageInfo.hasNextPage
					? {
							language,
							first: 3,
							after: last.featuredTeachings.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverFeaturedTeachingsQuery, CardRecordingFragment>
			heading={intl.formatMessage({
				id: 'discover_featuredTeachingsHeading',
				defaultMessage: 'Featured Teachings',
			})}
			previous={intl.formatMessage({
				id: 'discover__featuredTeachingsPrevious',
				defaultMessage: 'Previous featured teachings',
			})}
			next={intl.formatMessage({
				id: 'discover__featuredTeachingsNext',
				defaultMessage: 'Next featured teachings',
			})}
			infiniteQueryResult={result}
			selectNodes={selectFeaturedTeachings}
			Card={NodeRecording}
		/>
	);
}
