import React from 'react';

import {
	CardBibleChapterFragment,
	RecordingContentType,
} from '@lib/generated/graphql';
import { makeBibleVersionRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

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
	const language = useLanguageRoute();

	return (
		<CardWithTheme {...{ theme }}>
			{/*TODO: Make hat dynamic*/}
			<CardHat
				title="King James Version"
				url={makeBibleVersionRoute(language, 'ENGKJV1')}
				icon={<HatIcon />}
				longHat
			/>
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
