import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardSequence from '@components/molecules/card/sequence';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { GetStoriesAlbumsPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeStoryAlbumListPage } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export type StoryAlbumsListProps = PaginatedProps<
	NonNullable<GetStoriesAlbumsPageDataQuery['storySeasons']['nodes']>[0],
	GetStoriesAlbumsPageDataQuery
>;

function StoryAlbumsList({
	nodes,
	pagination,
}: StoryAlbumsListProps): JSX.Element {
	const language = useLanguageRoute();

	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={`/${language}/discover/collections`}
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

export default withFailStates(StoryAlbumsList, ({ nodes }) => !nodes?.length);
