import React from 'react';
import { useIntl } from 'react-intl';

import CardSequence from '~src/components/molecules/card/sequence';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import {
	GetSectionStorySeasonsQuery,
	useInfiniteGetSectionStorySeasonsQuery,
} from './__generated__/storySeasons';
import Section from './index';

type StorySeason = NonNullable<
	GetSectionStorySeasonsQuery['storySeasons']['nodes']
>[0];

export default function StorySeasons(props: {
	heading?: string | JSX.Element;
}): JSX.Element {
	const languageRoute = useLanguageRoute();
	const intl = useIntl();

	const {
		heading = intl.formatMessage({
			id: 'discover__storiesHeading',
			defaultMessage: 'Recent Stories',
		}),
	} = props;

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionStorySeasonsQuery}
			heading={heading}
			previous={intl.formatMessage({
				id: 'discover__storiesPrevious',
				defaultMessage: 'Previous recent stories',
			})}
			next={intl.formatMessage({
				id: 'discover__storiesNext',
				defaultMessage: 'Next recent stories',
			})}
			seeAllUrl={root.lang(languageRoute).stories.albums.get()}
			Card={(p: { node: StorySeason }) => <CardSequence sequence={p.node} />}
		/>
	);
}
