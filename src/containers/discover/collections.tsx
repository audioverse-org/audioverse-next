import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import Button from '~components/molecules/button';
import CardCollection from '~components/molecules/card/collection';
import CardFavoriteEntity from '~components/molecules/card/favoriteEntity';
import CardPerson from '~components/molecules/card/person';
import CardSequence from '~components/molecules/card/sequence';
import CardSponsor from '~components/molecules/card/sponsor';
import CardGroup from '~components/molecules/cardGroup';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import ForwardIcon from '~public/img/icons/icon-forward-light.svg';

import { GetDiscoverCollectionsPageDataQuery } from './__generated__/collections';
import styles from './collections.module.scss';

export type IDiscoverCollectionsProps = GetDiscoverCollectionsPageDataQuery;

export default function DiscoverCollections({
	websiteFeaturedCollection,
	persons,
	serieses,
	conferences,
	sponsors,
	audiobooks,
	storySeasons,
	musicAlbums,
}: IDiscoverCollectionsProps): JSX.Element {
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
			{websiteFeaturedCollection && (
				<>
					<LineHeading>
						<FormattedMessage
							id="discoverCollections_featuredCollectionHeading"
							defaultMessage="Featured Collection"
						/>
					</LineHeading>
					<div className={styles.featured}>
						<CardFavoriteEntity
							entity={websiteFeaturedCollection}
							disableSequenceStack
						/>
					</div>
				</>
			)}
			<LineHeading>
				<FormattedMessage
					id="discoverCollections_presentersHeading"
					defaultMessage="Presenters"
				/>
			</LineHeading>
			<CardGroup className={styles.cardGroup}>
				{persons.nodes?.map((s) => (
					<CardPerson person={s} key={s.canonicalPath} />
				))}
			</CardGroup>
			{makeSeeAllButton(root.lang(language).presenters.get())}
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
			{makeSeeAllButton(root.lang(language).books.get())}
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
			{makeSeeAllButton(root.lang(language).conferences.get())}
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
			{makeSeeAllButton(root.lang(language).sponsors.get())}
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
			{makeSeeAllButton(root.lang(language).stories.albums.get())}
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
			{makeSeeAllButton(root.lang(language).songs.albums.get())}
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
			{makeSeeAllButton(root.lang(language).series.get())}
		</div>
	);
}
