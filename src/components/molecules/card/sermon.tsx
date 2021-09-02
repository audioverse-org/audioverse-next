import React from 'react';
import { useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import CardWithPlayable from '@components/molecules/card/base/withPlayable';
import { CardSermonFragment } from '@lib/generated/graphql';

import ListIcon from '../../../../public/img/icon-list-alt-solid.svg';

import CardRecordingSequenceHat from './recordingSequenceHat';

interface CardSermonProps {
	recording: CardSermonFragment;
	hideHat?: boolean;
}

export default function CardSermon({
	recording,
	hideHat,
}: CardSermonProps): JSX.Element {
	const intl = useIntl();
	const sequence = recording.sequence;
	const container = sequence
		? {
				icon: <ListIcon width={12} height={12} />,
				title: sequence.title,
				content: (
					<CardRecordingSequenceHat sequence={sequence}>
						<Heading2>{sequence.title}</Heading2>
					</CardRecordingSequenceHat>
				),
				label: intl.formatMessage({
					id: 'cardSermon_sequenceLabel',
					defaultMessage: 'series',
				}),
				url: sequence.canonicalPath,
		  }
		: undefined;

	return (
		<CardWithPlayable
			recording={recording}
			container={container}
			theme={'sermon'}
			hideHat={hideHat}
		/>
	);
}
