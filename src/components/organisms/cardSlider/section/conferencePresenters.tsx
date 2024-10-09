import React from 'react';
import { useIntl } from 'react-intl';

import { CardPersonFragment } from '~src/components/molecules/card/__generated__/person';
import CardPerson from '~src/components/molecules/card/person';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';

import Section from '.';
import {
	GetSectionConferencePresentersQueryVariables,
	useInfiniteGetSectionConferencePresentersQuery,
} from './__generated__/conferencePresenters';

export default function Presenters(props: {
	heading?: string | JSX.Element;
	collectionId: string;
	altPath?: string;
	altSeeAll?: string;
	isDarkBg?: boolean;
}): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageId();

	const {
		heading = intl.formatMessage({
			id: 'organismSection_presentersHeading',
			defaultMessage: 'Presenters',
		}),
		collectionId,
		altPath,
		altSeeAll,
		isDarkBg,
	} = props;

	const infiniteQuery = (
		pageParamKey: keyof GetSectionConferencePresentersQueryVariables
	) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useInfiniteGetSectionConferencePresentersQuery(pageParamKey, {
			language: lang,
			first: 30,
			collectionId,
		});
	};

	return (
		<Section
			rows={2}
			infiniteQuery={infiniteQuery}
			heading={heading}
			previous={intl.formatMessage({
				id: 'organismSection_presentersPrevious',
				defaultMessage: 'Previous presenters',
			})}
			next={intl.formatMessage({
				id: 'organismSection_presentersNext',
				defaultMessage: 'Next presenters',
			})}
			seeAllUrl={altSeeAll ? altSeeAll : root.lang(lang).presenters.get()}
			Card={(p: { node: CardPersonFragment }) => (
				<CardPerson
					person={p.node}
					midinit
					altPath={altPath && altPath + p.node.id}
					key={p.node.canonicalPath}
				/>
			)}
			isDarkBg={isDarkBg}
		/>
	);
}
