import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';
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
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			<button
				aria-label={intl.formatMessage({
					id: 'molecule-buttonShare__buttonLabel',
					defaultMessage: 'share',
					description: 'share button label',
				})}
				onClick={() => setOpen(true)}
			>
				<IconShare />
			</button>
			<Dialog open={open} onClose={() => setOpen(false)}>
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
			</Dialog>
		</>
	);
}
