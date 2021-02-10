import React, { useState } from 'react';

import Player from '@components/molecules/player';
import { GetAudiobookDetailPageDataQuery } from '@lib/generated/graphql';
import { readableBytes } from '@lib/readableBytes';

type Audiobook = NonNullable<GetAudiobookDetailPageDataQuery['audiobook']>;

export interface AudiobookProps {
	audiobook: Audiobook | undefined | null;
}

function Audiobook({ audiobook }: AudiobookProps): JSX.Element {
	const recordings = audiobook?.recordings.nodes || [];
	const firstId = recordings.length ? recordings[0].id : undefined;
	const [id, setId] = useState<string | undefined>(firstId);
	const recording = recordings.find((r) => r.id === id);
	const sources = [{ src: recording?.audioFiles[0].url }];

	return (
		<>
			<Player sources={sources} />
			<ul>
				{recordings.map((r) => (
					<li key={r.id}>
						<button onClick={() => setId(r.id)}>{r.title}</button>
						{r.audioDownloads?.map((d) => (
							<a
								key={d.url}
								href={d.url}
								target={'_blank'}
								rel={'noreferrer noopener'}
							>
								{readableBytes(d.filesize)}
							</a>
						))}
					</li>
				))}
			</ul>
		</>
	);
}

export default Audiobook;
