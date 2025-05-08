import React from 'react';
import { useIntl } from 'react-intl';

import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
import CardSequence from '~src/components/molecules/card/sequence';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import root from '~src/lib/routes';

import Section from '.';
import { useInfiniteGetSectionSeriesQuery } from './__generated__/series';

export default function Series(): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageRoute();

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionSeriesQuery}
			heading={intl.formatMessage({
				id: 'organismSection_seriesHeading',
				defaultMessage: 'Series',
			})}
			previous={intl.formatMessage({
				id: 'organismSection_seriesPrevious',
				defaultMessage: 'Previous series',
			})}
			next={intl.formatMessage({
				id: 'organismSection_seriesNext',
				defaultMessage: 'Next series',
			})}
			seeAllUrl={root.lang(lang).series.get()}
			Card={(p: { node: CardSequenceFragment }) => (
				<CardSequence sequence={p.node} />
			)}
		/>
	);
}
