import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import { useIntl } from 'react-intl';

import {
	GetDiscoverConferencesQuery,
	useInfiniteGetDiscoverConferencesQuery,
} from '~containers/discover/__generated__';
import CardCollection from '~src/components/molecules/card/collection';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import Section, { SectionNode } from './index';

type Conference = NonNullable<
	GetDiscoverConferencesQuery['conferences']['nodes']
>[0];

function selectConferences(p: GetDiscoverConferencesQuery | undefined) {
	return p?.conferences.nodes;
}

function NodeConference({
	node,
}: {
	node: SectionNode<Conference>;
}): JSX.Element {
	return (
		<CardCollection
			collection={node}
			sequences={node.sequences.nodes}
			recordings={node.sequences.nodes?.length ? null : node.recordings.nodes}
		/>
	);
}

export default function Conferences(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const language = useLanguageId();
	const intl = useIntl();
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
			heading={intl.formatMessage({
				id: 'discover_conferencesHeading',
				defaultMessage: 'Recent Conferences',
			})}
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
			selectNodes={selectConferences}
			Card={NodeConference}
		/>
	);
}
