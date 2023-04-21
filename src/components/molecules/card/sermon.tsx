import React from 'react';

import TeaseRecording from '../teaseRecording';

import CardWithTheme from './base/withTheme';
import CardHatSermon from './hat/sermon';
import CardHatSponsor from './hat/sponsor';
import { CardRecordingFragment } from './__generated__/recording';

export interface CardSermonProps {
	recording: CardRecordingFragment;
	hideHat?: boolean;
	hideSponsorHat?: boolean;
	isOptionalLink?: boolean;
}

export default function CardSermon({
	recording,
	hideHat,
	hideSponsorHat,
	isOptionalLink,
}: CardSermonProps): JSX.Element {
	const { sequence, sponsor } = recording;
	const theme = 'sermon';

	return (
		<CardWithTheme {...{ theme }}>
			{!hideHat && sequence ? (
				<CardHatSermon sequence={sequence} />
			) : (
				!hideSponsorHat && sponsor && <CardHatSponsor sponsor={sponsor} />
			)}
			<TeaseRecording
				{...{
					recording,
					theme,
					isOptionalLink,
					hideSinglePart: hideSponsorHat,
				}}
			/>
		</CardWithTheme>
	);
}
