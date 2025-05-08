import React from 'react';
import { useIntl } from 'react-intl';

import { CardTopicFragment } from '~src/components/molecules/card/__generated__/topic';
import CardTopic from '~src/components/molecules/card/topic';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import root from '~src/lib/routes';

import { useInfiniteGetSectionTopicsBrowseQuery } from './__generated__/topicsBrowse';
import Section from './index';

export default function TopicsBrowse(): JSX.Element {
	const intl = useIntl();
	const language = useLanguageRoute();

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionTopicsBrowseQuery}
			heading={intl.formatMessage({
				id: 'browse_topicsHeading',
				defaultMessage: 'Topics',
			})}
			previous={intl.formatMessage({
				id: 'browse__topicsPrevious',
				defaultMessage: 'Previous topics',
			})}
			next={intl.formatMessage({
				id: 'browse__topicsNext',
				defaultMessage: 'Next topics',
			})}
			seeAllUrl={root.lang(language).topics.get()}
			Card={(p: { node: CardTopicFragment }) => <CardTopic topic={p.node} />}
		/>
	);
}
