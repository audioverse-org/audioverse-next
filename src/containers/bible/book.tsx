import Link from 'next/link';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import BibleVersionTypeLockup from '@components/molecules/bibleVersionTypeLockup';
import Player from '@components/molecules/player';
import Tease from '@components/molecules/tease';
import TeaseRecording from '@components/molecules/teaseRecording';
import { BaseColors } from '@lib/constants';
import {
	GetBibleBookDetailPageDataQuery,
	PlayerFragment,
	RecordingContentType,
	Scalars,
} from '@lib/generated/graphql';
import { makeBibleVersionRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './book.module.scss';

export interface BookProps {
	audiobible: GetBibleBookDetailPageDataQuery['audiobible'];
	chapterNumber: string | number;
}

function Book({ audiobible, chapterNumber }: Must<BookProps>): JSX.Element {
	const { id, title, book, copyrightText, sponsor } = audiobible;
	const chapters = book.chapters || [];
	const languageRoute = useLanguageRoute();
	const [chapterId, setChapterId] = useState<Scalars['ID']>(
		`${book.id}-${chapterNumber}`
	);
	const chapter = chapters.find((c) => c.id === chapterId);
	const verses = chapter?.verses || [];

	// TODO: Remove this transformation when the API returns Recording type
	const recording: Partial<PlayerFragment> = {
		audioFiles: [
			{
				url: chapter?.url || '',
				mimeType: 'audio/mpeg',
				filesize: 'unknown',
			},
		],
	};

	return (
		<Tease>
			<Link href={makeBibleVersionRoute(languageRoute, id)}>
				<a className={styles.hat}>
					<BibleVersionTypeLockup unpadded />
					<h4>{title}</h4>
				</a>
			</Link>
			<div className={styles.content}>
				<div className={styles.main}>
					<Heading1>{chapter?.title}</Heading1>
					{chapter?.url && (
						<Player
							recording={recording as PlayerFragment}
							backgroundColor={BaseColors.WHITE}
						/>
					)}
					<label>
						<FormattedMessage
							id="bibleBook__chapterSelectLabel"
							defaultMessage="Chapter"
							description="Bible book detail page chapter select label"
						/>{' '}
						<select
							onChange={(e) => {
								setChapterId(e.target.value);
							}}
						>
							{chapters.map((c) => (
								<option key={c.id} value={c.id}>
									{c.title}
								</option>
							))}
						</select>
					</label>
					<h3>
						<FormattedMessage
							id="bibleBook__tabAbout"
							defaultMessage="About"
							description="Bible book detail page about tab title"
						/>
					</h3>
					<h4>{sponsor.name}</h4>
					<p>{sponsor.url}</p>
					<p>
						<FormattedMessage
							id="bibleBook__copyrightPrefix"
							defaultMessage="Copyright ⓒ"
							description="Bible book detail page copyright prefix"
						/>{' '}
						<span>{copyrightText}</span>
					</p>
					<h3>
						<FormattedMessage
							id="bibleBook__tabDownloads"
							defaultMessage="Downloads"
							description="Bible book detail page downloads tab title"
						/>
					</h3>
					<Link href={chapter?.url || ''}>
						<a>
							<FormattedMessage
								id="bibleBook__mp3Label"
								defaultMessage="mp3:"
								description="Bible book detail page mp3 download link label"
							/>{' '}
							{chapter?.title}
						</a>
					</Link>
					<h3>
						<FormattedMessage
							id="bibleBook__tabTranscript"
							defaultMessage="Transcript"
							description="Bible book detail page transcript tab title"
						/>
					</h3>
					<div>
						{verses.map(({ number, text }) => (
							<span className={styles.verse} key={number}>
								<sup>{number}</sup>
								<span>{text}</span>
							</span>
						))}
					</div>
					<h3>
						<FormattedMessage
							id="bibleBook__tabShare"
							defaultMessage="Share"
							description="Bible book detail page share tab title"
						/>
					</h3>
					<h4>
						<FormattedMessage
							id="bibleBook__shortUrlLabel"
							defaultMessage="Short URL"
							description="Bible book detail page short url label"
						/>
					</h4>
					<p>{book.shareUrl}</p>
				</div>

				<div className={styles.chapters}>
					<div className={styles.chaptersScroller}>
						<LineHeading small color={BaseColors.RED}>
							<FormattedMessage
								id="bibleBook__chapterListTitle"
								defaultMessage="Other Teachings in Series"
								description="Bible book chapter list title"
							/>
						</LineHeading>

						<div className={styles.chaptersItems}>
							{chapters.map((chapter) => (
								<div className={styles.item} key={chapter.id}>
									<TeaseRecording
										recording={{
											recordingContentType: RecordingContentType.Sermon,
											id: chapter.id,
											canonicalPath: chapter.url,
											title: chapter.title,
											duration: 0,
											sequence: null,
											sequenceIndex: null,
											persons: [],
											audioFiles: [],
											videoFiles: [],
											videoStreams: [],
										}}
										theme="chapter"
										unpadded
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Tease>
	);
}

export default withFailStates(
	Book,
	({ audiobible }: BookProps) => !audiobible?.book.title
);
