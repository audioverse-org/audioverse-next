import React from 'react';

import CardPost from '~components/molecules/card/post';
import CardGroup from '~components/molecules/cardGroup';
import Pagination from '~components/molecules/pagination';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetBlogPageDataQuery } from './__generated__/blog';

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
				makeRoute={(languageRoute, pageIndex) =>
					root.lang(languageRoute).blog.page(pageIndex).get()
				}
			/>
		</>
	);
}

const WithFailStates = (props: Parameters<typeof Blog>[0]) => (
	<AndFailStates
		Component={Blog}
		componentProps={props}
		options={{ should404: ({ nodes }) => !nodes.length }}
	/>
);
export default WithFailStates;
