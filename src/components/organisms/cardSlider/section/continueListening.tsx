import React from 'react';
import { useIntl } from 'react-intl';

import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import CardRecording from '~src/components/molecules/card/recording';

import { useInfiniteGetSectionContinueListeningQuery } from './__generated__/continueListening';
import Section from './index';

export default function ContinueListening(): JSX.Element {
	const intl = useIntl();

	return (
		<Section
			infiniteQuery={useInfiniteGetSectionContinueListeningQuery}
			heading={intl.formatMessage({
				id: 'discover_continueListeningHeading',
				defaultMessage: 'Continue Listening',
			})}
			previous={intl.formatMessage({
				id: 'discover__continueListeningPrevious',
				defaultMessage: 'Previous continue listening',
			})}
			next={intl.formatMessage({
				id: 'discover__continueListeningNext',
				defaultMessage: 'Next continue listening',
			})}
			selectNodes={(p) =>
				p?.me?.user.continueListening.nodes?.map((n) => n.recording)
			}
			Card={(p: { node: CardRecordingFragment }) => (
				<CardRecording recording={p.node} />
			)}
		/>
	);
}
