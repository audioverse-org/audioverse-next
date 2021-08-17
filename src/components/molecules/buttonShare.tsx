import { Menu } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { ButtonShareFragment } from '@lib/generated/graphql';

import IconShare from '../../../public/img/icon-share.svg';

export default function ButtonShare({
	recording,
}: {
	recording: ButtonShareFragment;
}): JSX.Element {
	const intl = useIntl();
	const embedCode = `<iframe src="https://www.audioverse.org/english/embed/media/${recording.id}" width="500" height="309" scrolling="no" frameBorder="0" ></iframe>`;
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// TODO: Extract icon button maybe?
	return (
		<>
			<button
				aria-label={intl.formatMessage({
					id: 'molecule-buttonShare__buttonLabel',
					defaultMessage: 'share',
					description: 'share button label',
				})}
				aria-controls={'shareMenu'}
				onClick={handleClick}
			>
				<IconShare />
			</button>
			<Menu
				id={'shareMenu'}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				keepMounted
				anchorEl={anchorEl}
			>
				<h6>
					<FormattedMessage
						id="sermonDetailPage__shareTitle"
						defaultMessage="Share"
						description="Sermon detail share section title"
					/>
				</h6>
				<h6>
					<FormattedMessage
						id="sermonDetailPage__shortUrlLabel"
						defaultMessage="Short URL"
						description="Sermon detail short url label"
					/>
				</h6>
				<p>{recording.shareUrl}</p>
				<label>
					<FormattedMessage
						id="sermonDetailPage__embedCodeLabel"
						defaultMessage="Embed Code"
						description="Sermon detail embed code label"
					/>{' '}
					<input readOnly={true} value={embedCode} />
				</label>
			</Menu>
		</>
	);
}
