import React from 'react';
import { useIntl } from 'react-intl';

import { Maybe } from '~src/__generated__/graphql';
import { CardTopicFragment } from '~src/components/molecules/card/__generated__/topic';
import CardTopic from '~src/components/molecules/card/topic';
import { useLanguageId } from '~src/lib/useLanguageId';

import {
	GetDiscoverTopicsQuery,
	useInfiniteGetDiscoverTopicsQuery,
} from '../../../../containers/discover/__generated__';
import Section, { SectionNode } from './index';

function selectTopics(p: GetDiscoverTopicsQuery | undefined) {
	return p?.topics.nodes;
}

function NodeTopic({
	node,
}: {
	node: SectionNode<CardTopicFragment>;
}): JSX.Element {
	return <CardTopic topic={node} />;
}

export default function Topics(): JSX.Element {
	const language = useLanguageId();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverTopicsQuery(
		'after',
		{
			language,
			first: 6,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverTopicsQuery>) =>
				last?.topics.pageInfo.hasNextPage
					? {
							language,
							first: 6,
							after: last.topics.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverTopicsQuery, CardTopicFragment>
			heading={intl.formatMessage({
				id: 'discover_topicsHeading',
				defaultMessage: 'Topics',
			})}
			previous={intl.formatMessage({
				id: 'discover__topicsPrevious',
				defaultMessage: 'Previous topics',
			})}
			next={intl.formatMessage({
				id: 'discover__topicsNext',
				defaultMessage: 'Next topics',
			})}
			infiniteQueryResult={result}
			selectNodes={selectTopics}
			Card={NodeTopic}
		/>
	);
}
