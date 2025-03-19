import React from 'react';
import { useIntl } from 'react-intl';

import { CardPostFragment } from '~src/components/molecules/card/__generated__/post';
import CardPost from '~src/components/molecules/card/post';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import root from '~src/lib/routes';

import Section from '.';
import { useInfiniteGetSectionBlogPostsQuery } from './__generated__/blogPosts';

export default function BlogPosts(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const intl = useIntl();

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionBlogPostsQuery}
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
			Card={(p: { node: CardPostFragment }) => <CardPost post={p.node} />}
		/>
	);
}
