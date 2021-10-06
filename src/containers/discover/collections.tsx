import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import Button from '@components/molecules/button';
import CardCollection from '@components/molecules/card/collection';
import CardPerson from '@components/molecules/card/person';
import CardSequence from '@components/molecules/card/sequence';
import CardSponsor from '@components/molecules/card/sponsor';
import CardGroup from '@components/molecules/cardGroup';
import { GetDiscoverCollectionsPageDataQuery } from '@lib/generated/graphql';
import {
	makeAudiobookListRoute,
	makeConferenceListRoute,
	makePresenterListRoute,
	makeSeriesListRoute,
	makeSongAlbumsListRoute,
	makeSponsorListRoute,
	makeStoryAlbumListPage,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ForwardIcon from '../../../public/img/icon-forward-light.svg';

import styles from './collections.module.scss';

export default function DiscoverCollections({
	data: {
		sequence,
		persons,
		serieses,
		conferences,
		sponsors,
		audiobooks,
		storySeasons,
		musicAlbums,
	},
}: {
	data: GetDiscoverCollectionsPageDataQuery;
}): JSX.Element {
	const language = useLanguageRoute();

	const makeSeeAllButton = (route: string) => (
		<Button
			type="secondary"
			href={route}
			text={
				<FormattedMessage
					id="discoverCollections_seeAll"
					defaultMessage="See All"
				/>
			}
			IconLeft={ForwardIcon}
			className={styles.seeAllButton}
		/>
	);
	return (
		<div>
			{sequence && (
				<>
					<LineHeading>
						<FormattedMessage
							id="discoverCollections_featuredCollectionHeading"
							defaultMessage="Featured Collection"
						/>
					</LineHeading>
					<div className={styles.featured}>
						<CardSequence sequence={sequence} />
					</div>
				</>
			)}
			<LineHeading>
				<FormattedMessage
					id="discoverCollections_speakersHeading"
					defaultMessage="Speakers"
				/>
			</LineHeading>
			<CardGroup className={styles.cardGroup}>
				{persons.nodes?.map((s) => (
					<CardPerson person={s} key={s.canonicalPath} />
				))}
			</CardGroup>
			{makeSeeAllButton(makePresenterListRoute(language, 1))}
			<LineHeading>
				<FormattedMessage
					id="discoverCollections_seriesHeading"
					defaultMessage="Series"
				/>
			</LineHeading>
			<CardGroup className={styles.cardGroup}>
				{serieses.nodes?.map((s) => (
					<CardSequence sequence={s} key={s.canonicalPath} />
				))}
			</CardGroup>
			{makeSeeAllButton(makeSeriesListRoute(language, 1))}
			<LineHeading>
				<FormattedMessage
					id="discoverCollections_conferencesHeading"
					defaultMessage="Conferences"
				/>
			</LineHeading>
			<CardGroup className={styles.cardGroup}>
				{conferences.nodes?.map((n) => (
					<CardCollection collection={n} key={n.canonicalPath} />
				))}
			</CardGroup>
			{makeSeeAllButton(makeConferenceListRoute(language, 1))}
			<LineHeading>
				<FormattedMessage
					id="discoverCollections_sponsorsHeading"
					defaultMessage="Sponsors"
				/>
			</LineHeading>
			<CardGroup className={styles.cardGroup}>
				{sponsors.nodes?.map((n) => (
					<CardSponsor sponsor={n} key={n.canonicalPath} />
				))}
			</CardGroup>
			{makeSeeAllButton(makeSponsorListRoute(language, 1))}
			<LineHeading>
				<FormattedMessage
					id="discoverCollections_audiobooksHeading"
					defaultMessage="Audiobooks"
				/>
			</LineHeading>
			<CardGroup className={styles.cardGroup}>
				{audiobooks.nodes?.map((n) => (
					<CardSequence sequence={n} key={n.canonicalPath} />
				))}
			</CardGroup>
			{makeSeeAllButton(makeAudiobookListRoute(language, 1))}
			<LineHeading>
				<FormattedMessage
					id="discoverCollections_storiesHeading"
					defaultMessage="Stories"
				/>
			</LineHeading>
			<CardGroup className={styles.cardGroup}>
				{storySeasons.nodes?.map((n) => (
					<CardSequence sequence={n} key={n.canonicalPath} />
				))}
			</CardGroup>
			{makeSeeAllButton(makeStoryAlbumListPage(language, 1))}
			<LineHeading>
				<FormattedMessage
					id="discoverCollections_scriptureSongsHeading"
					defaultMessage="Scripture Songs"
				/>
			</LineHeading>
			<CardGroup className={styles.cardGroup}>
				{musicAlbums.nodes?.map((n) => (
					<CardSequence sequence={n} key={n.canonicalPath} />
				))}
			</CardGroup>
			{makeSeeAllButton(makeSongAlbumsListRoute(language, 1))}
		</div>
	);
}
