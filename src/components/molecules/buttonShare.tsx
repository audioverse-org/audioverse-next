import React, { MouseEvent, PropsWithChildren, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading6 from '~components/atoms/heading6';
import { BaseColors } from '~lib/constants';
import ShareIcon from '~public/img/icons/share-alt.svg';
import ShareIconLight from '~public/img/icons/share-alt-light.svg';
import { analytics } from '~src/lib/analytics';

import { isBackgroundColorDark } from './buttonPlay';
import styles from './buttonShare.module.scss';
import Dropdown from './dropdown';
import IconButton from './iconButton';
import RssAlternate from './rssAlternate';

type Props = {
	shareUrl: string;
	backgroundColor: BaseColors;
	emailSubject?: string;
	rssUrl?: string;
	light?: boolean;
	triggerClassName?: string;
	type?: string;
	id?: string | number;
};

export default function ButtonShare({
	shareUrl,
	backgroundColor,
	emailSubject,
	rssUrl,
	children,
	light,
	triggerClassName,
	type,
	id,
}: PropsWithChildren<Props>): JSX.Element {
	const intl = useIntl();
	const [justCopied, setJustCopied] = useState(false);

	// FUTURE: update sharing links
	const facebookLink = `https://facebook.com/share.php?u=${shareUrl}`;
	const twitterLink = `https://x.com/intent/post?url=${shareUrl}`;
	const emailLink = `mailto:?body=${shareUrl}${
		emailSubject
			? `&subject=${encodeURIComponent(
					intl.formatMessage(
						{
							id: 'buttonShare__emailSubjectSuffix',
							defaultMessage: '{subject} on AudioVerse',
						},
						{
							subject: emailSubject,
						},
					),
				)}`
			: ''
	}`;
	const copyLink = shareUrl;

	const shareTracking = (source: string) => {
		if (type)
			analytics.track('Share', {
				id,
				source,
				type,
			});
	};
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
		shareTracking('Copy');
	};

	const shareOptions = [
		[
			facebookLink,
			<FormattedMessage
				id="molecule-buttonShare__facebook"
				defaultMessage="Facebook"
				key="facebook"
			/>,
			() => shareTracking('Facebook'),
		],
		[
			twitterLink,
			<FormattedMessage
				id="molecule-buttonShare__twitter"
				defaultMessage="Twitter"
				key="twitter"
			/>,
			() => shareTracking('X'),
		],
		[
			emailLink,
			<FormattedMessage
				id="molecule-buttonShare__email"
				defaultMessage="Email"
				key="email"
			/>,
			() => shareTracking('Email'),
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
						() => shareTracking('RSS'),
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
						Icon={light ? ShareIconLight : ShareIcon}
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
