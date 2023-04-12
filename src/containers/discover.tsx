import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import Button from '@components/molecules/button';
import CardCollection from '@components/molecules/card/collection';
import CardPost from '@components/molecules/card/post';
import CardRecording from '@components/molecules/card/recording';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import { GetDiscoverPageDataQuery } from '@lib/generated/graphql';
import root, {
	makeBlogPostListRoute,
	makeConferenceListRoute,
	makeStoryAlbumListPage,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ForwardIcon from '../../public/img/icons/icon-forward-light.svg';

import styles from './discover.module.scss';

export type DiscoverProps = GetDiscoverPageDataQuery;

export default function Discover({
	recentTeachings,
	trendingTeachings,
	featuredTeachings,
	storySeasons,
	conferences,
	blogPosts,
}: DiscoverProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const sections = [
		{
			heading: (
				<FormattedMessage
					id="discover_recentTeachingsHeading"
					defaultMessage="Recent Teachings"
				/>
			),
			cards: recentTeachings.nodes?.map((recording) => (
				<CardRecording recording={recording} key={recording.canonicalPath} />
			)),
			seeAll: (
				<FormattedMessage
					id="discover__recentTeachingsSeeAll"
					defaultMessage="See All Teachings"
				/>
			),
			url: root.lang(languageRoute).teachings.all.get(),
		},
		{
			heading: (
				<FormattedMessage
					id="discover_trendingTeachingsHeading"
					defaultMessage="Trending Teachings"
				/>
			),
			cards: trendingTeachings.nodes?.map(({ recording }) => (
				<CardRecording recording={recording} key={recording.canonicalPath} />
			)),
			seeAll: (
				<FormattedMessage
					id="discover__trendingTeachingsSeeAll"
					defaultMessage="See All Trending Teachings"
				/>
			),
			url: root.lang(languageRoute).teachings.trending.get(),
		},
		{
			heading: (
				<FormattedMessage
					id="discover_featuredTeachingsHeading"
					defaultMessage="Featured Teachings"
				/>
			),
			cards: featuredTeachings.nodes?.map((recording) => (
				<CardRecording recording={recording} key={recording.canonicalPath} />
			)),
			url: 'featured',
		},
		{
			heading: (
				<FormattedMessage
					id="discover_recentBlogHeading"
					defaultMessage="Recent Blog Posts"
				/>
			),
			cards: blogPosts.nodes?.map((post) => (
				<CardPost post={post} key={post.canonicalPath} />
			)),
			seeAll: (
				<FormattedMessage
					id="discover__recentBlogSeeAll"
					defaultMessage="See All Blog Posts"
				/>
			),
			url: makeBlogPostListRoute(languageRoute),
		},
		{
			heading: (
				<FormattedMessage
					id="discover__storiesHeading"
					defaultMessage="Recent Stories"
				/>
			),
			cards: storySeasons.nodes?.map((sequence) => (
				<CardSequence
					sequence={sequence}
					recordings={sequence.recordings.nodes}
					key={sequence.canonicalPath}
				/>
			)),
			seeAll: (
				<FormattedMessage
					id="discover__storiesSeeAll"
					defaultMessage="See All Stories"
				/>
			),
			url: makeStoryAlbumListPage(languageRoute),
		},
		{
			heading: (
				<FormattedMessage
					id="discover_conferencesHeading"
					defaultMessage="Recent Conferences"
				/>
			),
			cards: conferences.nodes?.map((conference) => (
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
			)),
			seeAll: (
				<FormattedMessage
					id="discover__conferencesSeeAll"
					defaultMessage="See All Conferences"
				/>
			),
			url: makeConferenceListRoute(languageRoute),
		},
	];

	return (
		<>
			{sections.map(({ heading, cards, seeAll, url }) => (
				<div key={url}>
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
			))}
		</>
	);
}
