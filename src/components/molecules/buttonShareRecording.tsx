import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading6 from '@components/atoms/heading6';
import { BaseColors } from '@lib/constants';
import { ButtonShareRecordingFragment } from '@lib/generated/graphql';

import IconShare from '../../../public/img/icon-share.svg';

import { isBackgroundColorDark } from './buttonPlay';
import styles from './buttonShareRecording.module.scss';
import Dropdown from './dropdown';
import IconButton from './iconButton';

export default function ButtonShareRecording({
	recording,
	backgroundColor,
	shareVideo,
}: {
	recording: ButtonShareRecordingFragment;
	backgroundColor: BaseColors;
	shareVideo: boolean;
}): JSX.Element {
	const intl = useIntl();
	const { id, shareUrl } = recording;
	// TODO: update embed code and links
	const facebookLink = `https://facebook.com/share.php?u=${shareUrl}`;
	const twitterLink = `https://twitter.com/intent/tweet?url=${shareUrl}`;
	const emailLink = `mailto:?subject=Enjoy%20this%20blessing&body=${shareUrl}`;
	const copyLink = shareUrl;
	const embedCode = `<iframe src="https://www.audioverse.org/english/embed/media/${id}" width="500" height="309" scrolling="no" frameBorder="0" ></iframe>`;

	const shareOptions = [
		[
			facebookLink,
			<FormattedMessage
				id="molecule-buttonShareRecording__facebook"
				defaultMessage="Facebook"
				key="facebook"
			/>,
		],
		[
			twitterLink,
			<FormattedMessage
				id="molecule-buttonShareRecording__twitter"
				defaultMessage="Twitter"
				key="twitter"
			/>,
		],
		[
			emailLink,

			<FormattedMessage
				id="molecule-buttonShareRecording__email"
				defaultMessage="Email"
				key="email"
			/>,
		],
		[
			copyLink,

			<FormattedMessage
				id="molecule-buttonShareRecording__copyLink"
				defaultMessage="Copy Link"
				key="copy"
			/>,
		],
	] as const;

	return (
		<Dropdown
			id="shareMenu"
			trigger={({ isOpen, ...props }) => (
				<IconButton
					Icon={IconShare}
					color={
						isBackgroundColorDark(backgroundColor)
							? isOpen
								? BaseColors.SALMON
								: BaseColors.WHITE
							: isOpen
							? BaseColors.RED
							: BaseColors.DARK
					}
					backgroundColor={backgroundColor}
					aria-label={intl.formatMessage({
						id: 'molecule-buttonShareRecording__buttonLabel',
						defaultMessage: 'share',
						description: 'recording share button label',
					})}
					{...props}
				/>
			)}
		>
			<div className={styles.container}>
				<Heading6 sans loose uppercase large>
					<FormattedMessage
						id="molecule-buttonShareRecording__shareTitle"
						defaultMessage="Share"
						description="recording share button section title"
					/>
				</Heading6>
				{shareOptions.map(([link, label], index) => (
					<p className={styles.paragraph} key={index}>
						<a href={link} target="_blank" rel="noreferrer">
							{label}
						</a>
					</p>
				))}
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
				<input className={styles.embedCode} readOnly={true} value={embedCode} />
			</div>
		</Dropdown>
	);
}
