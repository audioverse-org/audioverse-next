import React from 'react';
import { FormattedMessage } from 'react-intl';

import CopyrightInfos from '@components/molecules/copyrightInfos';
import Player from '@components/molecules/player';
import SponsorInfo from '@components/molecules/sponsorInfo';
import Playlist from '@components/organisms/playlist';
import { GetAudiobookDetailPageDataQuery } from '@lib/generated/graphql';

type Audiobook = NonNullable<GetAudiobookDetailPageDataQuery['audiobook']>;

export interface AudiobookProps {
	audiobook: Audiobook | undefined | null;
	rssPath: string;
}

function Audiobook({ audiobook, rssPath }: AudiobookProps): JSX.Element {
	const recordings = audiobook?.recordings.nodes || [];

	return (
		<Playlist recordings={recordings}>
			{(recording) => {
				const audioFiles = recording.audioFiles || [];
				const sources = [{ src: audioFiles[0]?.url }];

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
						<CopyrightInfos recordings={recordings} />
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
			}}
		</Playlist>
	);
}

export default Audiobook;
