import React from 'react';
import { useIntl } from 'react-intl';

import { CardTopicFragment } from '~src/components/molecules/card/__generated__/topic';
import CardTopic from '~src/components/molecules/card/topic';

import { useInfiniteGetDiscoverTopicsQuery } from './__generated__/topics';
import Section from './index';

export default function Topics(): JSX.Element {
	const intl = useIntl();
	return (
		<Section
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
			Card={(p: { node: CardTopicFragment }) => <CardTopic topic={p.node} />}
		/>
	);
}
