import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading6 from '~components/atoms/heading6';
import { BaseColors } from '~lib/constants';
import { readableBytes } from '~lib/readableBytes';
import iconDownloadAudio from '~public/img/icons/download-audio.svg';
import iconDownloadVedio from '~public/img/icons/download-video.svg';
import { gtmPushEvent } from '~src/services/gtm';

import { ButtonDownloadFragment } from './__generated__/buttonDownload';
import styles from './buttonDownload.module.scss';
import { isBackgroundColorDark } from './buttonPlay';
import Dropdown from './dropdown';
import IconButton from './iconButton';

export default function ButtonDownload({
	recording,
	backgroundColor,
}: {
	recording: ButtonDownloadFragment;
	backgroundColor: BaseColors;
}): JSX.Element | null {
	const { audioDownloads, videoDownloads, isDownloadAllowed } = recording;
	const intl = useIntl();

	if (!isDownloadAllowed) {
		return null;
	}

	const formatLabel = (
		quality: 'high' | 'medium' | 'low',
		filesize: string,
	) => {
		const values = {
			size: readableBytes(filesize),
		};
		switch (quality) {
			case 'high':
				return intl.formatMessage(
					{
						id: 'molecule-buttonDownload__linkLabelHigh',
						defaultMessage: 'High Quality ({size})',
					},
					values,
				);
			case 'medium':
				return intl.formatMessage(
					{
						id: 'molecule-buttonDownload__linkLabelMedium',
						defaultMessage: 'Medium Quality ({size})',
					},
					values,
				);
			case 'low':
				return intl.formatMessage(
					{
						id: 'molecule-buttonDownload__linkLabelLow',
						defaultMessage: 'Low Quality ({size})',
					},
					values,
				);
		}
	};

	return (
		<>
			<Dropdown
				id="downloadMenu"
				trigger={({ isOpen, ...props }) => (
					<IconButton
						Icon={iconDownloadAudio}
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
							id: 'molecule-buttonDownload__buttonLabel',
							defaultMessage: 'downloads',
							description: 'download button label',
						})}
						{...props}
					/>
				)}
			>
				{(handleClose) => (
					<div className={styles.container}>
						<Heading6 sans loose uppercase large>
							<FormattedMessage
								id="molecule-buttonDownload__menuAudioHeading"
								defaultMessage="Audio Downloads"
								description="download button menu audio heading"
							/>
						</Heading6>
						{audioDownloads.map(({ url, filesize, bitrate }, index) => (
							<p className={styles.paragraph} key={index} onClick={handleClose}>
								<a
									href={url}
									target="_blank"
									rel="noreferrer noopener"
									onClick={() => {
										gtmPushEvent('download', {
											content_type: recording.recordingContentType,
											media_type: 'audio',
											item_id: recording.id,
											title: recording.title,
											presenter: recording.speakers
												.map((item) => item.name)
												.join(';'),
											sponsor: recording.sponsor?.title,
											conference: recording.collection?.title,
											series: recording.sequence?.title,
										});
									}}
								>
									{formatLabel(
										bitrate <= 24 ? 'low' : bitrate <= 48 ? 'medium' : 'high',
										filesize,
									)}
								</a>
							</p>
						))}
					</div>
				)}
			</Dropdown>
			{videoDownloads.length > 0 && (
				<Dropdown
					id="downloadMenu2"
					trigger={({ isOpen, ...props }) => (
						<IconButton
							Icon={iconDownloadVedio}
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
								id: 'molecule-buttonDownload__buttonLabel',
								defaultMessage: 'downloads',
								description: 'download button label',
							})}
							{...props}
						/>
					)}
				>
					{(handleClose) => (
						<div className={styles.container}>
							<Heading6 sans loose uppercase large>
								<FormattedMessage
									id="molecule-buttonDownload__menuVideoHeading"
									defaultMessage="Video Downloads"
									description="download button menu video heading"
								/>
							</Heading6>
							{videoDownloads.map(({ url, filesize, height, width }, index) => {
								const frameSize = height * width;
								return (
									<p
										className={styles.paragraph}
										key={index}
										onClick={handleClose}
									>
										<a
											href={url}
											target="_blank"
											rel="noreferrer noopener"
											onClick={() => {
												gtmPushEvent('download', {
													content_type: recording.recordingContentType,
													media_type: 'video',
													item_id: recording.id,
													title: recording.title,
													presenter: recording.speakers
														.map((item) => item.name)
														.join(';'),
													sponsor: recording.sponsor?.title,
													conference: recording.collection?.title,
													series: recording.sequence?.title,
												});
											}}
										>
											{formatLabel(
												frameSize <= 200000
													? 'low'
													: frameSize <= 400000
														? 'medium'
														: 'high',
												filesize,
											)}
										</a>
									</p>
								);
							})}
						</div>
					)}
				</Dropdown>
			)}
		</>
	);
}
