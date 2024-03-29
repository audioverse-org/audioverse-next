import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardSequence from '~components/molecules/card/sequence';
import EmptyState from '~components/organisms/emptyState';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';

import { GetStoriesAlbumsPageDataQuery } from './__generated__/list';

export type StoryAlbumsListProps = PaginatedProps<
	NonNullable<GetStoriesAlbumsPageDataQuery['storySeasons']['nodes']>[0],
	GetStoriesAlbumsPageDataQuery
>;

export default function StoryAlbumsList({
	nodes,
	pagination,
}: StoryAlbumsListProps): JSX.Element {
	if (!nodes.length) {
		return (
			<EmptyState
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
			heading={
				<FormattedMessage
					id="storyAlbumList__heading"
					defaultMessage="All Stories"
				/>
			}
			makeRoute={(l, i) => root.lang(l).stories.albums.page(i).get()}
		>
			{nodes.map((node) => (
				<CardSequence sequence={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}
