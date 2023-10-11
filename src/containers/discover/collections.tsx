import React from 'react';
import { FormattedMessage } from 'react-intl';

import Audiobooks from '~src/components/organisms/cardSlider/section/audiobooks';
import Conferences from '~src/components/organisms/cardSlider/section/conferences';
import Presenters from '~src/components/organisms/cardSlider/section/presenters';
import ScriptureSongs from '~src/components/organisms/cardSlider/section/scriptureSongs';
import Series from '~src/components/organisms/cardSlider/section/series';
import Sponsors from '~src/components/organisms/cardSlider/section/sponsors';
import StorySeasons from '~src/components/organisms/cardSlider/section/storySeasons';
import TopicsBrowse from '~src/components/organisms/cardSlider/section/topicsBrowse';

import { GetDiscoverCollectionsPageDataQuery } from './__generated__/collections';

export type IDiscoverCollectionsProps = GetDiscoverCollectionsPageDataQuery;

export default function DiscoverCollections(): JSX.Element {
	return (
		<div>
			<Presenters />
			<TopicsBrowse />
			<Series />
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
		</div>
	);
}
