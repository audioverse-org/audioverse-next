import React from 'react';
import { useIntl } from 'react-intl';

import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import CardRecording from '~src/components/molecules/card/recording';

import {
	GetDiscoverFeaturedTeachingsQuery,
	useInfiniteGetDiscoverFeaturedTeachingsQuery,
} from './__generated__/featuredTeachings';
import Section from './index';

export default function FeaturedTeachings(): JSX.Element {
	const intl = useIntl();
	return (
		<Section<GetDiscoverFeaturedTeachingsQuery, CardRecordingFragment>
			infiniteQuery={useInfiniteGetDiscoverFeaturedTeachingsQuery}
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
			Card={(p) => <CardRecording recording={p.node} />}
		/>
	);
}
