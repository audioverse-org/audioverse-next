import React from 'react';
import { useIntl } from 'react-intl';

import { ConferencePersonFragment } from '~src/components/molecules/card/__generated__/conferencePerson';
import CardPerson from '~src/components/molecules/card/person';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import root from '~src/lib/routes';

import Section from '.';
import { useInfiniteGetSectionConferencePresentersQuery } from './__generated__/conferencePresenters';

export default function Presenters(props: {
	heading?: string | JSX.Element;
	collectionId: string;
	isDarkBg?: boolean;
}): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageRoute();

	const {
		heading = intl.formatMessage({
			id: 'organismSection_presentersHeading',
			defaultMessage: 'Presenters',
		}),
		collectionId,
		isDarkBg,
	} = props;

	return (
		<Section
			rows={2}
			infiniteQuery={useInfiniteGetSectionConferencePresentersQuery}
			variables={{ id: collectionId }}
			heading={heading}
			previous={intl.formatMessage({
				id: 'organismSection_presentersPrevious',
				defaultMessage: 'Previous presenters',
			})}
			next={intl.formatMessage({
				id: 'organismSection_presentersNext',
				defaultMessage: 'Next presenters',
			})}
			seeAllUrl={root.lang(lang).conferences.id(collectionId).presenters.get()}
			Card={(p: { node: ConferencePersonFragment }) => (
				<CardPerson
					person={{
						...p.node,
						canonicalPath: root
							.lang(lang)
							.conferences.id(collectionId)
							.presenters.id(p.node.id)
							.get(),
					}}
					midinit
					key={p.node.canonicalPath}
				/>
			)}
			isDarkBg={isDarkBg}
		/>
	);
}
