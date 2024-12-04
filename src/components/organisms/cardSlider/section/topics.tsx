import React from 'react';
import { useIntl } from 'react-intl';

import { CardTopicFragment } from '~src/components/molecules/card/__generated__/topic';
import CardTopic from '~src/components/molecules/card/topic';
import { useLanguageId } from '~src/lib/hooks/useLanguageId';
import root from '~src/lib/routes';

import { useInfiniteGetSectionTopicsQuery } from './__generated__/topics';
import Section from './index';

export default function Topics(): JSX.Element {
	const intl = useIntl();
	const language = useLanguageId();
	return (
		<Section
			infiniteQuery={useInfiniteGetSectionTopicsQuery}
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
			seeAllUrl={root.lang(language).topics.get()}
			Card={(p: { node: CardTopicFragment }) => <CardTopic topic={p.node} />}
		/>
	);
}
