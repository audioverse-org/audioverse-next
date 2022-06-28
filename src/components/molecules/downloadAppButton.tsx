import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import IconDisclosure from '../../../public/img/icons/icon-disclosure-light-small.svg';
import IconDownload from '../../../public/img/icons/icon-download-light.svg';

import Button, { IButtonType } from './button';
import styles from './downloadAppButton.module.scss';
import Dropdown from './dropdown';

type Props = {
	menuAlignment: 'left' | 'right';
	buttonType: IButtonType;
	id: string;
	alternateCta?: boolean;
	className?: string;
};

export default function DownloadAppButton({
	menuAlignment,
	buttonType,
	id,
	alternateCta,
	className,
}: Props): JSX.Element | null {
	const downloadOptions = [
		{
			link: 'https://itunes.apple.com/us/app/audioverse/id726998810?mt=8',
			label: (
				<FormattedMessage
					id="downloadAppButton__ios"
					defaultMessage="iOS App"
				/>
			),
		},
		{
			link: 'https://play.google.com/store/apps/details?id=org.audioverse.exodus',
			label: (
				<FormattedMessage
					id="downloadAppButton__android"
					defaultMessage="Android App"
				/>
			),
		},
	];

	return (
		<Dropdown
			id={id}
			trigger={({ isOpen, ...props }) => (
				<Button
					type={buttonType}
					text={
						alternateCta ? (
							<FormattedMessage
								id="downloadAppButton__altLabel"
								defaultMessage="Download Now"
							/>
						) : (
							<FormattedMessage
								id="downloadAppButton__label"
								defaultMessage="Download App"
							/>
						)
					}
					IconLeft={alternateCta ? undefined : IconDownload}
					IconRight={IconDisclosure}
					className={clsx(className, isOpen && styles.buttonOpen)}
					{...props}
				/>
			)}
			alignment={menuAlignment}
		>
			{(handleClose) => (
				<div className={styles.container}>
					{downloadOptions.map(({ link, label }) => (
						<p className={styles.paragraph} key={link} onClick={handleClose}>
							<a href={link} target="_blank" rel="noreferrer noopener">
								{label}
							</a>
						</p>
					))}
				</div>
			)}
		</Dropdown>
	);
}
