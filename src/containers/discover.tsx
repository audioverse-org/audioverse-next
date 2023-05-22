import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { UseInfiniteQueryResult } from 'react-query';

import LineHeading from '~components/atoms/lineHeading';
import CardCollection from '~components/molecules/card/collection';
import CardPost from '~components/molecules/card/post';
import CardRecording from '~components/molecules/card/recording';
import CardSequence from '~components/molecules/card/sequence';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import { CardPostFragment } from '~src/components/molecules/card/__generated__/post';
import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import { useLanguageId } from '~src/lib/useLanguageId';

import {
	GetDiscoverBlogPostsQuery,
	GetDiscoverConferencesQuery,
	GetDiscoverFeaturedTeachingsQuery,
	GetDiscoverRecentTeachingsQuery,
	GetDiscoverStorySeasonsQuery,
	GetDiscoverTrendingTeachingsQuery,
	useInfiniteGetDiscoverBlogPostsQuery,
	useInfiniteGetDiscoverConferencesQuery,
	useInfiniteGetDiscoverFeaturedTeachingsQuery,
	useInfiniteGetDiscoverRecentTeachingsQuery,
	useInfiniteGetDiscoverStorySeasonsQuery,
	useInfiniteGetDiscoverTrendingTeachingsQuery,
} from './__generated__/discover';
import styles from './discover.module.scss';
import Slider from './discover.slider';

const PRELOAD_COUNT = 18;

type Node<T> = T & {
	canonicalPath: string;
};

type SectionProps<T, N> = {
	heading: string;
	previous: string;
	next: string;
	rows?: number;
	seeAllUrl?: string;
	infiniteQueryResult: UseInfiniteQueryResult<T>;
	selectNodes: (page?: T) => Maybe<Node<N>[]>;
	selectPageInfo: (page?: T) =>
		| {
				hasNextPage: boolean;
				endCursor: Maybe<string>;
		  }
		| undefined;
	Card: (props: { node: Node<N> }) => JSX.Element;
};

function Section<T, N>({
	heading,
	infiniteQueryResult,
	selectNodes,
	selectPageInfo,
	Card,
	seeAllUrl,
	...props
}: SectionProps<T, N>): JSX.Element {
	const [index, setIndex] = useState(0);
	const { data, fetchNextPage, isLoading } = infiniteQueryResult;
	const pages = useMemo(() => data?.pages || [], [data?.pages]);
	// const cappedIndex = Math.min(index, pages.length - 1);
	// const currentPage = pages[cappedIndex];
	const nodes: Node<N>[] = pages
		.flatMap(selectNodes)
		.filter((n): n is Node<N> => !!n);
	// const { hasNextPage = false } = selectPageInfo(currentPage) || {};

	useEffect(() => {
		const lastPage = pages[pages.length - 1];
		const { hasNextPage = false } = selectPageInfo(lastPage) || {};
		const leadCount = nodes.length - (index + 1);

		if (isLoading) return;
		if (!hasNextPage) return;
		if (leadCount >= PRELOAD_COUNT) return;

		fetchNextPage();
	}, [pages, fetchNextPage, index, isLoading, selectPageInfo, nodes.length]);

	return (
		<div className={styles.section}>
			<LineHeading variant="overline">
				<span>{heading}</span>
				{seeAllUrl && (
					<a href={seeAllUrl}>
						<FormattedMessage id="discover__seeAll" defaultMessage="See All" />
					</a>
				)}
			</LineHeading>
			<Slider
				{...props}
				onIndexChange={({ indexEnd }) => {
					setIndex(indexEnd);
				}}
				items={nodes?.map((n) => <Card node={n} key={n.canonicalPath} />) ?? []}
			/>
		</div>
	);
}

function RecentTeachings(): JSX.Element {
	const language = useLanguageId();
	const route = useLanguageRoute();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverRecentTeachingsQuery(
		{
			language,
			first: 6,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverRecentTeachingsQuery>) =>
				last?.recentTeachings.pageInfo.hasNextPage
					? {
							language,
							first: 6,
							after: last.recentTeachings.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverRecentTeachingsQuery, CardRecordingFragment>
			heading={intl.formatMessage({
				id: 'discover_recentTeachingsHeading',
				defaultMessage: 'Recent Teachings',
			})}
			previous={intl.formatMessage({
				id: 'discover__recentTeachingsPrevious',
				defaultMessage: 'Previous recent teachings',
			})}
			next={intl.formatMessage({
				id: 'discover__recentTeachingsNext',
				defaultMessage: 'Next recent teachings',
			})}
			seeAllUrl={root.lang(route).teachings.all.get()}
			infiniteQueryResult={result}
			selectNodes={(p) => p?.recentTeachings.nodes}
			selectPageInfo={(p) => p?.recentTeachings.pageInfo}
			Card={({ node }) => <CardRecording recording={node} />}
			rows={2}
		/>
	);
}

function TrendingTeachings(): JSX.Element {
	const language = useLanguageId();
	const route = useLanguageRoute();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverTrendingTeachingsQuery(
		{
			language,
			first: 6,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverTrendingTeachingsQuery>) =>
				last?.trendingTeachings.pageInfo.hasNextPage
					? {
							language,
							first: 6,
							after: last.trendingTeachings.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverTrendingTeachingsQuery, CardRecordingFragment>
			heading={intl.formatMessage({
				id: 'discover_trendingTeachingsHeading',
				defaultMessage: 'Trending Teachings',
			})}
			previous={intl.formatMessage({
				id: 'discover__trendingTeachingsPrevious',
				defaultMessage: 'Previous trending teachings',
			})}
			next={intl.formatMessage({
				id: 'discover__trendingTeachingsNext',
				defaultMessage: 'Next trending teachings',
			})}
			seeAllUrl={root.lang(route).teachings.trending.get()}
			infiniteQueryResult={result}
			selectNodes={(p) => p?.trendingTeachings.nodes?.map((n) => n.recording)}
			selectPageInfo={(p) => p?.trendingTeachings.pageInfo}
			Card={({ node }) => <CardRecording recording={node} />}
			rows={2}
		/>
	);
}

function FeaturedTeachings(): JSX.Element {
	const language = useLanguageId();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverFeaturedTeachingsQuery(
		{
			language,
			first: 3,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverFeaturedTeachingsQuery>) =>
				last?.featuredTeachings.pageInfo.hasNextPage
					? {
							language,
							first: 3,
							after: last.featuredTeachings.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverFeaturedTeachingsQuery, CardRecordingFragment>
			heading={intl.formatMessage({
				id: 'discover_featuredTeachingsHeading',
				defaultMessage: 'Featured Teachings',
			})}
			previous={intl.formatMessage({
				id: 'discover__featuredTeachingsPrevious',
				defaultMessage: 'Previous featured teachings',
			})}
			next={intl.formatMessage({
				id: 'discover__featuredTeachingsNext',
				defaultMessage: 'Next featured teachings',
			})}
			infiniteQueryResult={result}
			selectNodes={(p) => p?.featuredTeachings.nodes}
			selectPageInfo={(p) => p?.featuredTeachings.pageInfo}
			Card={({ node }) => <CardRecording recording={node} />}
		/>
	);
}

function BlogPosts(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const language = useLanguageId();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverBlogPostsQuery(
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
			selectNodes={(p) => p?.blogPosts.nodes}
			selectPageInfo={(p) => p?.blogPosts.pageInfo}
			Card={({ node }) => <CardPost post={node} />}
		/>
	);
}

type StorySeason = NonNullable<
	GetDiscoverStorySeasonsQuery['storySeasons']['nodes']
>[0];

function StorySeasons(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const language = useLanguageId();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverStorySeasonsQuery(
		{
			language,
			first: 3,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverStorySeasonsQuery>) =>
				last?.storySeasons.pageInfo.hasNextPage
					? {
							language,
							first: 3,
							after: last.storySeasons.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverStorySeasonsQuery, StorySeason>
			heading={intl.formatMessage({
				id: 'discover__storiesHeading',
				defaultMessage: 'Recent Stories',
			})}
			previous={intl.formatMessage({
				id: 'discover__storiesPrevious',
				defaultMessage: 'Previous recent stories',
			})}
			next={intl.formatMessage({
				id: 'discover__storiesNext',
				defaultMessage: 'Next recent stories',
			})}
			seeAllUrl={root.lang(languageRoute).stories.albums.get()}
			infiniteQueryResult={result}
			selectNodes={(p) => p?.storySeasons.nodes}
			selectPageInfo={(p) => p?.storySeasons.pageInfo}
			Card={({ node }) => (
				<CardSequence sequence={node} recordings={node.recordings.nodes} />
			)}
		/>
	);
}

type Conference = NonNullable<
	GetDiscoverConferencesQuery['conferences']['nodes']
>[0];

function Conferences(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const language = useLanguageId();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverConferencesQuery(
		{
			language,
			first: 3,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverConferencesQuery>) =>
				last?.conferences.pageInfo.hasNextPage
					? {
							language,
							first: 3,
							after: last.conferences.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverConferencesQuery, Conference>
			heading={intl.formatMessage({
				id: 'discover_conferencesHeading',
				defaultMessage: 'Recent Conferences',
			})}
			previous={intl.formatMessage({
				id: 'discover__conferencesPrevious',
				defaultMessage: 'Previous recent conferences',
			})}
			next={intl.formatMessage({
				id: 'discover__conferencesNext',
				defaultMessage: 'Next recent conferences',
			})}
			seeAllUrl={root.lang(languageRoute).conferences.get()}
			infiniteQueryResult={result}
			selectNodes={(p) => p?.conferences.nodes}
			selectPageInfo={(p) => p?.conferences.pageInfo}
			Card={({ node }) => (
				<CardCollection
					collection={node}
					sequences={node.sequences.nodes}
					recordings={
						node.sequences.nodes?.length ? null : node.recordings.nodes
					}
				/>
			)}
		/>
	);
}

export default function Discover(): JSX.Element {
	return (
		<div>
			<RecentTeachings />
			<TrendingTeachings />
			<FeaturedTeachings />
			<BlogPosts />
			<StorySeasons />
			<Conferences />
		</div>
	);
}
