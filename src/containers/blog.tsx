import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import CardPost from '@components/molecules/card/post';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { GetBlogPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeBlogPostListRoute } from '@lib/routes/makeBlogPostListRoute';

export type BlogProps = PaginatedProps<
	NonNullable<GetBlogPageDataQuery['blogPosts']['nodes']>[0],
	GetBlogPageDataQuery
>;

function Blog({ nodes: blogPosts, pagination }: BlogProps): JSX.Element {
	return (
		<>
			<CardGroup>
				{blogPosts.map((post) => (
					<CardPost post={post} key={post.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				current={pagination.current}
				total={pagination.total}
				makeRoute={makeBlogPostListRoute}
			/>
		</>
	);
}

export default withFailStates(Blog, {
	useShould404: ({ nodes }) => !nodes.length,
});
