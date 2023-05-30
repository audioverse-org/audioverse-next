import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useCallback, useMemo } from 'react';
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

const PRELOAD_COUNT = 3;

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
	Card: (props: { node: Node<N> }) => JSX.Element;
};

function Section<T, N>({
	heading,
	infiniteQueryResult,
	selectNodes,
	Card,
	seeAllUrl,
	...props
}: SectionProps<T, N>): JSX.Element {
	const { data, fetchNextPage } = infiniteQueryResult;
	const pages = useMemo(() => data?.pages || [], [data?.pages]);
	const nodes: Node<N>[] = useMemo(() => {
		return pages.flatMap(selectNodes).filter((n): n is Node<N> => !!n);
	}, [pages, selectNodes]);

	const preload = useCallback(({index, total}: {
		index: number;
		total: number;
	}) => {
		if (index + PRELOAD_COUNT >= total) {
			// console.log('fetching next page')
			fetchNextPage()
		}
	}, [fetchNextPage]);

	const cards = useMemo(() => nodes.map(
		(n) => <Card node={n} key={n.canonicalPath} />
	), [Card, nodes])

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
				onIndexChange={preload}
				items={cards}
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

	const Card = useCallback(({ node }: {
		node: Node<CardRecordingFragment>
	}) => <CardRecording recording={node} />, [])

	const selectNodes = useCallback((p: GetDiscoverRecentTeachingsQuery | undefined) => p?.recentTeachings.nodes, [])

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
			selectNodes={selectNodes}
			Card={Card}
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

	const Card = useCallback(({ node }: {
		node: Node<CardRecordingFragment>
	}) => <CardRecording recording={node} />, [])

	const selectNodes = useCallback((p: GetDiscoverTrendingTeachingsQuery | undefined) => p?.trendingTeachings.nodes?.map((n) => n.recording), [])

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
			selectNodes={selectNodes}
			Card={Card}
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

	const Card = useCallback(({ node }: {
		node: Node<CardRecordingFragment>
	}) => <CardRecording recording={node} />, [])

	const selectNodes = useCallback((p: GetDiscoverFeaturedTeachingsQuery | undefined) => p?.featuredTeachings.nodes, [])

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
			selectNodes={selectNodes}
			Card={Card}
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

	const Card = useCallback(({ node }: {
		node: Node<CardPostFragment>
	}) => <CardPost post={node} />, [])

	const selectNodes = useCallback((p: GetDiscoverBlogPostsQuery | undefined) => p?.blogPosts.nodes, [])

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
			selectNodes={selectNodes}
			Card={Card}
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

	const Card = useCallback(({ node }: {
		node: Node<StorySeason>
	}) => (
		<CardSequence sequence={node} recordings={node.recordings.nodes} />
	), [])

	const selectNodes = useCallback((p: GetDiscoverStorySeasonsQuery | undefined) => p?.storySeasons.nodes, [])

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
			selectNodes={selectNodes}
			Card={Card}
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

	const Card = useCallback(({ node }: {
		node: Node<Conference>
	}) => (
		<CardCollection
			collection={node}
			sequences={node.sequences.nodes}
			recordings={node.sequences.nodes?.length ? null : node.recordings.nodes}
		/>
	), [])

	const selectNodes = useCallback((p: GetDiscoverConferencesQuery | undefined) => p?.conferences.nodes, [])

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
			selectNodes={selectNodes}
			Card={Card}
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
