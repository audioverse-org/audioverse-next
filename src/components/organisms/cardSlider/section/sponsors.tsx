import React from 'react';
import { useIntl } from 'react-intl';

import { CardSponsorFragment } from '~src/components/molecules/card/__generated__/sponsor';
import CardSponsor from '~src/components/molecules/card/sponsor';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/hooks/useLanguageId';

import Section from '.';
import { useInfiniteGetSectionSponsorsQuery } from './__generated__/sponsors';

export default function Sponsors(): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageId();

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionSponsorsQuery}
			heading={intl.formatMessage({
				id: 'organismSection_sponsorsHeading',
				defaultMessage: 'Sponsors',
			})}
			previous={intl.formatMessage({
				id: 'organismSection_sponsorsPrevious',
				defaultMessage: 'Previous sponsors',
			})}
			next={intl.formatMessage({
				id: 'organismSection_sponsorsNext',
				defaultMessage: 'Next sponsors',
			})}
			seeAllUrl={root.lang(lang).sponsors.get()}
			Card={(p: { node: CardSponsorFragment }) => (
				<CardSponsor sponsor={p.node} />
			)}
		/>
	);
}
