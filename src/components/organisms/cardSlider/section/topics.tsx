import React from 'react';
import { useIntl } from 'react-intl';

import { CardTopicFragment } from '~src/components/molecules/card/__generated__/topic';
import CardTopic from '~src/components/molecules/card/topic';

import {
	GetDiscoverTopicsQuery,
	useInfiniteGetDiscoverTopicsQuery,
} from './__generated__/topics';
import Section, { SectionNode } from './index';

function NodeTopic({
	node,
}: {
	node: SectionNode<CardTopicFragment>;
}): JSX.Element {
	return <CardTopic topic={node} />;
}

export default function Topics(): JSX.Element {
	const intl = useIntl();

	return (
		<Section<GetDiscoverTopicsQuery, CardTopicFragment>
			infiniteQuery={useInfiniteGetDiscoverTopicsQuery}
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
			Card={NodeTopic}
		/>
	);
}
