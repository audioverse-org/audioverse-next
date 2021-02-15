import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PlaylistFragment } from '@lib/generated/graphql';
import { readableBytes } from '@lib/readableBytes';

type Recording<R> = R & PlaylistFragment;

interface PlaylistProps<R> {
	children: (recording: Recording<R>) => JSX.Element;
	recordings: Recording<R>[];
	initial?: string;
}

export default function Playlist<R>({
	children,
	recordings,
	initial,
}: PlaylistProps<R>): JSX.Element {
	const [id, setId] = useState<string | undefined>(() => {
		const ids = recordings.map((r) => r.id);
		return initial && ids.includes(initial) ? initial : recordings[0]?.id;
	});
	const recording = recordings.find((r) => r.id === id);
	const detail = recording && children(recording);

	// TODO: Add video download links
	return (
		<>
			{detail}
			{recordings.length > 1 && (
				<>
					<h2>
						<FormattedMessage
							id="playlist__heading"
							defaultMessage="Playlist"
							description="Playlist item selector main heading"
						/>
					</h2>
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
			)}
		</>
	);
}
