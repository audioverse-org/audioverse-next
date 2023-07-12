import React from 'react';
import { useIntl } from 'react-intl';

import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import CardRecording from '~src/components/molecules/card/recording';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import { useInfiniteGetDiscoverRecentTeachingsQuery } from './__generated__/recentTeachings';
import Section from './index';

export default function RecentTeachings(): JSX.Element {
	const route = useLanguageRoute();
	const intl = useIntl();

	return (
		<Section
			infiniteQuery={useInfiniteGetDiscoverRecentTeachingsQuery}
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
			Card={(p: { node: CardRecordingFragment }) => (
				<CardRecording recording={p.node} />
			)}
			rows={2}
		/>
	);
}
