import React from 'react';

import CardPost from '@components/molecules/card/post';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { GetBlogPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeBlogPostListRoute } from '@lib/routes';
import withFailStates from '@components/HOCs/withFailStates';

export type BlogProps = PaginatedProps<
	NonNullable<GetBlogPageDataQuery['blogPosts']['nodes']>[0],
	any
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

export default withFailStates(Blog, ({ nodes }) => !nodes.length);
