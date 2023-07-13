import React from 'react';
import { useIntl } from 'react-intl';

import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
import CardSequence from '~src/components/molecules/card/sequence';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';

import Section from '.';
import { useInfiniteGetSectionScriptureSongsQuery } from './__generated__/scriptureSongs';

export default function ScriptureSongs(): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageId();

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionScriptureSongsQuery}
			heading={intl.formatMessage({
				id: 'organismSection_scriptureSongsHeading',
				defaultMessage: 'Scripture Songs',
			})}
			previous={intl.formatMessage({
				id: 'organismSection_scriptureSongsPrevious',
				defaultMessage: 'Previous scripture songs',
			})}
			next={intl.formatMessage({
				id: 'organismSection_scriptureSongsNext',
				defaultMessage: 'Next scripture songs',
			})}
			seeAllUrl={root.lang(lang).songs.get()}
			Card={(p: { node: CardSequenceFragment }) => (
				<CardSequence sequence={p.node} />
			)}
		/>
	);
}
