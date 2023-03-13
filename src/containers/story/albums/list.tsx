import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardSequence from '@components/molecules/card/sequence';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { GetStoriesAlbumsPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import {
	makeDiscoverCollectionsRoute,
	makeStoryAlbumListPage,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import LibraryError from '@components/organisms/libraryError';

export type StoryAlbumsListProps = PaginatedProps<
	NonNullable<GetStoriesAlbumsPageDataQuery['storySeasons']['nodes']>[0],
	GetStoriesAlbumsPageDataQuery
>;

export default function StoryAlbumsList({
	nodes,
	pagination,
}: StoryAlbumsListProps): JSX.Element {
	const language = useLanguageRoute();

	if (!nodes.length) {
		return (
			<LibraryError
				title={
					<FormattedMessage
						id="storyAlbumList__emptyStateTitle"
						defaultMessage="Nothing here!"
					/>
				}
				message={
					<FormattedMessage
						id="storyAlbumList__emptyStateMessage"
						defaultMessage="There are no story albums to show."
					/>
				}
			/>
		);
	}

	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={makeDiscoverCollectionsRoute(language)}
			heading={
				<FormattedMessage
					id="storyAlbumList__heading"
					defaultMessage="All Stories"
				/>
			}
			makeRoute={makeStoryAlbumListPage}
		>
			{nodes.map((node) => (
				<CardSequence sequence={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}
