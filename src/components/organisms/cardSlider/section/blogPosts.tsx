import React from 'react';
import { useIntl } from 'react-intl';

import { CardPostFragment } from '~src/components/molecules/card/__generated__/post';
import CardPost from '~src/components/molecules/card/post';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import Section, { SectionNode } from '.';
import {
	GetDiscoverBlogPostsQuery,
	useInfiniteGetDiscoverBlogPostsQuery,
} from './__generated__/blogPosts';

function NodePost({
	node,
}: {
	node: SectionNode<CardPostFragment>;
}): JSX.Element {
	return <CardPost post={node} />;
}

export default function BlogPosts(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const intl = useIntl();

	return (
		<Section<GetDiscoverBlogPostsQuery, CardPostFragment>
			infiniteQuery={useInfiniteGetDiscoverBlogPostsQuery}
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
			Card={NodePost}
		/>
	);
}
