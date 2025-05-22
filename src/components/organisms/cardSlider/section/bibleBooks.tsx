import React from 'react';
import { useIntl } from 'react-intl';

import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
import CardSequence from '~src/components/molecules/card/sequence';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import root from '~src/lib/routes';

import Section from '.';
import { useInfiniteGetSectionBibleBooksQuery } from './__generated__/bibleBooks';

export default function BibleBooks(props: {
	heading?: string | JSX.Element;
}): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageRoute();

	const {
		heading = intl.formatMessage({
			id: 'organismSection__bibleBooksHeading',
			defaultMessage: 'Bible Books',
		}),
	} = props;

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionBibleBooksQuery}
			heading={heading}
			previous={intl.formatMessage({
				id: 'organismSection__bibleBooksPrevious',
				defaultMessage: 'Previous Bible books',
			})}
			next={intl.formatMessage({
				id: 'organismSection__bibleBooksNext',
				defaultMessage: 'Next Bible books',
			})}
			seeAllUrl={root.lang(lang).bibles.get()}
			Card={(p: { node: CardSequenceFragment }) => (
				<CardSequence sequence={p.node} />
			)}
		/>
	);
}
