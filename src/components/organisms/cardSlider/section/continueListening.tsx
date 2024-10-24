import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import { useIntl } from 'react-intl';

import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import CardRecording from '~src/components/molecules/card/recording';

import {
	GetSectionContinueListeningQuery,
	useInfiniteGetSectionContinueListeningQuery,
} from './__generated__/continueListening';
import Section from './index';

export default function ContinueListening(): JSX.Element {
	const intl = useIntl();

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionContinueListeningQuery}
			variables={{
				getFavorites: false,
			}}
			options={{
				getNextPageParam: (
					lastPage: Maybe<GetSectionContinueListeningQuery>,
				) => {
					const hasMoreHistory =
						lastPage?.me?.user.continueListening?.pageInfo.hasNextPage;
					const historyEndCursor =
						lastPage?.me?.user.continueListening?.pageInfo.endCursor;
					const favoritesEndCursor =
						lastPage?.me?.user.favoriteRecordings?.pageInfo.endCursor;
					const getFavorites = !hasMoreHistory;
					const after = getFavorites ? favoritesEndCursor : historyEndCursor;

					return {
						getFavorites,
						after,
					};
				},
			}}
			heading={intl.formatMessage({
				id: 'discover_continueListeningHeading',
				defaultMessage: 'Continue Listening',
			})}
			previous={intl.formatMessage({
				id: 'discover__continueListeningPrevious',
				defaultMessage: 'Previous continue listening',
			})}
			next={intl.formatMessage({
				id: 'discover__continueListeningNext',
				defaultMessage: 'Next continue listening',
			})}
			selectNodes={(p) => [
				...(p?.me?.user.continueListening?.nodes?.map((n) => n.recording) ??
					[]),
				...(p?.me?.user.favoriteRecordings?.nodes ?? []),
			]}
			selectPageInfo={(p) =>
				p?.me?.user.continueListening?.pageInfo ||
				p?.me?.user.favoriteRecordings?.pageInfo
			}
			Card={(p: { node: CardRecordingFragment }) => (
				<CardRecording recording={p.node} />
			)}
		/>
	);
}
