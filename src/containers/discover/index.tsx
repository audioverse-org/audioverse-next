import React from 'react';

import BlogPosts from './index.section.blogPosts';
import Conferences from './index.section.conferences';
import FeaturedTeachings from './index.section.featuredTeachings';
import RecentTeachings from './index.section.recentTeachings';
import StorySeasons from './index.section.storySeasons';
import Topics from './index.section.topics';
import TrendingTeachings from './index.section.trendingTeachings';

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
