import React from 'react';
import { useIntl } from 'react-intl';

import { CardPostFragment } from '~src/components/molecules/card/__generated__/post';
import CardPost from '~src/components/molecules/card/post';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import Section from '.';
import {
	GetDiscoverBlogPostsQuery,
	useInfiniteGetDiscoverBlogPostsQuery,
} from './__generated__/blogPosts';

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
			Card={(p) => <CardPost post={p.node} />}
		/>
	);
}
