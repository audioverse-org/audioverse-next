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
		isDarkBg,
	} = props;

	const useInfiniteQuery = (
		pageParamKey: keyof GetSectionConferencePresentersQueryVariables
	) => {
		return useInfiniteGetSectionConferencePresentersQuery(pageParamKey, {
			language: lang,
			first: 30,
			collectionId,
		});
	};

	return (
		<Section
			rows={2}
			infiniteQuery={useInfiniteQuery}
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
			Card={(p: { node: CardPersonFragment }) => (
				<CardPerson
					person={{
						...p.node,
						canonicalPath: `/${lang}/conferences/${collectionId}/presenters/${p.node.id}`,
					}}
					midinit
					key={p.node.canonicalPath}
				/>
			)}
			isDarkBg={isDarkBg}
		/>
	);
}
