import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import CardWithPlayable from '@components/molecules/card/base/withPlayable';
import { CardAudiobookTrackFragment } from '@lib/generated/graphql';

import HatIcon from '../../../../public/img/fa-book.svg';
import PersonLockup from '../personLockup';

import styles from './audiobookTrack.module.scss';
import CardRecordingSequenceHat from './recordingSequenceHat';

interface CardAudiobookTrackProps {
	track: CardAudiobookTrackFragment;
}

export default function CardAudiobookTrack({
	track,
}: CardAudiobookTrackProps): JSX.Element {
	const intl = useIntl();
	const { sequence } = track;
	const container = sequence
		? {
				icon: <HatIcon width={12} height={12} />,
				title: sequence.title,
				content: (
					<CardRecordingSequenceHat sequence={sequence} inverse>
						<Heading2 className={styles.heading}>{sequence.title}</Heading2>
						{track.writers.map((person) => (
							<div className={styles.author} key={person.canonicalPath}>
								<PersonLockup
									person={person}
									textColor={BaseColors.LIGHT_TONE}
									small
									isLinked
									isOptionalLink
									hoverColor={BaseColors.SALMON}
								/>
							</div>
						))}
						{!!track.persons.length && (
							<Heading6 loose sans uppercase>
								<FormattedMessage
									id="cardAudiobookTrack_readByLabel"
									defaultMessage="Read by {name}"
									values={{
										name: track.persons[0].name,
									}}
								/>
							</Heading6>
						)}
					</CardRecordingSequenceHat>
				),
				label: intl.formatMessage({
					id: 'cardAudiobookTrack_sequenceLabel',
					defaultMessage: 'Book',
				}),
				url: sequence.canonicalPath,
		  }
		: undefined;

	return (
		<CardWithPlayable
			recording={track}
			container={container}
			theme={'audiobookTrack'}
			hideSpeakers
		/>
	);
}
