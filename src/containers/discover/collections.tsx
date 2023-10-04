import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import CardFavoriteEntity from '~components/molecules/card/favoriteEntity';
import Audiobooks from '~src/components/organisms/cardSlider/section/audiobooks';
import Conferences from '~src/components/organisms/cardSlider/section/conferences';
import EgwAudiobooks from '~src/components/organisms/cardSlider/section/egwAudiobooks';
import Presenters from '~src/components/organisms/cardSlider/section/presenters';
import ScriptureSongs from '~src/components/organisms/cardSlider/section/scriptureSongs';
import Series from '~src/components/organisms/cardSlider/section/series';
import Sponsors from '~src/components/organisms/cardSlider/section/sponsors';
import StorySeasons from '~src/components/organisms/cardSlider/section/storySeasons';
import Topics from '~src/components/organisms/cardSlider/section/topics';

import { GetDiscoverCollectionsPageDataQuery } from './__generated__/collections';
import styles from './collections.module.scss';

export type IDiscoverCollectionsProps = GetDiscoverCollectionsPageDataQuery;

export default function DiscoverCollections({
	websiteFeaturedCollection,
}: IDiscoverCollectionsProps): JSX.Element {
	return (
		<div>
			{websiteFeaturedCollection && (
				<>
					<LineHeading variant="overline">
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

			<Presenters />
			<Topics />
			<EgwAudiobooks />
			<Audiobooks />
			<Conferences
				heading={
					<FormattedMessage
						id="discoverCollections_conferencesHeading"
						defaultMessage="Conferences"
					/>
				}
				includeSubItems={false}
			/>
			<Sponsors />
			<StorySeasons
				heading={
					<FormattedMessage
						id="discoverCollections_storySeasonsHeading"
						defaultMessage="Stories"
					/>
				}
			/>
			<ScriptureSongs />
			<Series />
		</div>
	);
}
