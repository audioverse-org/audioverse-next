import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
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
	const r = useQueryFn(
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

	return {
		...r,
		data: reduceNodes(r, (p) => select(p).nodes),
	};
}

type Node<T> = T & {
	canonicalPath: string;
};

type SectionProps<T> = {
	heading: JSX.Element | string;
	nodes: Node<T>[];
	Card: (props: { node: Node<T> }) => JSX.Element;
	seeAll?: {
		label: JSX.Element | string;
		url: string;
	};
};

function Section<T>(props: SectionProps<T>): JSX.Element {
	const { heading, nodes, Card, seeAll } = props;

	return (
		<div className={styles.section}>
			<LineHeading>{heading}</LineHeading>
			<CardGroup>
				{nodes.map((n) => (
					<Card node={n} key={n.canonicalPath} />
				))}
			</CardGroup>
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

	const recentTeachings = useInfiniteDiscoverQuery(
		useInfiniteGetDiscoverRecentTeachingsQuery,
		(p: GetDiscoverRecentTeachingsQuery) => p.recentTeachings,
		6
	);

	const trendingTeachings = useInfiniteDiscoverQuery(
		useInfiniteGetDiscoverTrendingTeachingsQuery,
		(p: GetDiscoverTrendingTeachingsQuery) => ({
			...p.trendingTeachings,
			nodes: p.trendingTeachings.nodes?.map((n) => n.recording) || null,
		}),
		6
	);

	const featuredTeachings = useInfiniteDiscoverQuery(
		useInfiniteGetDiscoverFeaturedTeachingsQuery,
		(p: GetDiscoverFeaturedTeachingsQuery) => p.featuredTeachings
	);

	const blogPosts = useInfiniteDiscoverQuery(
		useInfiniteGetDiscoverBlogPostsQuery,
		(p: GetDiscoverBlogPostsQuery) => p.blogPosts
	);

	const storySeasons = useInfiniteDiscoverQuery(
		useInfiniteGetDiscoverStorySeasonsQuery,
		(p: GetDiscoverStorySeasonsQuery) => p.storySeasons
	);

	const conferences = useInfiniteDiscoverQuery(
		useInfiniteGetDiscoverConferencesQuery,
		(p: GetDiscoverConferencesQuery) => p.conferences
	);

	return (
		<div>
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
				nodes={recentTeachings.data}
				Card={({ node }) => <CardRecording recording={node} />}
			/>

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
				nodes={trendingTeachings.data}
				Card={({ node }) => <CardRecording recording={node} />}
			/>

			<Section
				heading={
					<FormattedMessage
						id="discover_featuredTeachingsHeading"
						defaultMessage="Featured Teachings"
					/>
				}
				nodes={featuredTeachings.data}
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
				nodes={blogPosts.data}
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
				nodes={storySeasons.data}
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
				nodes={conferences.data}
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
