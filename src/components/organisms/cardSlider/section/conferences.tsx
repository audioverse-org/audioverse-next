import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import CardCollection from '~src/components/molecules/card/collection';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';
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
	const language = useLanguageId();
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

	const result = useInfiniteGetDiscoverConferencesQuery(
		'after',
		{
			language,
			first: 3,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverConferencesQuery>) =>
				last?.conferences.pageInfo.hasNextPage
					? {
							language,
							first: 3,
							after: last.conferences.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverConferencesQuery, Conference>
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
			infiniteQueryResult={result}
			Card={NodeConference}
		/>
	);
}
