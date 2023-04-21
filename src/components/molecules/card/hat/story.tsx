import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import RoundImage from '~components/atoms/roundImage';

import HatIcon from '../../../../../public/img/icons/fa-feather-light.svg';
import { CardRecordingFragment } from '../__generated__/recording';
import CardRecordingSequenceHat from '../recordingSequenceHat';
import CardHat from '.';
import styles from './story.module.scss';

interface Props {
	sequence: NonNullable<CardRecordingFragment['sequence']>;
}

export default function CardHatStory({ sequence }: Props): JSX.Element {
	return (
		<CardHat
			title={sequence.title}
			label={
				<FormattedMessage
					id="cardStory_sequenceLabel"
					defaultMessage="Stories"
				/>
			}
			url={sequence.canonicalPath}
			icon={<HatIcon />}
			longHat
		>
			<CardRecordingSequenceHat sequence={sequence} inverse>
				<Heading2 sans className={styles.title}>
					{sequence.image && (
						<div className={styles.image}>
							<RoundImage image={sequence.image.url} alt={sequence.title} />
						</div>
					)}
					{sequence.title}
				</Heading2>
			</CardRecordingSequenceHat>
		</CardHat>
	);
}
