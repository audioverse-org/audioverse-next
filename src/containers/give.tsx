import React, { SyntheticEvent } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Heading2 from '@components/atoms/heading2';
import HorizontalRule from '@components/atoms/horizontalRule';
import Button from '@components/molecules/button';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import AboutNav from '@components/organisms/aboutNav';
import { BaseColors } from '@lib/constants';

import styles from './give.module.scss';
import Link from 'next/link';

export default function Blog(): JSX.Element {
	return (
		<div className={styles.wrapper}>
			<AboutNav current="donate" />
			<ContentWidthLimiter>
				<Heading1 className={styles.heading}>
					<FormattedMessage id="give__heading" defaultMessage="Donate" />
				</Heading1>
				{/* WORKAROUND: https://stackoverflow.com/a/55322126/937377 */}
				{/* eslint-disable-next-line @next/next/no-sync-scripts */}
				<script
					src="https://donorbox.org/widget.js"
					{...{ paypalexpress: 'true' }}
				/>
				<div className={styles.twoUp}>
					<iframe
						src="https://donorbox.org/embed/audioverse-give?hide_donation_meter=true&designation=Where%20Needed%20Most"
						height="1100px"
						width="100%"
						style={{
							maxWidth: '400px',
							minWidth: '310px',
							maxHeight: 'none !important',
						}}
						seamless
						name="donorbox"
						frameBorder="0"
						scrolling="no"
						allow="payment"
					/>
					<Link
						href="https://www.audioverse.org/en/blog/567/meat-in-due-season.html"
						legacyBehavior
					>
						<a>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="https://s3.amazonaws.com/Client_Files/AudioVerse/av-progress-bar.png"
								width={555}
								height={330}
								onError={(e: SyntheticEvent<HTMLImageElement>) =>
									(e.currentTarget.style.display = 'none')
								}
							/>
						</a>
					</Link>
				</div>
				<Heading2>
					<FormattedMessage
						id="give__paypalTitle"
						defaultMessage="PayPal Giving Fund"
					/>
				</Heading2>
				<p>
					<FormattedMessage
						id="give__paypalDescription"
						defaultMessage="Visit the AudioVerse PayPal Giving Fund page to initiate your donation to AudioVerse. 100% of your gift will go to the ministry with no processing fee. By giving through this channel, you will receive a tax-deductible receipt from Paypal Giving Fund and not from AudioVerse."
					/>
				</p>
				<Button
					type="primary"
					text={
						<FormattedMessage id="give__paypalCta" defaultMessage="Give Now" />
					}
					href="https://www.paypal.com/fundraiser/charity/122207"
					target="_blank"
				/>
				<HorizontalRule color={BaseColors.CREAM} className={styles.rule} />
				<Heading2>
					<FormattedMessage
						id="give__amazonTitle"
						defaultMessage="Amazon Smile"
					/>
				</Heading2>
				<p>
					<FormattedMessage
						id="give__amazonDescription"
						defaultMessage="With every purchase on AmazonSmile, AudioVerse receives 0.5%.{br}{br}How? Just click on the button.{br}{br}That's all there is to it! Just be sure to bookmark the new AmazonSmile website or else your browser will likely default back to the regular Amazon site."
						values={{
							br: <br />,
						}}
					/>
				</p>
				<Button
					type="primary"
					text={
						<FormattedMessage id="give__amazonCta" defaultMessage="Shop Now" />
					}
					href="http://smile.amazon.com/ch/27-1861510"
					target="_blank"
				/>
				<HorizontalRule color={BaseColors.CREAM} className={styles.rule} />
				<Heading2>
					<FormattedMessage
						id="give__givingAssistantTitle"
						defaultMessage="Giving Assistant"
					/>
				</Heading2>
				<p>
					<FormattedMessage
						id="give__givingAssistantDescription"
						defaultMessage="Donate up to 30% of your purchase price to AudioVerse when you shop at 1800+ popular online retailers using Giving Assistant! It’s easy. Giving Assistant pays you cash back, and you choose how much of it you’d like to donate to us. Try it now and find great deals like Macy's Coupons, as well as savings at great places like Home Depot and JC Penney!"
					/>
				</p>
				<Button
					type="primary"
					text={
						<FormattedMessage
							id="give__givingAssistantCta"
							defaultMessage="Shop Now"
						/>
					}
					href="https://givingassistant.org/np#audioverse"
					target="_blank"
				/>
				<HorizontalRule color={BaseColors.CREAM} className={styles.rule} />
				<Heading2>
					<FormattedMessage
						id="give__estateTitle"
						defaultMessage="Remember AudioVerse in Your Estate Plan"
					/>
				</Heading2>
				<p>
					<FormattedMessage
						id="give__estateDescription"
						defaultMessage="You can make an impact on AudioVerse today and tomorrow by making AudioVerse a recipient in your estate plan. The easiest way to do this is by making AudioVerse a beneficiary in your financial accounts or by including the ministry in your will or trust.{br}{br}For those who wish to leave a lasting legacy by giving to the Lord's work but still need the benefit of their assets, a charitable gift annuity may be a good option. This method of giving is designed to be beneficial for both the donor and recipient. AudioVerse is working with Western Adventist Foundation (WAF) to provide this option of giving to our supporters.{br}{br}If you wish to leave a gift via a charitable gift annuity to AudioVerse, please contact WAF directly either through their website or by phone."
						values={{
							br: <br />,
						}}
					/>
				</p>
				{/* eslint-disable-next-line @calm/react-intl/missing-formatted-message */}
				<address>
					Western Adventist Foundation
					<br />
					<a
						href="https://www.wafsda.org"
						target="_blank"
						rel="noreferrer"
						className="decorated"
						/* eslint-disable-next-line @calm/react-intl/missing-formatted-message */
					>
						https://www.wafsda.org
					</a>
					<br />
					866-356-5595
				</address>
				<Button
					type="primary"
					text={
						<FormattedMessage id="give__estateCta" defaultMessage="Give Now" />
					}
					href="http://www.wafsda.org/"
					target="_blank"
				/>
				<p className={styles.paragraphSmall}>
					<FormattedMessage
						id="give__estateDisclaimer"
						defaultMessage="Charitable gift annuities are NOT AVAILABLE in the following states: AL, MD and WA; Annuities for CA and IL residents are provided by the Pacific Union Conference of Seventh-day Adventists; Annuities for HI residents are provided by the Hawaii Conference of Seventh-day Adventists; and Charitable gift annuities to benefit AudioVerse in all other states are provided by Western Adventist Foundation. Western Adventist Foundation provides no legal advice. Individuals should seek the advice of their own legal counsel."
					/>
				</p>
				<HorizontalRule color={BaseColors.CREAM} className={styles.rule} />
				<Heading2>
					<FormattedMessage
						id="give__checkTitle"
						defaultMessage="Check By Mail"
					/>
				</Heading2>
				<p>
					<FormattedMessage
						id="give__checkDescription"
						defaultMessage="Please make checks payable to AudioVerse.{br}{br}Our mailing address is:{br}{br}AudioVerse{br}PO Box 2288{br}Collegedale, TN 37315-2288{br}USA"
						values={{
							br: <br />,
						}}
					/>
				</p>
			</ContentWidthLimiter>
		</div>
	);
}
