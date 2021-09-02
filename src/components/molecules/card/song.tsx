import React from 'react';
import { useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import CardWithPlayable from '@components/molecules/card/base/withPlayable';
import { CardSongFragment } from '@lib/generated/graphql';

import HatIcon from '../../../../public/img/icon-music-solid.svg';

import CardRecordingSequenceHat from './recordingSequenceHat';

interface CardSongProps {
	song: CardSongFragment;
}

export default function CardSong({ song }: CardSongProps): JSX.Element {
	const intl = useIntl();
	const { sequence } = song;
	const container = sequence
		? {
				icon: <HatIcon width={12} height={12} />,
				title: sequence.title,
				content: (
					<CardRecordingSequenceHat sequence={sequence}>
						<Heading2 sans>{sequence.title}</Heading2>
					</CardRecordingSequenceHat>
				),
				label: intl.formatMessage({
					id: 'cardSong_sequenceLabel',
					defaultMessage: 'Scripture Songs',
				}),
				url: sequence.canonicalPath,
		  }
		: undefined;

	return (
		<CardWithPlayable recording={song} container={container} theme={'song'} />
	);
}
