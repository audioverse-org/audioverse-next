import React, { MouseEvent, PropsWithChildren, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading6 from '@components/atoms/heading6';
import { BaseColors } from '@lib/constants';

import IconShareLight from '../../../public/img/icon-share-light.svg';
import IconShare from '../../../public/img/icon-share.svg';

import { isBackgroundColorDark } from './buttonPlay';
import styles from './buttonShare.module.scss';
import Dropdown from './dropdown';
import IconButton from './iconButton';
import RssAlternate from './rssAlternate';

type Props = {
	shareUrl: string;
	backgroundColor: BaseColors;
	rssUrl?: string;
	light?: boolean;
	triggerClassName?: string;
};

export default function ButtonShare({
	shareUrl,
	backgroundColor,
	rssUrl,
	children,
	light,
	triggerClassName,
}: PropsWithChildren<Props>): JSX.Element {
	const intl = useIntl();
	const [justCopied, setJustCopied] = useState(false);

	// TODO: update embed code and links
	const facebookLink = `https://facebook.com/share.php?u=${shareUrl}`;
	const twitterLink = `https://twitter.com/intent/tweet?url=${shareUrl}`;
	const emailLink = `mailto:?subject=Enjoy%20this%20blessing&body=${shareUrl}`;
	const copyLink = shareUrl;

	const onCopyLink = (e: MouseEvent) => {
		e.preventDefault();
		if (navigator.clipboard) {
			navigator.clipboard.writeText(shareUrl).then(() => {
				setJustCopied(true);
				setTimeout(() => setJustCopied(false), 2500);
			});
		} else {
			window.open(shareUrl);
		}
	};

	const shareOptions = [
		[
			facebookLink,
			<FormattedMessage
				id="molecule-buttonShare__facebook"
				defaultMessage="Facebook"
				key="facebook"
			/>,
		],
		[
			twitterLink,
			<FormattedMessage
				id="molecule-buttonShare__twitter"
				defaultMessage="Twitter"
				key="twitter"
			/>,
		],
		[
			emailLink,
			<FormattedMessage
				id="molecule-buttonShare__email"
				defaultMessage="Email"
				key="email"
			/>,
		],
		[
			copyLink,
			justCopied ? (
				<FormattedMessage
					id="molecule-buttonShare__copied"
					defaultMessage="Copied!"
					key="copy"
				/>
			) : (
				<FormattedMessage
					id="molecule-buttonShare__copyLink"
					defaultMessage="Copy Link"
					key="copy"
				/>
			),
			onCopyLink,
		],
		...(rssUrl
			? ([
					[
						rssUrl,
						<FormattedMessage
							id="molecule-buttonShare__copyRSSLink"
							defaultMessage="Copy RSS Link"
							key="copyRSS"
						/>,
					],
			  ] as const)
			: []),
	] as const;

	return (
		<>
			{rssUrl && <RssAlternate url={rssUrl} />}
			<Dropdown
				id="shareMenu"
				trigger={({ isOpen, ...props }) => (
					<IconButton
						Icon={light ? IconShareLight : IconShare}
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
							id: 'molecule-buttonShare__buttonLabel',
							defaultMessage: 'share',
							description: 'share button label',
						})}
						className={triggerClassName}
						{...props}
					/>
				)}
			>
				<div className={styles.container}>
					<Heading6 sans loose uppercase large>
						<FormattedMessage
							id="molecule-buttonShare__shareTitle"
							defaultMessage="Share"
							description="share button section title"
						/>
					</Heading6>
					{shareOptions.map(([link, label, onClick], index) => (
						<p className={styles.paragraph} key={index}>
							<a
								href={link}
								onClick={onClick}
								target="_blank"
								rel="noreferrer noopener"
							>
								{label}
							</a>
						</p>
					))}
					{children}
				</div>
			</Dropdown>
		</>
	);
}
