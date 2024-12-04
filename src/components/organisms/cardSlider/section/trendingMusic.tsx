import React from 'react';
import { useIntl } from 'react-intl';

import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import CardRecording from '~src/components/molecules/card/recording';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';

import Section from '.';
import { useInfiniteGetSectionTrendingMusicQuery } from './__generated__/trendingMusic';

export default function TrendingMusic(): JSX.Element {
	const route = useLanguageRoute();
	const intl = useIntl();

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionTrendingMusicQuery}
			heading={intl.formatMessage({
				id: 'discover_trendingMusicHeading',
				defaultMessage: 'Trending Scripture Songs',
			})}
			previous={intl.formatMessage({
				id: 'discover__trendingMusicPrevious',
				defaultMessage: 'Previous trending scripture songs',
			})}
			next={intl.formatMessage({
				id: 'discover__trendingMusicNext',
				defaultMessage: 'Next trending scripture songs',
			})}
			seeAllUrl={root.lang(route).songs.albums.get()}
			selectNodes={(p) => p?.trendingMusic.nodes?.map((n) => n.recording)}
			Card={(p: { node: CardRecordingFragment }) => (
				<CardRecording recording={p.node} />
			)}
		/>
	);
}
