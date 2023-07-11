import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import CardCollection from '~src/components/molecules/card/collection';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import {
	GetDiscoverConferencesQuery,
	useInfiniteGetDiscoverConferencesQuery,
} from './__generated__/conferences';
import Section, { SectionNode } from './index';

type Conference = NonNullable<
	GetDiscoverConferencesQuery['conferences']['nodes']
>[0];

export default function Conferences(props: {
	heading?: string | JSX.Element;
	includeSubItems?: boolean;
}): JSX.Element {
	const languageRoute = useLanguageRoute();
	const intl = useIntl();

	const {
		heading = intl.formatMessage({
			id: 'discover_conferencesHeading',
			defaultMessage: 'Recent Conferences',
		}),
		includeSubItems = true,
	} = props;

	const NodeConference = useCallback(
		({ node }: { node: SectionNode<Conference> }): JSX.Element => {
			const sequences = includeSubItems ? node.sequences.nodes : null;
			const recordings =
				includeSubItems && !sequences?.length ? node.recordings.nodes : null;
			return (
				<CardCollection
					collection={node}
					sequences={sequences}
					recordings={recordings}
				/>
			);
		},
		[includeSubItems]
	);

	return (
		<Section<GetDiscoverConferencesQuery, Conference>
			infiniteQuery={useInfiniteGetDiscoverConferencesQuery}
			heading={heading}
			previous={intl.formatMessage({
				id: 'discover__conferencesPrevious',
				defaultMessage: 'Previous recent conferences',
			})}
			next={intl.formatMessage({
				id: 'discover__conferencesNext',
				defaultMessage: 'Next recent conferences',
			})}
			seeAllUrl={root.lang(languageRoute).conferences.get()}
			Card={NodeConference}
		/>
	);
}
