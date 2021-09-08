import { Menu, MenuItem } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import { ButtonDownloadFragment } from '@lib/generated/graphql';
import { readableBytes } from '@lib/readableBytes';

import IconDownload from '../../../public/img/icon-download.svg';

import { isBackgroundColorDark } from './buttonPlay';
import IconButton from './iconButton';

/* TODO: Disable if downloads not allowed */
export default function ButtonDownload({
	recording,
	backgroundColor,
}: {
	recording: ButtonDownloadFragment;
	backgroundColor: BaseColors;
}): JSX.Element {
	const { audioDownloads = [], videoDownloads = [] } = recording;
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const intl = useIntl();

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				Icon={IconDownload}
				onPress={({ currentTarget }) => setAnchorEl(currentTarget)}
				color={
					isBackgroundColorDark(backgroundColor)
						? BaseColors.WHITE
						: BaseColors.DARK
				}
				{...{
					backgroundColor,
					'aria-label': intl.formatMessage({
						id: 'molecule-buttonDownload__buttonLabel',
						defaultMessage: 'downloads',
						description: 'download button label',
					}),
					'aria-controls': 'downloads',
					'aria-haspopup': 'true',
				}}
			/>
			<Menu
				id="downloads"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem disabled>
					<FormattedMessage
						id={'molecule-buttonDownload__menuAudioHeading'}
						defaultMessage={'Audio Downloads'}
						description={'download button menu audio heading'}
					/>
				</MenuItem>
				{audioDownloads.map((file) => (
					<MenuItem key={file.url} onClick={handleClose}>
						<Link href={file.url}>
							<a>{readableBytes(file.filesize)}</a>
						</Link>
					</MenuItem>
				))}
				{videoDownloads.length > 0 && (
					<MenuItem disabled>
						<FormattedMessage
							id={'molecule-buttonDownload__menuVideoHeading'}
							defaultMessage={'Video Downloads'}
							description={'download button menu video heading'}
						/>
					</MenuItem>
				)}
				{videoDownloads.map((file) => (
					<MenuItem key={file.url} onClick={handleClose}>
						<Link href={file.url}>
							<a>{readableBytes(file.filesize)}</a>
						</Link>
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
