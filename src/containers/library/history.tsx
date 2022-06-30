import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useInfiniteQuery } from 'react-query';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import Button from '@components/molecules/button';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import LoadingCards from '@components/molecules/loadingCards';
import LibraryError from '@components/organisms/libraryError';
import LibraryNav from '@components/organisms/libraryNav';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
import { Language } from '@src/__generated__/graphql';

import baseStyles from './base.module.scss';
import styles from './history.module.scss';
import LibraryLoggedOut from './loggedOut';
import {
	GetLibraryHistoryPageDataDocument,
	GetLibraryHistoryPageDataQuery,
	GetLibraryHistoryPageDataQueryVariables,
} from '@containers/library/__generated__/history';

export const getLibraryHistoryPageDataDefaultVariables = (
	language: Language
): GetLibraryHistoryPageDataQueryVariables => {
	return {
		language,
		first: 25,
		offset: 0,
	};
};

export type ILibraryHistoryProps = {
	language: Language;
};

function LibraryHistory({ language }: ILibraryHistoryProps): JSX.Element {
	const variables = getLibraryHistoryPageDataDefaultVariables(language);
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery(
			['getLibraryHistoryPageData', variables],
			({ pageParam }) =>
				graphqlFetcher<
					GetLibraryHistoryPageDataQuery,
					GetLibraryHistoryPageDataQueryVariables
				>(GetLibraryHistoryPageDataDocument, {
					...variables,
					offset: pageParam || 0,
				})(),
			{
				getNextPageParam: (lastPage, pages) =>
					lastPage.me?.user.downloadHistory.pageInfo.hasNextPage
						? pages.length * variables.first
						: undefined,
			}
		);

	const showLoadMore = hasNextPage || isFetchingNextPage;
	return (
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
									)
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
				<LibraryError
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
	);
}

export default withAuthGuard(LibraryHistory, LibraryLoggedOut);
