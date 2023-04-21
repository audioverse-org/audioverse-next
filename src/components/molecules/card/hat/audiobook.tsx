import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import { BaseColors } from '@lib/constants';

import HatIcon from '../../../../../public/img/icons/fa-book-light.svg';
import PersonLockup from '../../personLockup';
import CardRecordingSequenceHat from '../recordingSequenceHat';

import styles from './audiobook.module.scss';

import CardHat from '.';
import { CardRecordingFragment } from '../__generated__/recording';

interface Props {
	sequence: NonNullable<CardRecordingFragment['sequence']>;
	recording: Pick<CardRecordingFragment, 'persons' | 'writers'>;
}

export default function CardHatAudiobook({
	sequence,
	recording,
}: Props): JSX.Element {
	return (
		<CardHat
			title={sequence.title}
			label={
				<FormattedMessage
					id="cardAudiobookTrack_sequenceLabel"
					defaultMessage="Book"
				/>
			}
			url={sequence.canonicalPath}
			icon={<HatIcon />}
			longHat
		>
			<CardRecordingSequenceHat sequence={sequence} inverse>
				<Heading2 className={styles.heading}>{sequence.title}</Heading2>
				{recording.writers.map((person) => (
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
				{!!recording.persons.length && (
					<Heading6 loose sans uppercase>
						<FormattedMessage
							id="cardAudiobookTrack_readByLabel"
							defaultMessage="Read by {name}"
							values={{
								name: recording.persons[0].name,
							}}
						/>
					</Heading6>
				)}
			</CardRecordingSequenceHat>
		</CardHat>
	);
}
