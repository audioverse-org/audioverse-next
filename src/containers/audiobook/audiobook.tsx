import React from 'react';

import Player from '@components/molecules/player';
import { GetAudiobookDetailPageDataQuery } from '@lib/generated/graphql';

type Audiobook = NonNullable<GetAudiobookDetailPageDataQuery['audiobook']>;

export interface AudiobookProps {
	audiobook: Audiobook | undefined | null;
}

function Audiobook({ audiobook }: AudiobookProps): JSX.Element {
	const recordings = audiobook?.recordings.nodes || [];
	const recording = recordings.length ? recordings[0] : undefined;

	return (
		<>
			<Player sources={[{ src: recording?.audioFiles[0].url }]} />
		</>
	);
}

export default Audiobook;
