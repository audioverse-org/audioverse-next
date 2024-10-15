import React from 'react';

import TeaseRecording from '../teaseRecording';
import { CardRecordingFragment } from './__generated__/recording';
import CardWithTheme from './base/withTheme';
import CardHatSermon from './hat/sermon';
import CardHatSponsor from './hat/sponsor';

export interface CardSermonProps {
	recording: CardRecordingFragment;
	hideHat?: boolean;
	hideSponsorHat?: boolean;
	isOptionalLink?: boolean;
	fullBleed?: boolean;
}

export default function CardSermon({
	recording,
	hideHat,
	hideSponsorHat,
	isOptionalLink,
	fullBleed,
}: CardSermonProps): JSX.Element {
	const { sequence, sponsor } = recording;
	const theme = 'sermon';

	return (
		<CardWithTheme theme={theme} fullBleed={fullBleed}>
			{!hideHat && sequence ? (
				<CardHatSermon sequence={sequence} fullBleed={fullBleed} />
			) : (
				!hideSponsorHat &&
				sponsor && <CardHatSponsor sponsor={sponsor} fullBleed={fullBleed} />
			)}
			<TeaseRecording
				recording={recording}
				theme={theme}
				isOptionalLink={isOptionalLink}
				fullBleed={fullBleed}
			/>
		</CardWithTheme>
	);
}
