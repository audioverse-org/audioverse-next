import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { UseInfiniteQueryResult } from 'react-query';

import LineHeading from '~components/atoms/lineHeading';
import Button from '~components/molecules/button';
import CardCollection from '~components/molecules/card/collection';
import CardPost from '~components/molecules/card/post';
import CardRecording from '~components/molecules/card/recording';
import CardSequence from '~components/molecules/card/sequence';
import CardGroup from '~components/molecules/cardGroup';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import { CardPostFragment } from '~src/components/molecules/card/__generated__/post';
import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import { useLanguageId } from '~src/lib/useLanguageId';

import ForwardIcon from '../../public/img/icons/icon-forward-light.svg';
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

type Node<T> = T & {
	canonicalPath: string;
};

type SectionProps<T, N> = {
	heading: JSX.Element | string;
	infiniteQueryResult: UseInfiniteQueryResult<T>;
	selectNodes: (page?: T) => Maybe<Node<N>[]>;
	selectPageInfo: (page?: T) =>
		| {
				hasNextPage: boolean;
				endCursor: Maybe<string>;
		  }
		| undefined;
	Card: (props: { node: Node<N> }) => JSX.Element;
	seeAll?: {
		label: JSX.Element | string;
		url: string;
	};
};

function Section<T, N>({
	heading,
	infiniteQueryResult,
	selectNodes,
	selectPageInfo,
	Card,
	seeAll,
}: SectionProps<T, N>): JSX.Element {
	const [index, setIndex] = useState(0);
	const { data, fetchNextPage, isLoading } = infiniteQueryResult;

	const pages = useMemo(() => data?.pages || [], [data?.pages]);
	const cappedIndex = Math.min(index, pages.length - 1);
	const currentPage = pages[cappedIndex];
	const nodes = selectNodes(currentPage);
	const { hasNextPage = false } = selectPageInfo(currentPage) || {};

	useEffect(() => {
		const lastPage = pages[pages.length - 1];
		const { hasNextPage = false } = selectPageInfo(lastPage) || {};
		const leadCount = pages.length - (index + 1);

		if (isLoading) return;
		if (!hasNextPage) return;
		if (leadCount >= 3) return;

		fetchNextPage();
	}, [pages, fetchNextPage, index, isLoading, selectPageInfo]);

	const prev = () => setIndex((i) => i - 1);
	const next = () => setIndex((i) => i + 1);

	return (
		<div className={styles.section}>
			<LineHeading>{heading}</LineHeading>
			<CardGroup>
				{nodes?.map((n) => (
					<Card node={n} key={n.canonicalPath} />
				))}
			</CardGroup>
			<button
				onClick={(e) => {
					e.preventDefault();
					prev();
				}}
				disabled={index < 1}
			>
				prev
			</button>
			<button
				onClick={(e) => {
					e.preventDefault();
					next();
				}}
				disabled={!hasNextPage}
			>
				next
			</button>
			<br />
			{seeAll && (
				<Button
					type="secondary"
					text={seeAll.label}
					href={seeAll.url}
					IconRight={ForwardIcon}
					className={styles.seeAllButton}
				/>
			)}
		</div>
	);
}

function RecentTeachings(): JSX.Element {
	const language = useLanguageId();
	const route = useLanguageRoute();
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
			heading={
				<FormattedMessage
					id="discover_recentTeachingsHeading"
					defaultMessage="Recent Teachings"
				/>
			}
			seeAll={{
				label: (
					<FormattedMessage
						id="discover__recentTeachingsSeeAll"
						defaultMessage="See All Teachings"
					/>
				),
				url: root.lang(route).teachings.all.get(),
			}}
			infiniteQueryResult={result}
			selectNodes={(p) => p?.recentTeachings.nodes}
			selectPageInfo={(p) => p?.recentTeachings.pageInfo}
			Card={({ node }) => <CardRecording recording={node} />}
		/>
	);
}

function TrendingTeachings(): JSX.Element {
	const language = useLanguageId();
	const route = useLanguageRoute();
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
			heading={
				<FormattedMessage
					id="discover_trendingTeachingsHeading"
					defaultMessage="Trending Teachings"
				/>
			}
			seeAll={{
				label: (
					<FormattedMessage
						id="discover__trendingTeachingsSeeAll"
						defaultMessage="See All Trending Teachings"
					/>
				),
				url: root.lang(route).teachings.trending.get(),
			}}
			infiniteQueryResult={result}
			selectNodes={(p) => p?.trendingTeachings.nodes?.map((n) => n.recording)}
			selectPageInfo={(p) => p?.trendingTeachings.pageInfo}
			Card={({ node }) => <CardRecording recording={node} />}
		/>
	);
}

function FeaturedTeachings(): JSX.Element {
	const language = useLanguageId();
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
			heading={
				<FormattedMessage
					id="discover_featuredTeachingsHeading"
					defaultMessage="Featured Teachings"
				/>
			}
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
			heading={
				<FormattedMessage
					id="discover_recentBlogHeading"
					defaultMessage="Recent Blog Posts"
				/>
			}
			seeAll={{
				label: (
					<FormattedMessage
						id="discover__recentBlogSeeAll"
						defaultMessage="See All Blog Posts"
					/>
				),
				url: root.lang(languageRoute).blog.get(),
			}}
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
			heading={
				<FormattedMessage
					id="discover__storiesHeading"
					defaultMessage="Recent Stories"
				/>
			}
			seeAll={{
				label: (
					<FormattedMessage
						id="discover__storiesSeeAll"
						defaultMessage="See All Stories"
					/>
				),
				url: root.lang(languageRoute).stories.albums.get(),
			}}
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
			heading={
				<FormattedMessage
					id="discover_conferencesHeading"
					defaultMessage="Recent Conferences"
				/>
			}
			seeAll={{
				label: (
					<FormattedMessage
						id="discover__conferencesSeeAll"
						defaultMessage="See All Conferences"
					/>
				),
				url: root.lang(languageRoute).conferences.get(),
			}}
			infiniteQueryResult={result}
			selectNodes={(p) => p?.conferences.nodes}
			selectPageInfo={(p) => p?.conferences.pageInfo}
			Card={({ node }) => (
				<CardCollection
					collection={node}
					sequences={node.sequences.nodes}
					recordings={
						!node.sequences.nodes?.length ? node.recordings.nodes : null
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
