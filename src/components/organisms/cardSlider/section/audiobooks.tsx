import React from 'react';
import { useIntl } from 'react-intl';

import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
import CardSequence from '~src/components/molecules/card/sequence';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';

import { useInfiniteGetSectionAudiobooksQuery } from './__generated__/audiobooks';
import Section from './index';

export default function Audiobooks(): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageId();
	return (
		<Section
			infiniteQuery={useInfiniteGetSectionAudiobooksQuery}
			heading={intl.formatMessage({
				id: 'organismSection__audiobooksHeading',
				defaultMessage: 'Audiobooks',
			})}
			previous={intl.formatMessage({
				id: 'organismSection__audiobooksPrevious',
				defaultMessage: 'Previous audiobooks',
			})}
			next={intl.formatMessage({
				id: 'organismSection__audiobooksNext',
				defaultMessage: 'Next audiobooks',
			})}
			seeAllUrl={root.lang(lang).books.get()}
			Card={(p: { node: CardSequenceFragment }) => (
				<CardSequence sequence={p.node} />
			)}
		/>
	);
}
