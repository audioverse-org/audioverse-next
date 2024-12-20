import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '~components/molecules/button';
import CardRecording from '~components/molecules/card/recording';
import CardGroup from '~components/molecules/cardGroup';
import LoadingCards from '~components/molecules/loadingCards';
import EmptyState from '~components/organisms/emptyState';
import LibraryNav from '~components/organisms/libraryNav';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
import { Language } from '~src/__generated__/graphql';
import AndAuthGuard from '~src/components/templates/andAuthGuard';

import {
	GetLibraryHistoryPageDataDocument,
	GetLibraryHistoryPageDataQuery,
	GetLibraryHistoryPageDataQueryVariables,
} from './__generated__/history';
import baseStyles from './base.module.scss';
import styles from './history.module.scss';
import LibraryLoggedOut from './loggedOut';

export const getLibraryHistoryPageDataDefaultVariables = (
	language: Language,
): GetLibraryHistoryPageDataQueryVariables => {
	return {
		language,
		first: 25,
		offset: 0,
	};
};

export type ILibraryHistoryProps = {
	language: Language;
} & React.JSX.IntrinsicAttributes;

function LibraryHistory({ language }: ILibraryHistoryProps): JSX.Element {
	const variables = getLibraryHistoryPageDataDefaultVariables(language);
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery({
			queryKey: ['getLibraryHistoryPageData', variables],
			queryFn: ({ pageParam }) =>
				graphqlFetcher<
					GetLibraryHistoryPageDataQuery,
					GetLibraryHistoryPageDataQueryVariables
				>(GetLibraryHistoryPageDataDocument, {
					...variables,
					offset: pageParam,
				})(),
			getNextPageParam: (lastPage, pages) =>
				lastPage.me?.user.downloadHistory.pageInfo.hasNextPage
					? pages.length * variables.first
					: undefined,
			initialPageParam: 0,
		});

	const showLoadMore = hasNextPage || isFetchingNextPage;
	return (
		<AndAuthGuard LoggedOutComponent={LibraryLoggedOut}>
			<div className={baseStyles.wrapper}>
				<LibraryNav currentNavHref="history" disableFiltersAndSorts />

				{isLoading && !isFetchingNextPage ? (
					<LoadingCards />
				) : data?.pages.length ? (
					<>
						<CardGroup>
							{data?.pages?.map((group, i) => (
								<React.Fragment key={i}>
									{(group.me?.user.downloadHistory.nodes || []).map(
										({ recording }) => (
											<CardRecording
												recording={recording}
												key={recording.canonicalPath}
											/>
										),
									)}
								</React.Fragment>
							))}
						</CardGroup>
						{showLoadMore && (
							<div className={styles.loadMore}>
								<Button
									type="secondary"
									onClick={() => fetchNextPage()}
									text={
										isFetchingNextPage ? (
											<FormattedMessage
												id="libraryHistory__loadingMore"
												defaultMessage="Loading more..."
											/>
										) : (
											<FormattedMessage
												id="libraryHistory__loadMore"
												defaultMessage="Load more"
											/>
										)
									}
									disabled={isFetchingNextPage}
								/>
							</div>
						)}
					</>
				) : (
					<EmptyState
						title={
							<FormattedMessage
								id="libraryHistory__emptyHeading"
								defaultMessage="You haven’t listened to any items yet"
							/>
						}
						message={
							<FormattedMessage
								id="libraryHistory__emptyCopy"
								defaultMessage="Find something to listen to on the Discover page."
							/>
						}
					/>
				)}
			</div>
		</AndAuthGuard>
	);
}

export default LibraryHistory;
