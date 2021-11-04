import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading6 from '@components/atoms/heading6';
import { BaseColors } from '@lib/constants';
import { ButtonShareRecordingFragment } from '@lib/generated/graphql';

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
	const { id, shareUrl } = recording;
	const embedCode = `<iframe src="https://www.audioverse.org/english/embed/media/${id}" width="500" height="309" scrolling="no" frameBorder="0" ></iframe>`;

	return (
		<ButtonShare {...{ shareUrl, backgroundColor }}>
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
