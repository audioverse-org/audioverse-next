import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import Button from '@components/molecules/button';
import CardCollection from '@components/molecules/card/collection';
import CardRecording from '@components/molecules/card/recording';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import { GetDiscoverPageDataQuery } from '@lib/generated/graphql';
import {
	makeConferenceListRoute,
	makeSermonListRoute,
	makeStoryAlbumListPage,
	makeTrendingSermonRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ForwardIcon from '../../public/img/icon-forward-light.svg';

import styles from './discover.module.scss';

export default function Discover({
	data: { recentTeachings, trendingTeachings, storySeasons, conferences },
}: {
	data: GetDiscoverPageDataQuery;
}): JSX.Element {
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
					defaultMessage="See All Recent Teachings"
				/>
			),
			url: makeSermonListRoute(languageRoute, 'all', 1),
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
			url: makeTrendingSermonRoute(languageRoute),
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
					defaultMessage="See All Recent Stories"
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
					key={conference.canonicalPath}
				/>
			)),
			seeAll: (
				<FormattedMessage
					id="discover__conferencesSeeAll"
					defaultMessage="See All Recent Conferences"
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
					<Button
						type="secondary"
						text={seeAll}
						href={url}
						Icon={ForwardIcon}
						iconPosition="right"
						className={styles.seeAllButton}
					/>
				</div>
			))}
		</>
	);
}
