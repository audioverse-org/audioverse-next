import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import BlogPosts from '~components/organisms/cardSlider/section/blogPosts';
import Conferences from '~components/organisms/cardSlider/section/conferences';
import FeaturedTeachings from '~components/organisms/cardSlider/section/featuredTeachings';
import RecentTeachings from '~components/organisms/cardSlider/section/recentTeachings';
import StorySeasons from '~components/organisms/cardSlider/section/storySeasons';
import Topics from '~components/organisms/cardSlider/section/topics';
import TrendingMusic from '~components/organisms/cardSlider/section/trendingMusic';
import TrendingTeachings from '~components/organisms/cardSlider/section/trendingTeachings';
import useIsAuthenticated from '~lib/hooks/useIsAuthenticated';
import Audiobooks from '~src/components/organisms/cardSlider/section/audiobooks';
import BibleBooks from '~src/components/organisms/cardSlider/section/bibleBooks';
import ContinueListening from '~src/components/organisms/cardSlider/section/continueListening';
import EgwAudiobooks from '~src/components/organisms/cardSlider/section/egwAudiobooks'; //egw
import Presenters from '~src/components/organisms/cardSlider/section/presenters';
import isServerSide from '~src/lib/isServerSide';
import { useLanguageId } from '~src/lib/hooks/useLanguageId';

import { useGetDiscoverPageDataQuery } from './__generated__/index';

export function getTopSection(options: {
	isUserLoggedIn: boolean;
	isLoading: boolean;
	count: number | undefined;
	isLoadingCount: boolean;
	isServerSide: boolean;
}): 'nothing' | 'featured' | 'continueListening' {
	if (options.isServerSide) return 'nothing';
	if (!options.isUserLoggedIn && !options.isLoading) return 'featured';
	if (options.isLoading || options.isLoadingCount) return 'nothing';
	if (options.isUserLoggedIn && !options.isLoadingCount) {
		if (options.count) return 'continueListening';
		return 'featured';
	}
	if (!options.isUserLoggedIn) return 'featured';
	return 'nothing';
}

export default function Discover(): JSX.Element {
	const language = useLanguageId();
	const [topSection, setTopSection] = useState('nothing');
	const { isUserLoggedIn, isFetching } = useIsAuthenticated();
	const { data, isLoading: isLoadingCount } = useGetDiscoverPageDataQuery({
		language,
	});

	useEffect(() => {
		const newTopSection = getTopSection({
			isUserLoggedIn,
			isLoading: isFetching,
			count: data?.me?.user.continueListening?.aggregate?.count,
			isLoadingCount,
			isServerSide: isServerSide(),
		});
		setTopSection(newTopSection);
	}, [isUserLoggedIn, isFetching, data, isLoadingCount]);

	return (
		<div>
			{topSection === 'continueListening' && <ContinueListening />}
			{topSection === 'featured' && <FeaturedTeachings />}
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
