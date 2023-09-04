import React from 'react';
import { FormattedMessage } from 'react-intl';

import BibleBooks from '~src/components/organisms/cardSlider/section/bibleBooks';
import Presenters from '~src/components/organisms/cardSlider/section/presenters';
import TrendingTeachings from '~src/components/organisms/cardSlider/section/trendingTeachings';

import BlogPosts from '../../components/organisms/cardSlider/section/blogPosts';
import Conferences from '../../components/organisms/cardSlider/section/conferences';
import FeaturedTeachings from '../../components/organisms/cardSlider/section/featuredTeachings';
import RecentTeachings from '../../components/organisms/cardSlider/section/recentTeachings';
import StorySeasons from '../../components/organisms/cardSlider/section/storySeasons';
import Topics from '../../components/organisms/cardSlider/section/topics';

export default function Discover(): JSX.Element {
	return (
		<div>
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
			<FeaturedTeachings />
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
		</div>
	);
}
