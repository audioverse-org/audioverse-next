import React from 'react';

import TeaseRecording from '../teaseRecording';
import { CardRecordingFragment } from './__generated__/recording';
import CardWithTheme from './base/withTheme';
import CardHatSermon from './hat/sermon';
import CardHatSponsor from './hat/sponsor';
import style from './sermon.module.scss';

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
		<CardWithTheme
			theme={theme}
			className={fullBleed ? style.card_fullBleed : undefined}
		>
			{!hideHat && sequence ? (
				<CardHatSermon sequence={sequence} />
			) : (
				!hideSponsorHat &&
				sponsor && (
					<CardHatSponsor
						sponsor={sponsor}
						className={fullBleed ? style.sponsor : undefined}
					/>
				)
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
