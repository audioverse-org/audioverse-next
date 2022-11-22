import clsx from 'clsx';
import startCase from 'lodash/startCase';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import {
	CardRecordingFragment,
	SequenceContentType,
} from '@lib/generated/graphql';
import { makeBibleMusicRoute, makeBibleMusicTrackRoute } from '@lib/routes';
import useHover from '@lib/useHover';
import useLanguageRoute from '@lib/useLanguageRoute';

import SequenceTypeLockup from '../sequenceTypeLockup';
import TeaseRecordingStack from '../teaseRecordingStack';

import CardWithTheme from './base/withTheme';
import styles from './songBook.module.scss';

interface CardSongProps {
	book: string;
	recordings?: CardRecordingFragment[] | null;
	recordingCount?: number;
}

export default function CardSongBook({
	book,
	recordings,
	recordingCount,
}: CardSongProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const [subRef, isSubHovered] = useHover<HTMLDivElement>();

	const theme = 'songBook';

	return (
		<CardWithTheme {...{ theme }}>
			<Link
				href={makeBibleMusicRoute(languageRoute, book)}
				className={clsx(styles.container, isSubHovered && styles.otherHovered)}
				legacyBehavior
			>
				<a>
					<SequenceTypeLockup contentType={SequenceContentType.MusicAlbum} />
					<Heading2 sans className={styles.header}>
						{startCase(book)}
					</Heading2>
					<Heading6 sans uppercase loose className={styles.contributors}>
						<FormattedMessage
							id="cardSongBook__contributors"
							defaultMessage="Various Contributors"
						/>
					</Heading6>
					<Heading6 sans uppercase loose unpadded className={styles.songCount}>
						<FormattedMessage
							id="cardSongBook__numSongs"
							defaultMessage="{count} songs"
							values={{ count: recordingCount }}
						/>
					</Heading6>
					{recordings?.length ? (
						<div className={styles.subRecordings} ref={subRef}>
							<TeaseRecordingStack
								recordings={recordings.map((r) => ({
									...r,
									canonicalPath: makeBibleMusicTrackRoute(
										languageRoute,
										book,
										r.canonicalPath
									),
								}))}
								theme="song"
								isOptionalLink
								allSmall
							/>
						</div>
					) : null}
				</a>
			</Link>
		</CardWithTheme>
	);
}
