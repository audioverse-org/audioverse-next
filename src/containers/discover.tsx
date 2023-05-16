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
import { InputMaybe, Language } from '~src/__generated__/graphql';
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

function reduceNodes<T, N>(
	result: UseInfiniteQueryResult<T>,
	select: (page: T) => Maybe<N[]>
): N[] {
	return (
		result.data?.pages?.reduce<N[]>((acc, p) => {
			if (!p) return acc;
			const n = select(p);
			if (!n) return acc;
			return [...acc, ...n];
		}, []) || []
	);
}

type UseQueryFn<T> = (
	vars: {
		language: Language;
		first: number;
		after: InputMaybe<string>;
	},
	options: {
		getNextPageParam: (lastPage: Maybe<T>) => unknown;
	}
) => UseInfiniteQueryResult<T>;

type SectionDataSelector<T, N> = (page: T) => {
	nodes: Maybe<N[]>;
	pageInfo: {
		hasNextPage: boolean;
		endCursor: Maybe<string>;
	};
};

function useInfiniteDiscoverQuery<T, N>(
	useQueryFn: UseQueryFn<T>,
	select: SectionDataSelector<T, N>,
	first = 3
) {
	const language = useLanguageId();

	return useQueryFn(
		{
			language,
			first,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<T>) =>
				last && select(last).pageInfo.hasNextPage
					? {
							language,
							first: 6,
							after: select(last).pageInfo.endCursor,
					  }
					: undefined,
		}
	);
}

type Node<T> = T & {
	canonicalPath: string;
};

type SectionProps<T> = {
	heading: JSX.Element | string;
	nodes: Maybe<Node<T>[]>;
	Card: (props: { node: Node<T> }) => JSX.Element;
	seeAll?: {
		label: JSX.Element | string;
		url: string;
	};
	onPrev?: (() => void) | false;
	onNext?: (() => void) | false;
};

function Section<T>(props: SectionProps<T>): JSX.Element {
	const { heading, nodes, Card, seeAll, onPrev, onNext } = props;

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
					onPrev && onPrev();
				}}
				disabled={!onPrev}
			>
				prev
			</button>
			<button
				onClick={(e) => {
					e.preventDefault();
					onNext && onNext();
				}}
				disabled={!onNext}
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

type InfiniteSectionProps<T, N> = {
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

function InfiniteSection<T, N>({
	selectNodes,
	selectPageInfo,
	...props
}: InfiniteSectionProps<T, N>): JSX.Element {
	const [index, setIndex] = useState(0);
	const { data, fetchNextPage, isLoading } = props.infiniteQueryResult;

	const pages = useMemo(() => data?.pages || [], [data?.pages]);
	const cappedIndex = Math.min(index, pages.length - 1);
	const currentPage = pages[cappedIndex];
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
		<Section
			{...props}
			nodes={selectNodes(currentPage)}
			onPrev={index > 0 && prev}
			onNext={hasNextPage && next}
		/>
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
		<InfiniteSection<GetDiscoverRecentTeachingsQuery, CardRecordingFragment>
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
		<InfiniteSection<GetDiscoverTrendingTeachingsQuery, CardRecordingFragment>
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

export default function Discover(): JSX.Element {
	const languageRoute = useLanguageRoute();

	// TODO: Make sure all but the first two sections only load 3 items at a time
	const featuredTeachingsResult = useInfiniteDiscoverQuery(
		useInfiniteGetDiscoverFeaturedTeachingsQuery,
		(p: GetDiscoverFeaturedTeachingsQuery) => p.featuredTeachings
	);
	const featuredTeachings = reduceNodes(
		featuredTeachingsResult,
		(p: GetDiscoverFeaturedTeachingsQuery) => p.featuredTeachings.nodes
	);

	const blogPostsResult = useInfiniteDiscoverQuery(
		useInfiniteGetDiscoverBlogPostsQuery,
		(p: GetDiscoverBlogPostsQuery) => p.blogPosts
	);
	const blogPosts = reduceNodes(
		blogPostsResult,
		(p: GetDiscoverBlogPostsQuery) => p.blogPosts.nodes
	);

	const storySeasonsResult = useInfiniteDiscoverQuery(
		useInfiniteGetDiscoverStorySeasonsQuery,
		(p: GetDiscoverStorySeasonsQuery) => p.storySeasons
	);
	const storySeasons = reduceNodes(
		storySeasonsResult,
		(p: GetDiscoverStorySeasonsQuery) => p.storySeasons.nodes
	);

	const conferencesResult = useInfiniteDiscoverQuery(
		useInfiniteGetDiscoverConferencesQuery,
		(p: GetDiscoverConferencesQuery) => p.conferences
	);
	const conferences = reduceNodes(
		conferencesResult,
		(p: GetDiscoverConferencesQuery) => p.conferences.nodes
	);

	return (
		<div>
			<RecentTeachings />
			<TrendingTeachings />

			<Section
				heading={
					<FormattedMessage
						id="discover_featuredTeachingsHeading"
						defaultMessage="Featured Teachings"
					/>
				}
				nodes={featuredTeachings}
				Card={({ node }) => <CardRecording recording={node} />}
			/>

			<Section
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
				nodes={blogPosts}
				Card={({ node }) => <CardPost post={node} />}
			/>

			<Section
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
				nodes={storySeasons}
				Card={({ node }) => (
					<CardSequence sequence={node} recordings={node.recordings.nodes} />
				)}
			/>

			<Section
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
				nodes={conferences}
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
		</div>
	);
}
