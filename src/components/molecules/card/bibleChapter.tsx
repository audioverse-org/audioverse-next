import React from 'react';

import {
	CardBibleChapterFragment,
	RecordingContentType,
} from '@lib/generated/graphql';

import HatIcon from '../../../../public/img/fa-bible.svg';
import TeaseRecording from '../teaseRecording';

import CardWithTheme from './base/withTheme';
import CardHat from './hat';

interface CardBibleChapterProps {
	chapter: CardBibleChapterFragment;
}

export default function CardBibleChapter({
	chapter,
}: CardBibleChapterProps): JSX.Element {
	const recording = {
		recordingContentType: RecordingContentType.Sermon,
		id: chapter.id,
		canonicalPath: chapter.url,
		title: chapter.title,
		duration: 2520,
		sequence: null,
		sequenceIndex: null,
		sponsor: null,
		persons: [],
		writers: [],
		audioFiles: [],
		videoFiles: [],
		videoStreams: [],
	};
	const theme = 'chapter';

	return (
		<CardWithTheme {...{ theme }}>
			<CardHat
				title="Genesis (KJV)"
				label="TODO"
				url="TODO"
				icon={<HatIcon />}
				longHat
			>
				<h1>TODO</h1>
			</CardHat>
			<TeaseRecording
				{...{
					recording,
					theme,
					disablePlayback: true,
					disableUserFeatures: true,
				}}
			/>
		</CardWithTheme>
	);
}
