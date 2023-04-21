import React from 'react';

import TeaseRecording from '../teaseRecording';

import CardWithTheme from './base/withTheme';
import CardHatBibleBook from './hat/bibleBook';
import { CardRecordingFragment } from './__generated__/recording';

interface CardBibleChapterProps {
	recording: CardRecordingFragment;
	hideHat?: boolean;
	isOptionalLink?: boolean;
}

export default function CardBibleChapter({
	recording,
	hideHat,
	isOptionalLink,
}: CardBibleChapterProps): JSX.Element {
	const { sequence, sponsor } = recording;
	const theme = 'chapter';

	return (
		<CardWithTheme {...{ theme }}>
			{!hideHat && sequence && sponsor && (
				<CardHatBibleBook sequence={sequence} />
			)}
			<TeaseRecording {...{ recording, theme, isOptionalLink }} />
		</CardWithTheme>
	);
}
