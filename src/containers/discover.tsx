import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import Button from '~components/molecules/button';
import CardCollection from '~components/molecules/card/collection';
import CardPost from '~components/molecules/card/post';
import CardRecording from '~components/molecules/card/recording';
import CardSequence from '~components/molecules/card/sequence';
import CardGroup from '~components/molecules/cardGroup';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import ForwardIcon from '../../public/img/icons/icon-forward-light.svg';
import {
	useGetDiscoverBlogPostsQuery,
	useGetDiscoverConferencesQuery,
	useGetDiscoverFeaturedTeachingsQuery,
	useGetDiscoverRecentTeachingsQuery,
	useGetDiscoverStorySeasonsQuery,
	useGetDiscoverTrendingTeachingsQuery,
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
export default function Discover(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const languageId = getLanguageIdByRoute(languageRoute);

	const recentTeachings = useGetDiscoverRecentTeachingsQuery(
		{
			language: languageId,
			first: 6,
			after: null,
		},
		{
			select: (d) => d.recentTeachings.nodes,
		}
	);

	const trendingTeachings = useGetDiscoverTrendingTeachingsQuery(
		{
			language: languageId,
			first: 6,
			after: null,
		},
		{
			select: (d) => d.trendingTeachings.nodes,
		}
	);

	const featuredTeachings = useGetDiscoverFeaturedTeachingsQuery(
		{
			language: languageId,
			first: 3,
			after: null,
		},
		{
			select: (d) => d.featuredTeachings.nodes,
		}
	);

	const blogPosts = useGetDiscoverBlogPostsQuery(
		{
			language: languageId,
			first: 3,
			after: null,
		},
		{
			select: (d) => d.blogPosts.nodes,
		}
	);

	const storySeasons = useGetDiscoverStorySeasonsQuery(
		{
			language: languageId,
			first: 3,
			after: null,
		},
		{
			select: (d) => d.storySeasons.nodes,
		}
	);

	const conferences = useGetDiscoverConferencesQuery(
		{
			language: languageId,
			first: 3,
			after: null,
		},
		{
			select: (d) => d.conferences.nodes,
		}
	);

	return (
		<>
			<Section
				heading={
					<FormattedMessage
						id="discover_recentTeachingsHeading"
						defaultMessage="Recent Teachings"
					/>
				}
				cards={recentTeachings.data?.map((recording) => (
					<CardRecording recording={recording} key={recording.canonicalPath} />
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
				cards={trendingTeachings.data?.map(({ recording }) => (
					<CardRecording recording={recording} key={recording.canonicalPath} />
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
				cards={featuredTeachings.data?.map((recording) => (
					<CardRecording recording={recording} key={recording.canonicalPath} />
				))}
			/>

			<Section
				heading={
					<FormattedMessage
						id="discover_recentBlogHeading"
						defaultMessage="Recent Blog Posts"
					/>
				}
				cards={blogPosts.data?.map((post) => (
					<CardPost post={post} key={post.canonicalPath} />
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
				cards={storySeasons.data?.map((sequence) => (
					<CardSequence
						sequence={sequence}
						recordings={sequence.recordings.nodes}
						key={sequence.canonicalPath}
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
				cards={conferences.data?.map((conference) => (
					<CardCollection
						collection={conference}
						sequences={conference.sequences.nodes}
						recordings={
							!conference.sequences.nodes?.length
								? conference.recordings.nodes
								: null
						}
						key={conference.canonicalPath}
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
