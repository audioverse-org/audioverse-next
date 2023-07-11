import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import HatIcon from '~public/img/icons/fa-music-light.svg';

import { CardRecordingFragment } from '../__generated__/recording';
import CardRecordingSequenceHat from '../recordingSequenceHat';
import CardHat from '.';

interface Props {
	sequence: NonNullable<CardRecordingFragment['sequence']>;
}

export default function CardHatSong({ sequence }: Props): JSX.Element {
	return (
		<CardHat
			title={sequence.title}
			label={
				<FormattedMessage
					id="cardSong_sequenceLabel"
					defaultMessage="Scripture Songs"
				/>
			}
			url={sequence.canonicalPath}
			icon={<HatIcon />}
		>
			<CardRecordingSequenceHat sequence={sequence}>
				<Heading2 sans>{sequence.title}</Heading2>
			</CardRecordingSequenceHat>
		</CardHat>
	);
}
