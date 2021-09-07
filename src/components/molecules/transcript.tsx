import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import IconDisclosure from '../../../public/img/icon-disclosure-light-small.svg';

import Button from './button';
import styles from './transcript.module.scss';

export default function Transcript({
	text,
	useInverse,
}: {
	text: string;
	useInverse: boolean;
}): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className={`${styles.base} ${isOpen ? styles.open : ''}`}>
			<Button
				type={useInverse ? 'secondaryInverse' : 'secondary'}
				onClick={() => setIsOpen(!isOpen)}
				text={
					isOpen ? (
						<FormattedMessage
							id="molecule-transcript__labelClose"
							defaultMessage="Hide Transcript"
							description="transcript button label close"
						/>
					) : (
						<FormattedMessage
							id="molecule-transcript__labelOpen"
							defaultMessage="Read Transcript"
							description="transcript button label open"
						/>
					)
				}
				Icon={IconDisclosure}
			/>
			{isOpen && (
				<>
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
					<p>{text}</p>
				</>
			)}
		</div>
	);
}
