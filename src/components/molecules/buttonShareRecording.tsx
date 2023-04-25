import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading6 from '~components/atoms/heading6';
import { BaseColors } from '~lib/constants';

import { ButtonShareRecordingFragment } from './__generated__/buttonShareRecording';
import ButtonShare from './buttonShare';
import styles from './buttonShareRecording.module.scss';

export default function ButtonShareRecording({
	recording,
	backgroundColor,
	shareVideo,
	disableEmbedCode,
}: {
	recording: ButtonShareRecordingFragment;
	backgroundColor: BaseColors;
	shareVideo: boolean;
	disableEmbedCode?: boolean;
}): JSX.Element {
	const intl = useIntl();

	const { id, shareUrl, title, speakers } = recording;
	const embedCode = `<iframe src="https://www.audioverse.org/english/embed/media/${id}" width="500" height="309" scrolling="no" frameBorder="0" ></iframe>`;

	return (
		<ButtonShare
			{...{
				shareUrl,
				backgroundColor,
				emailSubject: intl.formatMessage(
					{
						id: 'buttonShareRecording__emailSubject',
						defaultMessage: '{title} by {presenters}',
					},
					{
						title,
						presenters: speakers.map(({ name }) => name).join(', '),
					}
				),
			}}
		>
			{!disableEmbedCode && (
				<div className={styles.container}>
					<Heading6 sans loose uppercase large>
						{shareVideo ? (
							<FormattedMessage
								id="molecule-buttonShareRecording__videoEmbedLabel"
								defaultMessage="Video Embed Code"
							/>
						) : (
							<FormattedMessage
								id="molecule-buttonShareRecording__audioEmbedLabel"
								defaultMessage="Audio Embed Code"
							/>
						)}
					</Heading6>
					<input
						className={styles.embedCode}
						readOnly={true}
						value={embedCode}
					/>
				</div>
			)}
		</ButtonShare>
	);
}
