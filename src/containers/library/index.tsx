import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withAuthGuard from '@components/HOCs/withAuthGuard';
import Button from '@components/molecules/button';
import CardFavorite from '@components/molecules/card/favorite';
import CardRecording from '@components/molecules/card/recording';
import CardMasonry from '@components/molecules/cardMasonry';
import LoadingCards from '@components/molecules/loadingCards';
import LibraryError from '@components/organisms/libraryError';
import LibraryNav from '@components/organisms/libraryNav';
import {
	FavoritableCatalogEntityType,
	FavoritesSortableField,
	GetLibraryDataQueryVariables,
	Language,
	OrderByDirection,
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

export const SORT_MAP = {
	new: [FavoritesSortableField.FavoritedAt, OrderByDirection.Desc],
	old: [FavoritesSortableField.FavoritedAt, OrderByDirection.Asc],
	a: [FavoritesSortableField.EntityTitle, OrderByDirection.Asc],
	z: [FavoritesSortableField.EntityTitle, OrderByDirection.Desc],
} as const;

export const CONTENT_TYPE_MAP = {
	people: [FavoritableCatalogEntityType.Person],
	conferences: [FavoritableCatalogEntityType.Collection],
	series: [FavoritableCatalogEntityType.Sequence],
	sponsors: [FavoritableCatalogEntityType.Sponsor],
};

export const getLibraryDataDefaultVariables = (
	language: Language,
	sort: string,
	contentType: string
): GetLibraryDataQueryVariables => {
	if (!(SORT_MAP as Record<string, unknown>)[sort]) {
		sort = 'new';
	}
	const [sortField, sortDirection] = SORT_MAP[sort as keyof typeof SORT_MAP];
	if (!(CONTENT_TYPE_MAP as Record<string, unknown>)[contentType]) {
		contentType = '';
	}
	const types = contentType
		? (CONTENT_TYPE_MAP as Record<string, FavoritableCatalogEntityType[]>)[
				contentType
		  ]
		: null;
	return {
		language,
		first: 3,
		offset: 0,
		groupSequences: true,
		hasVideo: null,
		recordingContentType: null,
		recordingDuration: null,
		types,
		viewerPlaybackStatus: null,
		sortField,
		sortDirection,
	};
};

export type ILibraryProps = {
	language: Language;
};

function Library({ language }: ILibraryProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const router = useRouter();
	const querySort = router.query.sort as string;
	const queryContentType = router.query.contentType as string;
	const { data: collectionsData, isLoading: isLoadingCollections } =
		useGetLibraryDataQuery(
			getLibraryDataDefaultVariables(language, querySort, queryContentType)
		);
	const collectionsItems = collectionsData?.me?.user.favorites.nodes || [];

	const { data: startedData, isLoading: isLoadingStarted } =
		useGetLibraryDataQuery({
			...getLibraryPlaybackStatusDataVariables(
				language,
				RecordingViewerPlaybackStatus.Started,
				querySort
			),
			first: 3,
		});
	const startedItems = startedData?.me?.user.favorites.nodes || [];

	const { data: unstartedData, isLoading: isLoadingUnstarted } =
		useGetLibraryDataQuery({
			...getLibraryPlaybackStatusDataVariables(
				language,
				RecordingViewerPlaybackStatus.Unstarted,
				querySort
			),
			first: 3,
		});
	const unstartedItems = unstartedData?.me?.user.favorites.nodes || [];

	const { data: finishedData, isLoading: isLoadingFinished } =
		useGetLibraryDataQuery({
			...getLibraryPlaybackStatusDataVariables(
				language,
				RecordingViewerPlaybackStatus.Finished,
				querySort
			),
			first: 3,
		});
	const finishedItems = finishedData?.me?.user.favorites.nodes || [];

	const { data: historyData, isLoading: isLoadingHistory } =
		useGetLibraryHistoryPageDataQuery({
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

	const isLoading =
		isLoadingCollections ||
		isLoadingStarted ||
		isLoadingUnstarted ||
		isLoadingFinished ||
		isLoadingHistory;

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref="" />

			{isLoading ? (
				<LoadingCards />
			) : (
				!collectionsItems.length &&
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
				)
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
