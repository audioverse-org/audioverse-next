import React from 'react';
import { useIntl } from 'react-intl';

import { CardPersonFragment } from '~src/components/molecules/card/__generated__/person';
import CardPerson from '~src/components/molecules/card/person';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';

import Section from '.';
import { useInfiniteGetSectionPresentersQuery } from './__generated__/presenters';

export default function Presenters(props: {
	heading?: string | JSX.Element;
}): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageId();

	const {
		heading = intl.formatMessage({
			id: 'organismSection_presentersHeading',
			defaultMessage: 'Presenters',
		}),
	} = props;

	return (
		<Section
			rows={2}
			minCardWidth={170}
			infiniteQuery={useInfiniteGetSectionPresentersQuery}
			heading={heading}
			previous={intl.formatMessage({
				id: 'organismSection_presentersPrevious',
				defaultMessage: 'Previous presenters',
			})}
			next={intl.formatMessage({
				id: 'organismSection_presentersNext',
				defaultMessage: 'Next presenters',
			})}
			seeAllUrl={root.lang(lang).presenters.get()}
			Card={(p: { node: CardPersonFragment }) => (
				<CardPerson person={p.node} largeinit={true} compact />
			)}
		/>
	);
}
