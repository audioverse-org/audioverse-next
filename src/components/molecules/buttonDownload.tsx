import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading6 from '@components/atoms/heading6';
import { ButtonDownloadFragment } from '@components/molecules/buttonDownload.gql';
import { BaseColors } from '@lib/constants';
import { readableBytes } from '@lib/readableBytes';

import IconDownload from '../../../public/img/icons/icon-download.svg';

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
		filesize: string
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
					values
				);
			case 'medium':
				return intl.formatMessage(
					{
						id: 'molecule-buttonDownload__linkLabelMedium',
						defaultMessage: 'Medium Quality ({size})',
					},
					values
				);
			case 'low':
				return intl.formatMessage(
					{
						id: 'molecule-buttonDownload__linkLabelLow',
						defaultMessage: 'Low Quality ({size})',
					},
					values
				);
		}
	};

	return (
		<Dropdown
			id="downloadMenu"
			trigger={({ isOpen, ...props }) => (
				<IconButton
					Icon={IconDownload}
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
							<a href={url} target="_blank" rel="noreferrer noopener">
								{formatLabel(
									bitrate <= 24 ? 'low' : bitrate <= 48 ? 'medium' : 'high',
									filesize
								)}
							</a>
						</p>
					))}
					{videoDownloads.length > 0 && (
						<>
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
										<a href={url} target="_blank" rel="noreferrer noopener">
											{formatLabel(
												frameSize <= 200000
													? 'low'
													: frameSize <= 400000
													? 'medium'
													: 'high',
												filesize
											)}
										</a>
									</p>
								);
							})}
						</>
					)}
				</div>
			)}
		</Dropdown>
	);
}
