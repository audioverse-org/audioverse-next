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
import { CardCollectionFragment } from '~src/components/molecules/card/__generated__/collection';
import { CardPostFragment } from '~src/components/molecules/card/__generated__/post';
import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
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

type SectionProps = {
	heading: JSX.Element | string;
	cards: JSX.Element[] | undefined;
};

type SectionPropsWithButton = SectionProps & {
	seeAll: JSX.Element | string;
	url: string;
};

function Section(props: SectionProps | SectionPropsWithButton): JSX.Element {
	const { heading, cards } = props;
	const seeAll = 'seeAll' in props ? props.seeAll : undefined;
	const url = 'url' in props ? props.url : undefined;

	return (
		<div>
			<LineHeading>{heading}</LineHeading>
			<CardGroup>{cards}</CardGroup>
			{seeAll ? (
				<Button
					type="secondary"
					text={seeAll}
					href={url}
					IconRight={ForwardIcon}
					className={styles.seeAllButton}
				/>
			) : (
				<div className={styles.seeAllButton} />
			)}
		</div>
	);
}

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

function useInfiniteDiscoverQuery<T, N>(
	useQueryFn: (
		vars: {
			language: Language;
			first: number;
			after: InputMaybe<string>;
		},
		options: {
			getNextPageParam: (lastPage: Maybe<T>) => unknown;
		}
	) => UseInfiniteQueryResult<T>,
	select: (p: T) => {
		nodes: Maybe<N[]>;
		pageInfo: {
			hasNextPage: boolean;
			endCursor: Maybe<string>;
		};
	},
	first = 3
) {
	const language = useLanguageId();

	const result = useQueryFn(
		{
			language,
			first,
			after: null,
		},
		{
			getNextPageParam: (lastPage: Maybe<T>) =>
				lastPage && select(lastPage).pageInfo.hasNextPage
					? {
							language,
							first: 6,
							after: select(lastPage).pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return reduceNodes(result, (p) => select(p).nodes);
}

export default function Discover(): JSX.Element {
	const languageRoute = useLanguageRoute();

	const recentTeachings = useInfiniteDiscoverQuery<
		GetDiscoverRecentTeachingsQuery,
		CardRecordingFragment
	>(useInfiniteGetDiscoverRecentTeachingsQuery, (p) => p.recentTeachings);

	const trendingTeachings = useInfiniteDiscoverQuery<
		GetDiscoverTrendingTeachingsQuery,
		CardRecordingFragment
	>(useInfiniteGetDiscoverTrendingTeachingsQuery, (p) => ({
		...p.trendingTeachings,
		nodes: p.trendingTeachings.nodes?.map((n) => n.recording) || null,
	}));

	const featuredTeachings = useInfiniteDiscoverQuery<
		GetDiscoverFeaturedTeachingsQuery,
		CardRecordingFragment
	>(useInfiniteGetDiscoverFeaturedTeachingsQuery, (p) => p.featuredTeachings);

	const blogPosts = useInfiniteDiscoverQuery<
		GetDiscoverBlogPostsQuery,
		CardPostFragment
	>(useInfiniteGetDiscoverBlogPostsQuery, (p) => p.blogPosts);

	const storySeasons = useInfiniteDiscoverQuery<
		GetDiscoverStorySeasonsQuery,
		CardSequenceFragment & {
			recordings: {
				nodes: Maybe<CardRecordingFragment[]>;
			};
		}
	>(useInfiniteGetDiscoverStorySeasonsQuery, (p) => p.storySeasons);

	const conferences = useInfiniteDiscoverQuery<
		GetDiscoverConferencesQuery,
		CardCollectionFragment & {
			sequences: {
				nodes: Maybe<CardSequenceFragment[]>;
			};
			recordings: {
				nodes: Maybe<CardRecordingFragment[]>;
			};
		}
	>(useInfiniteGetDiscoverConferencesQuery, (p) => p.conferences);

	return (
		<>
			<Section
				heading={
					<FormattedMessage
						id="discover_recentTeachingsHeading"
						defaultMessage="Recent Teachings"
					/>
				}
				cards={recentTeachings.map((r) => (
					<CardRecording recording={r} key={r.canonicalPath} />
				))}
				seeAll={
					<FormattedMessage
						id="discover__recentTeachingsSeeAll"
						defaultMessage="See All Teachings"
					/>
				}
				url={root.lang(languageRoute).teachings.all.get()}
			/>

			<Section
				heading={
					<FormattedMessage
						id="discover_trendingTeachingsHeading"
						defaultMessage="Trending Teachings"
					/>
				}
				cards={trendingTeachings.map((r) => (
					<CardRecording recording={r} key={r.canonicalPath} />
				))}
				seeAll={
					<FormattedMessage
						id="discover__trendingTeachingsSeeAll"
						defaultMessage="See All Trending Teachings"
					/>
				}
				url={root.lang(languageRoute).teachings.trending.get()}
			/>

			<Section
				heading={
					<FormattedMessage
						id="discover_featuredTeachingsHeading"
						defaultMessage="Featured Teachings"
					/>
				}
				cards={featuredTeachings.map((r) => (
					<CardRecording recording={r} key={r.canonicalPath} />
				))}
			/>

			<Section
				heading={
					<FormattedMessage
						id="discover_recentBlogHeading"
						defaultMessage="Recent Blog Posts"
					/>
				}
				cards={blogPosts.map((p) => (
					<CardPost post={p} key={p.canonicalPath} />
				))}
				seeAll={
					<FormattedMessage
						id="discover__recentBlogSeeAll"
						defaultMessage="See All Blog Posts"
					/>
				}
				url={root.lang(languageRoute).blog.get()}
			/>

			<Section
				heading={
					<FormattedMessage
						id="discover__storiesHeading"
						defaultMessage="Recent Stories"
					/>
				}
				cards={storySeasons.map((s) => (
					<CardSequence
						sequence={s}
						recordings={s.recordings.nodes}
						key={s.canonicalPath}
					/>
				))}
				seeAll={
					<FormattedMessage
						id="discover__storiesSeeAll"
						defaultMessage="See All Stories"
					/>
				}
				url={root.lang(languageRoute).stories.albums.get()}
			/>

			<Section
				heading={
					<FormattedMessage
						id="discover_conferencesHeading"
						defaultMessage="Recent Conferences"
					/>
				}
				cards={conferences.map((c) => (
					<CardCollection
						collection={c}
						sequences={c.sequences.nodes}
						recordings={!c.sequences.nodes?.length ? c.recordings.nodes : null}
						key={c.canonicalPath}
					/>
				))}
				seeAll={
					<FormattedMessage
						id="discover__conferencesSeeAll"
						defaultMessage="See All Conferences"
					/>
				}
				url={root.lang(languageRoute).conferences.get()}
			/>
		</>
	);
}
