import React from 'react';
import { useIntl } from 'react-intl';

import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
import CardSequence from '~src/components/molecules/card/sequence';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';

import { useInfiniteGetSectionEgwAudiobooksQuery } from './__generated__/egwAudiobooks';
import Section from './index';

export default function EgwAudiobooks(): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageId();
	return (
		<Section
			infiniteQuery={useInfiniteGetSectionEgwAudiobooksQuery}
			heading={intl.formatMessage({
				id: 'organismSection__egwAudiobooksHeading',
				defaultMessage: 'Discover Ellen G. White',
			})}
			previous={intl.formatMessage({
				id: 'organismSection__egwAudiobooksPrevious',
				defaultMessage: 'Previous EGW audiobooks',
			})}
			next={intl.formatMessage({
				id: 'organismSection__egwAudiobooksNext',
				defaultMessage: 'Next EGW audiobooks',
			})}
			seeAllUrl={root.lang(lang).egwbooks.get()}
			Card={(p: { node: CardSequenceFragment }) => (
				<CardSequence sequence={p.node} slim={true} egw={true} />
			)}
		/>
	);
}
