import React from 'react';
import { useIntl } from 'react-intl';

import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
import CardSequence from '~src/components/molecules/card/sequence';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import root from '~src/lib/routes';

import { useInfiniteGetSectionAudiobooksQuery } from './__generated__/audiobooks';
import Section from './index';

export default function Audiobooks(props: {
	heading?: string | JSX.Element;
}): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageRoute();

	const {
		heading = intl.formatMessage({
			id: 'organismSection__audiobooksHeading',
			defaultMessage: 'Books',
		}),
	} = props;

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionAudiobooksQuery}
			heading={heading}
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
