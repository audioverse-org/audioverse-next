import React from 'react';
import { FormattedMessage, IntlShape } from 'react-intl';

import root from '~lib/routes';

type IAppFeature = {
	heading: JSX.Element;
	kicker: JSX.Element;
	cta: JSX.Element;
	url: string;
	image: string;
	imageAlt: string;
	backgroundColor: string;
};

export function getAppFeatures(
	languageRoute: string,
	intl: IntlShape,
): IAppFeature[] {
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
			url: root.lang(languageRoute).discover.get(),
			backgroundColor: '#FF6E6E',
			image: '/img/features/1.png',
			imageAlt: intl.formatMessage({
				id: 'app__features1ImageAlt',
				defaultMessage: 'Media on the Audioverse website',
				description: 'Image alt text for the first feature',
			}),
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
			url: root.lang(languageRoute).teachings.all.get(),
			backgroundColor: '#325763',
			image: '/img/features/2.png',
			imageAlt: intl.formatMessage({
				id: 'app__features2ImageAlt',
				defaultMessage: 'List of recent sermons from Sebastien Braxton',
				description: 'Image alt text for the second feature',
			}),
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
			url: root.lang(languageRoute).discover.collections.get(),
			backgroundColor: '#6B7680',
			image: '/img/features/3.png',
			imageAlt: intl.formatMessage({
				id: 'app__features3ImageAlt',
				defaultMessage: 'A diagram of AudioVerse’s card UI',
				description: 'Image alt text for the third feature',
			}),
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
			url: root.lang(languageRoute).library.get(),
			backgroundColor: '#EFEBEB',
			image: '/img/features/4.png',
			imageAlt: intl.formatMessage({
				id: 'app__features4ImageAlt',
				defaultMessage: 'The save button on a sermon by Katie Chitwood',
				description: 'Image alt text for the fourth feature',
			}),
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
			url: root.lang(languageRoute).teachings.all.get(),
			backgroundColor: '#CDD9E3',
			image: '/img/features/5.png',
			imageAlt: intl.formatMessage({
				id: 'app__features5ImageAlt',
				defaultMessage: 'The download button on a sermon by Don Mackintosh',
				description: 'Image alt text for the fifth feature',
			}),
		},
	];
}
