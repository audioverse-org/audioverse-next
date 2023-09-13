import React from 'react';

import BlogPosts from '~components/organisms/cardSlider/section/blogPosts';
import Conferences from '~components/organisms/cardSlider/section/conferences';
import FeaturedTeachings from '~components/organisms/cardSlider/section/featuredTeachings';
import RecentTeachings from '~components/organisms/cardSlider/section/recentTeachings';
import StorySeasons from '~components/organisms/cardSlider/section/storySeasons';
import Topics from '~components/organisms/cardSlider/section/topics';
import TrendingMusic from '~components/organisms/cardSlider/section/trendingMusic';
import TrendingTeachings from '~components/organisms/cardSlider/section/trendingTeachings';

export default function Discover(): JSX.Element {
	return (
		<div>
			<RecentTeachings />
			<Topics />
			<TrendingTeachings />
			<FeaturedTeachings />
			<BlogPosts />
			<StorySeasons />
			<Conferences />
			<TrendingMusic />
		</div>
	);
}
