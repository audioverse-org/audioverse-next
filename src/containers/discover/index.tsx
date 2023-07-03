import React from 'react';

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
			<Topics />
			<RecentTeachings />
			<TrendingTeachings />
			<FeaturedTeachings />
			<BlogPosts />
			<StorySeasons />
			<Conferences />
		</div>
	);
}
