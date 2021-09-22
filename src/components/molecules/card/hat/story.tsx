import Image from 'next/image';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import SponsorLockup from '@components/molecules/sponsorLockup';
import { BaseColors } from '@lib/constants';
import {
	CardRecordingFragment,
	SponsorLockupFragment,
} from '@lib/generated/graphql';

import HatIcon from '../../../../../public/img/fa-feather.svg';
import CardRecordingSequenceHat from '../recordingSequenceHat';

import styles from './story.module.scss';

import CardHat from '.';

interface Props {
	sequence: NonNullable<CardRecordingFragment['sequence']>;
	sponsor: SponsorLockupFragment | null;
}

export default function CardHatStory({
	sequence,
	sponsor,
}: Props): JSX.Element {
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
				<Heading2 sans className={styles.heading}>
					{sequence.title}
				</Heading2>
				{sponsor && (
					<div className={styles.sponsor}>
						<SponsorLockup
							sponsor={sponsor}
							textColor={BaseColors.LIGHT_TONE}
							hoverColor={BaseColors.SALMON}
							isLinked
							isOptionalLink
							small
						/>
					</div>
				)}
				{sequence.image && (
					<div className={styles.imageContainer}>
						<Image src={sequence.image.url} layout="fill" />
					</div>
				)}
			</CardRecordingSequenceHat>
		</CardHat>
	);
}
