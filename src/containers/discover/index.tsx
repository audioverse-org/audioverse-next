import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useGetWithAuthGuardDataQuery } from '~components/HOCs/__generated__/withAuthGuard';
import BlogPosts from '~components/organisms/cardSlider/section/blogPosts';
import Conferences from '~components/organisms/cardSlider/section/conferences';
import FeaturedTeachings from '~components/organisms/cardSlider/section/featuredTeachings';
import RecentTeachings from '~components/organisms/cardSlider/section/recentTeachings';
import StorySeasons from '~components/organisms/cardSlider/section/storySeasons';
import Topics from '~components/organisms/cardSlider/section/topics';
import TrendingMusic from '~components/organisms/cardSlider/section/trendingMusic';
import TrendingTeachings from '~components/organisms/cardSlider/section/trendingTeachings';
import { getSessionToken } from '~lib/cookies';
import Audiobooks from '~src/components/organisms/cardSlider/section/audiobooks';
import BibleBooks from '~src/components/organisms/cardSlider/section/bibleBooks';
import ContinueListening from '~src/components/organisms/cardSlider/section/continueListening';
import EgwAudiobooks from '~src/components/organisms/cardSlider/section/egwAudiobooks'; //egw
import Presenters from '~src/components/organisms/cardSlider/section/presenters';

export default function Discover(): JSX.Element {
	const sessionToken = getSessionToken();

	const authResult = useGetWithAuthGuardDataQuery(
		{},
		{
			enabled: !!sessionToken,
			retry: false,
		}
	);
	const user = authResult.data?.me?.user;

	return (
		<div>
			{user ? <ContinueListening /> : <FeaturedTeachings />}
			<RecentTeachings />
			<Topics />
			<Presenters
				heading={
					<FormattedMessage
						id="discover_presentersHeading"
						defaultMessage="Discover Presenters"
					/>
				}
			/>
			<TrendingTeachings />
			<EgwAudiobooks
				heading={
					<FormattedMessage
						id="discoverCollections_egwAudiobooksHeading"
						defaultMessage="Discover Ellen White"
					/>
				}
			/>
			<Audiobooks
				heading={
					<FormattedMessage
						id="discoverCollections_audiobooksHeading"
						defaultMessage="Discover Books"
					/>
				}
			/>
			<BlogPosts />
			<BibleBooks
				heading={
					<FormattedMessage
						id="discover_bibleBooksHeading"
						defaultMessage="Discover Bible Books"
					/>
				}
			/>
			<StorySeasons />
			<Conferences />
			<TrendingMusic />
		</div>
	);
}
