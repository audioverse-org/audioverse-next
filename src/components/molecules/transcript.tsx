import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Alert from '~components/atoms/alert';
import { RecordingContentType } from '~src/__generated__/graphql';

import styles from './transcript.module.scss';

export default function Transcript({
	text,
	recordingContentType,
}: {
	text: string;
	recordingContentType: RecordingContentType;
}): JSX.Element {
	const isManuallyCreatedTranscript = text.includes('<p');
	const __html = isManuallyCreatedTranscript
		? text
		: text
				.split('\n')
				.map((paragraph) => `<p>${paragraph}</p>`)
				.join('');

	return (
		<>
			{!isManuallyCreatedTranscript && (
				<Alert className={styles.alert}>
					<p>
						<FormattedMessage
							id="molecule-transcript__disclaimer"
							defaultMessage="This transcript may be automatically generated."
							description="transcript disclaimer"
						/>
					</p>
					<p>
						<FormattedMessage
							id="molecule-transcript__help"
							defaultMessage="Our auto-generated transcripts need your help. Feel free to e-mail us your edited text of this transcript for your benefit and others. media@audioverse.org"
							description="transcript assistance request"
						/>
					</p>
				</Alert>
			)}
			<div
				className={clsx(
					styles.text,
					recordingContentType === RecordingContentType.BibleChapter &&
						styles.bibleText
				)}
				dangerouslySetInnerHTML={{ __html }}
			/>
		</>
	);
}
