import Image from 'next/image';
import React from 'react';
import { useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import CardWithPlayable from '@components/molecules/card/base/withPlayable';
import { BaseColors } from '@lib/constants';
import { CardStoryFragment } from '@lib/generated/graphql';

import FeatherIcon from '../../../../public/img/fa-feather.svg';
import SponsorLockup from '../sponsorLockup';

import CardRecordingSequenceHat from './recordingSequenceHat';
import styles from './story.module.scss';

interface CardStoryProps {
	story: CardStoryFragment;
	hideHat?: boolean;
}

export default function CardStory({
	story,
	hideHat,
}: CardStoryProps): JSX.Element {
	const intl = useIntl();
	const { sequence, sponsor } = story;
	const container = sequence
		? {
				icon: <FeatherIcon width={12} height={12} />,
				title: sequence.title,
				content: (
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
				),
				label: intl.formatMessage({
					id: 'cardStory_sequenceLabel',
					defaultMessage: 'Stories',
				}),
				url: sequence.canonicalPath,
		  }
		: undefined;

	return (
		<CardWithPlayable
			recording={story}
			container={container}
			theme={'story'}
			hideHat={hideHat}
		/>
	);
}
