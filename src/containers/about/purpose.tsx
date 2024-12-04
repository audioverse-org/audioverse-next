import clsx from 'clsx';
import Image from 'next/legacy/image';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import Heading2 from '~components/atoms/heading2';
import HorizontalRule from '~components/atoms/horizontalRule';
import Button from '~components/molecules/button';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import AboutNav from '~components/organisms/aboutNav';
import { BaseColors } from '~lib/constants';
import root from '~lib/routes';
import IconBack from '~public/img/icons/icon-back-light.svg';
import IconForward from '~public/img/icons/icon-forward-light.svg';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';

import styles from './purpose.module.scss';
import sharedStyles from './shared.module.scss';

export default function Purpose(): JSX.Element {
	const intl = useIntl();
	const languageRoute = useLanguageRoute();

	return (
		<>
			<AboutNav current="purpose" />
			<Heading1>
				<FormattedMessage
					id="about__purposeTitle"
					defaultMessage="Our Purpose"
				/>
			</Heading1>
			<div className={clsx(sharedStyles.image, sharedStyles.imageLabeled)}>
				<Image
					alt={intl.formatMessage({
						id: 'about__purposeImageAlt',
						defaultMessage:
							'Young woman in a field wearing headphones while reading a book.',
						description: 'Alt text for the purpose image',
					})}
					src="/img/hero-av-full.jpg"
					layout="fill"
					objectFit="cover"
					priority
				/>
				<div className={sharedStyles.imageLabel}>
					<ContentWidthLimiter>
						<FormattedMessage
							id="about__purposeImageLabel"
							defaultMessage="Our vision is to hasten the Second Coming of our Lord Jesus Christ by making high quality Bible-based and Christ-centered media available to the whole world."
						/>
					</ContentWidthLimiter>
				</div>
			</div>
			<ContentWidthLimiter>
				<div className={sharedStyles.base}>
					<p className={sharedStyles.bodyDeck}>
						<FormattedMessage
							id="about__purposeIntro"
							defaultMessage="Our mission is to be a trustworthy global provider of Bible-based and Christ-centered media."
						/>
					</p>
					<Heading2>
						<FormattedMessage
							id="about__purposeWhy"
							defaultMessage="Why AudioVerse?"
						/>
					</Heading2>
					<p>
						<FormattedMessage
							id="about__purposeWhy1"
							defaultMessage="The Gospel must be preached to the world before Christ can come (Matt. 24:14).  The world cannot hear the Gospel without a preacher (Rom. 10:14).  AudioVerse exists to deliver the preacher freely to the whole world so that Jesus can come."
						/>
					</p>
					<p>
						<FormattedMessage
							id="about__purposeWhy2"
							defaultMessage="Faith comes by hearing, and hearing by the Word of God (Rom 10:17).  Man shall not live by bread alone, but by every word that proceeds from the mouth of God (Matt. 4:4).  AudioVerse exists to nourish faith by giving easy access to the Word of God."
						/>
					</p>
					<p>
						<FormattedMessage
							id="about__purposeWhy3"
							defaultMessage="Jesus is the Word (John 1:1).  Jesus says that His Word is truth (John 17:17) and they are life (John 6:63).  To know Jesus is to have eternal life (John 17:3).  AudioVerse exists to help people know Jesus."
						/>
					</p>
					<HorizontalRule color={BaseColors.CREAM} />
					<Heading2>
						<FormattedMessage
							id="about__purposeWhat"
							defaultMessage="What drives AudioVerse?"
						/>
					</Heading2>
					<dl className={styles.list}>
						<dt>
							<FormattedMessage
								id="about__purposeExcellence"
								defaultMessage="Biblical Excellence"
							/>
						</dt>
						<dd>
							<FormattedMessage
								id="about__purposeExcellenceDescription"
								defaultMessage="AudioVerse holds a high standard for the content that is presented on its website. The guidelines for these messages are called the Spirit of AudioVerse and you can read them here. This spirit of excellence extends also to the way the ministry operates and in all its dealings."
							/>
						</dd>
						<dt>
							<FormattedMessage
								id="about__purposeReaching"
								defaultMessage="Reaching the World"
							/>
						</dt>
						<dd>
							<FormattedMessage
								id="about__purposeReachingDescription"
								defaultMessage="Nearly 3 billion people have access to the Internet as of 2014, and that number is increasing every day. This number includes countless closed countries into which physical missionaries cannot easily go. Leveraging the ubiquity and cost-effective nature of the Internet, AudioVerse seeks to light up the world with access to Bible truth."
							/>
						</dd>
						<dt>
							<FormattedMessage
								id="about__purposeGiving"
								defaultMessage="Giving Freely"
							/>
						</dt>
						<dd>
							<FormattedMessage
								id="about__purposeGivingDescription"
								defaultMessage="All around the world there are people who yearn for the Gospel, but they cannot afford to pay for it. These may be individuals in developing countries or simply young people in school.  If the Gospel is to go to them too, then as many barriers must be removed as possible, and cost is one of them. This is only possible through the generous financial support of donors who believe in this mission."
							/>
						</dd>
						<dt>
							<FormattedMessage
								id="about__purposeSupport"
								defaultMessage="Support of the Adventist Church"
							/>
						</dt>
						<dd>
							<FormattedMessage
								id="about__purposeSupportDescription"
								defaultMessage="AudioVerse is a supporting ministry of the Seventh-day Adventist Church, and seeks to be in full harmony with the church’s purpose and mission.  AudioVerse is also a member of ASI (Adventist-laymen’s Services and Industries)."
							/>
						</dd>
					</dl>
					<div className={sharedStyles.navigation}>
						<Button
							type="secondary"
							text={
								<FormattedMessage
									id="about__navSpirit"
									defaultMessage="Spirit of AudioVerse"
								/>
							}
							IconRight={IconForward}
							href={root.lang(languageRoute).about.id(12).get()}
						/>
						{/* <Button
							type="secondary"
							text={
								<FormattedMessage
									id="about__navTeam"
									defaultMessage="The Team"
								/>
							}
							IconLeft={IconBack}
							href={root.lang(languageRoute).about.id(13).get()}
						/> */}
						<Button
							type="secondary"
							IconLeft={IconBack}
							text={
								<FormattedMessage
									id="about__navStory"
									defaultMessage="Our Story"
								/>
							}
							href={root.lang(languageRoute).about.id(1).get()}
						/>
					</div>
				</div>
			</ContentWidthLimiter>
		</>
	);
}
