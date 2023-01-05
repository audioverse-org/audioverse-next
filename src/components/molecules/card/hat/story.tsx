import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '@/components/atoms/heading2';
import RoundImage from '@/components/atoms/roundImage';
import { CardRecordingFragment } from '@/lib/generated/graphql';

import HatIcon from '../../../../../public/img/icons/fa-feather-light.svg';
import CardRecordingSequenceHat from '../recordingSequenceHat';

import styles from './story.module.scss';

import CardHat from '.';

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
