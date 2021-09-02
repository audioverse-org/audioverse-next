import React from 'react';

import CardPost from '@components/molecules/card/post';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { makeBlogPostListRoute } from '@lib/routes';
import { BlogStaticProps } from '@pages/[language]/blog/page/[i]';

export type BlogProps = BlogStaticProps['props'];

export default function Blog({
	nodes: blogPosts,
	pagination,
}: BlogProps): JSX.Element {
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
