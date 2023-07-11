import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import { useIntl } from 'react-intl';

import { CardPostFragment } from '~src/components/molecules/card/__generated__/post';
import CardPost from '~src/components/molecules/card/post';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import Section, { SectionNode } from '.';
import {
	GetDiscoverBlogPostsQuery,
	useInfiniteGetDiscoverBlogPostsQuery,
} from './__generated__/blogPosts';

function selectPosts(p: GetDiscoverBlogPostsQuery | undefined) {
	return p?.blogPosts.nodes;
}

function NodePost({
	node,
}: {
	node: SectionNode<CardPostFragment>;
}): JSX.Element {
	return <CardPost post={node} />;
}

export default function BlogPosts(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const language = useLanguageId();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverBlogPostsQuery(
		'after',
		{
			language,
			first: 3,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverBlogPostsQuery>) =>
				last?.blogPosts.pageInfo.hasNextPage
					? {
							language,
							first: 3,
							after: last.blogPosts.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverBlogPostsQuery, CardPostFragment>
			heading={intl.formatMessage({
				id: 'discover_recentBlogHeading',
				defaultMessage: 'Recent Blog Posts',
			})}
			previous={intl.formatMessage({
				id: 'discover__recentBlogPrevious',
				defaultMessage: 'Previous recent blog posts',
			})}
			next={intl.formatMessage({
				id: 'discover__recentBlogNext',
				defaultMessage: 'Next recent blog posts',
			})}
			seeAllUrl={root.lang(languageRoute).blog.get()}
			infiniteQueryResult={result}
			selectNodes={selectPosts}
			Card={NodePost}
		/>
	);
}
