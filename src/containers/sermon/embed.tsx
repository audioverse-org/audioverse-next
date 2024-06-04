import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import Heading6 from '~components/atoms/heading6';
import withFailStates from '~components/HOCs/withFailStates';
import PersonLockup from '~components/molecules/personLockup';
import Player from '~components/molecules/player';
import AndMiniplayer from '~components/templates/andMiniplayer';
import { getRecordingTypeTheme } from '~lib/getRecordingTheme';
import { getSequenceTypeTheme } from '~lib/getSequenceType';
import Logo from '~public/img/logo-small.svg';
import { Must } from '~src/types/types';

import { GetSermonDetailDataQuery } from './__generated__/detail';
import styles from './embed.module.scss';

export interface SermonEmbedProps {
	recording: GetSermonDetailDataQuery['sermon'];
}

function SermonEmbed({ recording }: Must<SermonEmbedProps>) {
	const {
		title,
		canonicalUrl,
		contentType,
		sequence,
		sequenceIndex,
		speakers: persons,
	} = recording;
	const { accentColor, backgroundColor, textSecondaryColor } =
		getRecordingTypeTheme(contentType);

	let sequenceHat: JSX.Element | null = null;
	if (sequence) {
		const { Icon } = getSequenceTypeTheme(sequence.contentType);
		sequenceHat = (
			<a href={sequence.canonicalPath} target="_top" className={styles.hat}>
				<Icon />
				<span>{sequence.title}</span>
			</a>
		);
	}
	return (
		<AndMiniplayer>
			<div className={styles.base}>
				{sequenceHat}
				<div className={styles.content}>
					<div className={styles.titleRow}>
						<div className={styles.text}>
							{sequenceIndex && sequence && (
								<Heading6 large sans className={styles.part}>
									<FormattedMessage
										id="embed__partInfo"
										defaultMessage="Part {index} of {count}"
										values={{
											index: sequenceIndex,
											count: sequence.recordings.aggregate?.count,
										}}
									/>
								</Heading6>
							)}
							<Heading1 className={styles.title}>
								<a
									href={canonicalUrl}
									target="_top"
									className={styles.titleLink}
								>
									{title}
								</a>
							</Heading1>
						</div>
						<a
							/* eslint-disable-next-line @calm/react-intl/missing-formatted-message */
							aria-label="AudioVerse"
							className={styles.logo}
							href="https://www.audioverse.org/"
							target="_top"
						>
							<Logo />
						</a>
					</div>
					<ul className={styles.speakers}>
						{persons.map((speaker) => (
							<li key={speaker.canonicalPath}>
								<PersonLockup
									person={speaker}
									textColor={textSecondaryColor}
									hoverColor={accentColor}
									isLinked
								/>
							</li>
						))}
					</ul>

					<Player
						{...{
							recording,
							backgroundColor,
							// prefersAudio: true,
							compact: true,
						}}
					/>
				</div>
			</div>
		</AndMiniplayer>
	);
}

export default withFailStates<SermonEmbedProps>(SermonEmbed, {
	useShould404: (props) => !props.recording,
});
