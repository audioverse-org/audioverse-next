import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import { CardRecordingFragment } from '@lib/generated/graphql';

import HatIcon from '../../../../../public/img/fa-list-alt.svg';
import CardRecordingSequenceHat from '../recordingSequenceHat';

import CardHat from '.';

interface Props {
	sequence: NonNullable<CardRecordingFragment['sequence']>;
}

export default function CardHatSermon({ sequence }: Props): JSX.Element {
	return (
		<CardHat
			title={sequence.title}
			label={
				<FormattedMessage
					id="cardSermon_sequenceLabel"
					defaultMessage="Series"
				/>
			}
			url={sequence.canonicalPath}
			icon={<HatIcon />}
		>
			<CardRecordingSequenceHat sequence={sequence}>
				<Heading2>{sequence.title}</Heading2>
			</CardRecordingSequenceHat>
		</CardHat>
	);
}
