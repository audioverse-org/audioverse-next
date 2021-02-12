import _ from 'lodash';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import CopyrightInfo from '@components/molecules/copyrightInfo';
import Player from '@components/molecules/player';
import SponsorInfo from '@components/molecules/sponsorInfo';
import { GetAudiobookDetailPageDataQuery } from '@lib/generated/graphql';
import { readableBytes } from '@lib/readableBytes';

type Audiobook = NonNullable<GetAudiobookDetailPageDataQuery['audiobook']>;

export interface AudiobookProps {
	audiobook: Audiobook | undefined | null;
	rssPath: string;
}

function Audiobook({ audiobook, rssPath }: AudiobookProps): JSX.Element {
	const recordings = audiobook?.recordings.nodes || [];
	const firstId = recordings.length ? recordings[0].id : undefined;
	const [id, setId] = useState<string | undefined>(firstId);
	const recording = recordings.find((r) => r.id === id);
	const audioFiles = recording?.audioFiles || [];
	const sources = [{ src: audioFiles[0]?.url }];
	const copyrightSources = _.uniqBy(recordings, (r) => {
		const compare = _.pick(r, [
			'copyrightYear',
			'distributionAgreement',
			'sponsor',
		]);

		return JSON.stringify(compare);
	});

	return (
		<>
			<a href={rssPath} target={'_blank'} rel={'noreferrer noopener'}>
				<FormattedMessage
					id="audiobookDetailPage__rssLinkLabel"
					defaultMessage="RSS"
					description="Audiobook detail rss link label"
				/>
			</a>
			{recording && <Player sources={sources} />}
			<p>
				<FormattedMessage
					id="audiobookDetailPage__nowPlaying"
					defaultMessage="Now playing:"
					description="Audiobook detail now playing prefix"
				/>{' '}
				{recording?.title}
			</p>
			<h2>
				<FormattedMessage
					id="audiobookDetailPage__aboutTab"
					defaultMessage="About"
					description="Audiobook detail about tab"
				/>
			</h2>
			{audiobook?.sponsor && <SponsorInfo sponsor={audiobook.sponsor} />}
			{copyrightSources.length > 1 && (
				<p>
					<FormattedMessage
						id="audiobookDetailPage__multipleCopyrightExplanation"
						defaultMessage="Portions of this audiobook are covered under the following license terms:"
						description="Audiobook detail multiple copyright explanation"
					/>
				</p>
			)}
			{copyrightSources.map((r) => (
				<CopyrightInfo key={r.id} recording={r} />
			))}
			<h2>
				<FormattedMessage
					id="audiobookDetailPage__chaptersTab"
					defaultMessage="Chapters"
					description="Audiobook detail chapters tab"
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
			<h2>
				<FormattedMessage
					id="audiobookDetailPage__shareTabTitle"
					defaultMessage="Share"
					description="Audiobook detail share tab"
				/>
			</h2>
			<label>
				<FormattedMessage
					id="audiobookDetailPage__shortUrlLabel"
					defaultMessage="Short URL"
					description="Audiobook detail short url label"
				/>{' '}
				<input type="text" value={audiobook?.shareUrl} readOnly={true} />
			</label>
		</>
	);
}

export default Audiobook;
