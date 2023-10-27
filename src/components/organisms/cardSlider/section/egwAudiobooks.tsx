import React from 'react';
import { useIntl } from 'react-intl';

import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
import CardSequence from '~src/components/molecules/card/sequence';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';

import { useInfiniteGetSectionEgwAudiobooksQuery } from './__generated__/egwAudiobooks';
import Section from './index';

interface EgwAudiobooksProps {
	heading?: string | JSX.Element;
}

const EgwAudiobooks: React.FC<EgwAudiobooksProps> = ({ heading }) => {
	const intl = useIntl();
	const lang = useLanguageId();

	const renderCard = (p: { node: CardSequenceFragment }) => {
		return <CardSequence sequence={p.node} slim={true} egw={true} />;
	};

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionEgwAudiobooksQuery}
			heading={
				heading ||
				intl.formatMessage({
					id: 'organismSection__egwAudiobooksHeading',
					defaultMessage: 'Ellen White',
				})
			}
			previous={intl.formatMessage({
				id: 'organismSection__egwAudiobooksPrevious',
				defaultMessage: 'Previous EGW audiobooks',
			})}
			next={intl.formatMessage({
				id: 'organismSection__egwAudiobooksNext',
				defaultMessage: 'Next EGW audiobooks',
			})}
			seeAllUrl={root.lang(lang).egwbooks.get()}
			Card={renderCard}
		/>
	);
};

export default EgwAudiobooks;
