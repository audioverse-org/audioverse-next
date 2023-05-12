import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useEffect, useState } from 'react';
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

export default function Discover(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const language = useLanguageId();

	/////////////

	const [recentTeachingsPageIndex, setRecentTeachingsPageIndex] = useState(0);
	const recentTeachingsResult = useInfiniteGetDiscoverRecentTeachingsQuery(
		{
			language,
			first: 6,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverRecentTeachingsQuery>) =>
				last && last.recentTeachings.pageInfo.hasNextPage
					? {
							language,
							first: 6,
							after: last.recentTeachings.pageInfo.endCursor,
					  }
					: undefined,
			onSuccess: (data) => {
				const pages = data.pages || [];
				const lastPage = pages[pages.length - 1];

				/* console.dir(
					{ data },
					{
						depth: null,
					}
				); */

				lastPage?.recentTeachings.pageInfo.hasNextPage &&
					recentTeachingsResult.fetchNextPage();
			},
		}
	);
	const recentTeachings =
		recentTeachingsResult.data?.pages?.[recentTeachingsPageIndex]
			?.recentTeachings.nodes || null;

	useEffect(() => {
		// console.log({
		// 	recentTeachingsPageIndex,
		// });
	}, [recentTeachingsPageIndex]);

	const recentTeachingsHasNext: boolean =
		recentTeachingsResult.data?.pages?.[recentTeachingsPageIndex]
			?.recentTeachings.pageInfo.hasNextPage || false;

	const recentTeachingsPrev =
		recentTeachingsPageIndex > 0
			? () => setRecentTeachingsPageIndex((i) => i - 1)
			: undefined;
	const recentTeachingsNext = async () => {
		if (recentTeachingsResult.hasNextPage) {
			await recentTeachingsResult.fetchNextPage();
		}
		setRecentTeachingsPageIndex((i) => i + 1);
	};

	const recentTeachingsSection = (
		<Section
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
				url: root.lang(languageRoute).teachings.all.get(),
			}}
			nodes={recentTeachings}
			Card={({ node }) => <CardRecording recording={node} />}
			onPrev={recentTeachingsPrev}
			onNext={recentTeachingsHasNext && recentTeachingsNext}
		/>
	);

	/////////////

	const trendingTeachingsResult = useInfiniteDiscoverQuery(
		useInfiniteGetDiscoverTrendingTeachingsQuery,
		(p: GetDiscoverTrendingTeachingsQuery) => ({
			...p.trendingTeachings,
			nodes: p.trendingTeachings.nodes?.map((n) => n.recording) || null,
		}),
		6
	);
	const trendingTeachings = reduceNodes(
		trendingTeachingsResult,
		(p: GetDiscoverTrendingTeachingsQuery) =>
			p.trendingTeachings.nodes?.map((n) => n.recording) || null
	);

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
			{recentTeachingsSection}

			<Section
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
					url: root.lang(languageRoute).teachings.trending.get(),
				}}
				nodes={trendingTeachings}
				Card={({ node }) => <CardRecording recording={node} />}
			/>

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
