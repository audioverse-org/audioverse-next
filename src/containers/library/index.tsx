import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withAuthGuard from '@components/HOCs/withAuthGuard';
import Button from '@components/molecules/button';
import CardFavorite from '@components/molecules/card/favorite';
import CardRecording from '@components/molecules/card/recording';
import CardMasonry from '@components/molecules/cardMasonry';
import LibraryError from '@components/organisms/libraryError';
import LibraryNav from '@components/organisms/libraryNav';
import {
	FavoritableCatalogEntityType,
	GetLibraryDataQueryVariables,
	Language,
	RecordingViewerPlaybackStatus,
	useGetLibraryDataQuery,
	useGetLibraryHistoryPageDataQuery,
} from '@lib/generated/graphql';
import { makeLibraryRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ForwardIcon from '../../../public/img/icon-forward-light.svg';

import baseStyles from './base.module.scss';
import styles from './index.module.scss';
import LibraryLoggedOut from './loggedOut';
import { getLibraryPlaybackStatusDataVariables } from './playbackStatus';

export const getLibraryDataDefaultVariables = (
	language: Language
): GetLibraryDataQueryVariables => {
	return {
		language,
		first: 3,
		offset: 0,
		groupSequences: true,
		types: null,
		viewerPlaybackStatus: null,
	};
};

type Props = {
	language: Language;
};

function Library({ language }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	const { data: collectionsData } = useGetLibraryDataQuery({
		...getLibraryDataDefaultVariables(language),
		types: [
			FavoritableCatalogEntityType.Collection,
			FavoritableCatalogEntityType.Person,
			FavoritableCatalogEntityType.Sponsor,
		],
	});
	const collectionsItems = collectionsData?.me?.user.favorites.nodes || [];

	const { data: startedData } = useGetLibraryDataQuery({
		...getLibraryPlaybackStatusDataVariables(
			language,
			RecordingViewerPlaybackStatus.Started
		),
		first: 3,
	});
	const startedItems = startedData?.me?.user.favorites.nodes || [];

	const { data: unstartedData } = useGetLibraryDataQuery({
		...getLibraryPlaybackStatusDataVariables(
			language,
			RecordingViewerPlaybackStatus.Unstarted
		),
		first: 3,
	});
	const unstartedItems = unstartedData?.me?.user.favorites.nodes || [];

	const { data: finishedData } = useGetLibraryDataQuery({
		...getLibraryPlaybackStatusDataVariables(
			language,
			RecordingViewerPlaybackStatus.Finished
		),
		first: 3,
	});
	const finishedItems = finishedData?.me?.user.favorites.nodes || [];

	const { data: historyData } = useGetLibraryHistoryPageDataQuery({
		first: 3,
		language,
		offset: 0,
	});
	const historyItems = historyData?.me?.user.downloadHistory.nodes || [];

	const makeSeeAllButton = (routeSlug: string, label: JSX.Element) => (
		<div className={styles.seeAll}>
			<Button
				type="secondary"
				href={makeLibraryRoute(languageRoute, routeSlug)}
				text={label}
				IconLeft={ForwardIcon}
			/>
		</div>
	);

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref="" />

			{!collectionsItems.length &&
				!startedItems.length &&
				!unstartedItems.length &&
				!finishedItems.length &&
				!historyItems.length && (
					<LibraryError
						title={
							<FormattedMessage
								id="library__emptyHeading"
								defaultMessage="You don’t have any items saved yet"
							/>
						}
						message={
							<FormattedMessage
								id="library__emptyCopy"
								defaultMessage="Bookmark items or listen to items from the Discover page."
							/>
						}
					/>
				)}
			{collectionsItems.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="library__collectionsHeading"
							defaultMessage="Collections"
						/>
					</LineHeading>
					<CardMasonry
						items={collectionsItems}
						render={({ data }) => <CardFavorite favorite={data} />}
						key={`collectionItems-${collectionsItems.length}`}
					/>
					{makeSeeAllButton(
						'collections',
						<FormattedMessage
							id="library__collectionsSeeAll"
							defaultMessage="See All Collections"
						/>
					)}
				</>
			) : null}
			{startedItems.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="library__startedHeading"
							defaultMessage="Started"
						/>
					</LineHeading>
					<CardMasonry
						items={startedItems}
						render={({ data }) => <CardFavorite favorite={data} />}
						key={`startedItems-${startedItems.length}`}
					/>
					{makeSeeAllButton(
						'started',
						<FormattedMessage
							id="library__startedSeeAll"
							defaultMessage="See All Started"
						/>
					)}
				</>
			) : null}
			{unstartedItems.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="library__unstartedHeading"
							defaultMessage="Not Started"
						/>
					</LineHeading>
					<CardMasonry
						items={unstartedItems}
						render={({ data }) => <CardFavorite favorite={data} />}
						key={`unstartedItems-${unstartedItems.length}`}
					/>
					{makeSeeAllButton(
						'unstarted',
						<FormattedMessage
							id="unstartedSeeAll"
							defaultMessage="See All Not Started"
						/>
					)}
				</>
			) : null}
			{finishedItems.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="library__finishedHeading"
							defaultMessage="Finished"
						/>
					</LineHeading>
					<CardMasonry
						items={finishedItems}
						render={({ data }) => <CardFavorite favorite={data} />}
						key={`finishedItems-${finishedItems.length}`}
					/>
					{makeSeeAllButton(
						'finished',
						<FormattedMessage
							id="library__finishedSeeAll"
							defaultMessage="See All Finished"
						/>
					)}
				</>
			) : null}
			{historyItems.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="library__historyHeading"
							defaultMessage="History"
						/>
					</LineHeading>
					<CardMasonry
						items={historyItems}
						render={({ data }) => <CardRecording recording={data.recording} />}
						key={`historyItems-${historyItems.length}`}
					/>
					{makeSeeAllButton(
						'history',
						<FormattedMessage
							id="library__historySeeAll"
							defaultMessage="See All History"
						/>
					)}
				</>
			) : null}
		</div>
	);
}

export default withAuthGuard(Library, LibraryLoggedOut);
