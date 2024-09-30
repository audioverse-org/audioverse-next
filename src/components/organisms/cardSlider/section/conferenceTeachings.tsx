import React from 'react';
import { useIntl } from 'react-intl';

import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import CardRecording from '~src/components/molecules/card/recording';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';

import Section from '.';
import {
	GetSectionConferenceTeachingsQueryVariables,
	useInfiniteGetSectionConferenceTeachingsQuery,
} from './__generated__/conferenceTeachings';

export default function Teachings(props: {
	heading?: string | JSX.Element;
	collectionId: string;
	isDarkBg?: boolean;
}): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageId();

	const {
		heading = intl.formatMessage({
			id: 'organismSection_TeachingsHeading',
			defaultMessage: 'Teachings',
		}),
		collectionId,
		isDarkBg,
	} = props;

	const infiniteQuery = (
		pageParamKey: keyof GetSectionConferenceTeachingsQueryVariables
	) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useInfiniteGetSectionConferenceTeachingsQuery(pageParamKey, {
			language: lang,
			first: 30,
			collectionId,
		});
	};

	return (
		<Section
			rows={3}
			infiniteQuery={infiniteQuery}
			heading={heading}
			previous={intl.formatMessage({
				id: 'organismSection_TeachingsPrevious',
				defaultMessage: 'Previous Teachings',
			})}
			next={intl.formatMessage({
				id: 'organismSection_TeachingsNext',
				defaultMessage: 'Next Teachings',
			})}
			seeAllUrl={root.lang(lang).conferences.id(collectionId).teachings.get()}
			Card={(t: { node: CardRecordingFragment }) => (
				<CardRecording
					recording={t.node}
					key={t.node.canonicalPath}
					fullBleed
				/>
			)}
			isDarkBg={isDarkBg}
			hasBg
		/>
	);
}
