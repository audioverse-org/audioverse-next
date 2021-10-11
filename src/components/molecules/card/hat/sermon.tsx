import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import RoundImage from '@components/atoms/roundImage';
import { CardRecordingFragment } from '@lib/generated/graphql';

import HatIcon from '../../../../../public/img/fa-list-alt.svg';
import CardRecordingSequenceHat from '../recordingSequenceHat';

import styles from './sermon.module.scss';

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
				<Heading2 className={styles.title}>
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
