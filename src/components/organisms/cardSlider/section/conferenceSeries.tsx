import React from 'react';
import { useIntl } from 'react-intl';

import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
import CardSequence from '~src/components/molecules/card/sequence';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import root from '~src/lib/routes';

import Section from '.';
import { useInfiniteGetSectionConferenceSeriesQuery } from './__generated__/conferenceSeries';

export default function Series(props: {
	heading?: string | JSX.Element;
	collectionId: string;
	isDarkBg?: boolean;
}): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageRoute();

	const {
		heading = intl.formatMessage({
			id: 'organismSection_SeriesHeading',
			defaultMessage: 'Series',
		}),
		collectionId,
		isDarkBg,
	} = props;

	return (
		<Section
			rows={1}
			infiniteQuery={useInfiniteGetSectionConferenceSeriesQuery}
			variables={{ id: collectionId }}
			heading={heading}
			previous={intl.formatMessage({
				id: 'organismSection_SeriesPrevious',
				defaultMessage: 'Previous Series',
			})}
			next={intl.formatMessage({
				id: 'organismSection_SeriesNext',
				defaultMessage: 'Next Series',
			})}
			seeAllUrl={root.lang(lang).conferences.id(collectionId).sequences.get()}
			Card={(s: { node: CardSequenceFragment }) => (
				<CardSequence sequence={s.node} key={s.node.canonicalPath} />
			)}
			isDarkBg={isDarkBg}
		/>
	);
}
