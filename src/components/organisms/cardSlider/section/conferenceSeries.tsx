import React from 'react';
import { useIntl } from 'react-intl';

import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
import CardSequence from '~src/components/molecules/card/sequence';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';

import Section from '.';
import {
	GetSectionConferenceSeriesQueryVariables,
	useInfiniteGetSectionConferenceSeriesQuery,
} from './__generated__/conferenceSeries';

export default function Series(props: {
	heading?: string | JSX.Element;
	collectionId: string;
	isDarkBg?: boolean;
	altPath?: string;
}): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageId();

	const {
		heading = intl.formatMessage({
			id: 'organismSection_SeriesHeading',
			defaultMessage: 'Series',
		}),
		collectionId,
		isDarkBg,
		altPath,
	} = props;

	const infiniteQuery = (
		pageParamKey: keyof GetSectionConferenceSeriesQueryVariables
	) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useInfiniteGetSectionConferenceSeriesQuery(pageParamKey, {
			language: lang,
			first: 15,
			collectionId,
		});
	};

	return (
		<Section
			rows={1}
			infiniteQuery={infiniteQuery}
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
				<CardSequence
					sequence={s.node}
					key={s.node.canonicalPath}
					altPath={altPath}
				/>
			)}
			isDarkBg={isDarkBg}
		/>
	);
}
