import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
	makeDiscoverCollectionsRoute,
	makeDiscoverRoute,
	makeLibraryRoute,
	makeSermonListRoute,
} from '@lib/routes';

export type IAppFeature = {
	heading: JSX.Element;
	kicker: JSX.Element;
	cta: JSX.Element;
	url: string;
	image: string;
	backgroundColor: string;
};

export function getAppFeatures(languageRoute: string): IAppFeature[] {
	return [
		{
			heading: (
				<FormattedMessage
					id="app__features1Heading"
					defaultMessage="Treasures New and Old"
				/>
			),
			kicker: (
				<FormattedMessage
					id="app__features1Kicker"
					defaultMessage="Easily discover inspiring content from a rich storehouse of spiritual content."
				/>
			),
			cta: (
				<FormattedMessage
					id="app__features1Cta"
					defaultMessage="Discover Audio"
				/>
			),
			url: makeDiscoverRoute(languageRoute),
			backgroundColor: '#FF6E6E',
		},
		{
			heading: (
				<FormattedMessage
					id="app__features2Heading"
					defaultMessage="Present Truth"
				/>
			),
			kicker: (
				<FormattedMessage
					id="app__features2Kicker"
					defaultMessage="AudioVerse makes it easy to find recent content from your favorite speakers, conferences, and sponsors."
				/>
			),
			cta: (
				<FormattedMessage
					id="app__features2Cta"
					defaultMessage="View Recent Content"
				/>
			),
			url: makeSermonListRoute(languageRoute),
			backgroundColor: '#325763',
		},
		{
			heading: (
				<FormattedMessage
					id="app__features3Heading"
					defaultMessage="Connected and Harmonious"
				/>
			),
			kicker: (
				<FormattedMessage
					id="app__features3Kicker"
					defaultMessage="Cards include relevant information like parent series so you can always see what’s truly important, with detail pages showing additional context and connections."
				/>
			),
			cta: (
				<FormattedMessage
					id="app__features3Cta"
					defaultMessage="Explore Cards"
				/>
			),
			url: makeDiscoverCollectionsRoute(languageRoute),
			backgroundColor: '#6B7680',
		},
		{
			heading: (
				<FormattedMessage
					id="app__features4Heading"
					defaultMessage="Save the Ones You Love"
				/>
			),
			kicker: (
				<FormattedMessage
					id="app__features4Kicker"
					defaultMessage="Build a library of teachings to listen to later, and never be lost again with progress that syncs across your devices."
				/>
			),
			cta: (
				<FormattedMessage
					id="app__features4Cta"
					defaultMessage="Explore Library"
				/>
			),
			url: makeLibraryRoute(languageRoute),
			backgroundColor: '#EFEBEB',
		},
		{
			heading: (
				<FormattedMessage
					id="app__features5Heading"
					defaultMessage="Lay Up for Yourselves…"
				/>
			),
			kicker: (
				<FormattedMessage
					id="app__features5Kicker"
					defaultMessage="Download content to your devices for moments when you have no signal, or simply want to avoid your data running over."
				/>
			),
			cta: (
				<FormattedMessage
					id="app__features5Cta"
					defaultMessage="Find Content to Download"
				/>
			),
			url: makeSermonListRoute(languageRoute),
			backgroundColor: '#CDD9E3',
		},
	].map((item, index) => ({
		image: `/img/features/${index + 1}.png`,
		...item,
	}));
}
