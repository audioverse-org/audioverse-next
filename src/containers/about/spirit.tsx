import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Button from '@components/molecules/button';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import AboutNav from '@components/organisms/aboutNav';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconBack from '../../../public/img/icons/icon-back-light.svg';
import IconForward from '../../../public/img/icons/icon-forward-light.svg';

import sharedStyles from './shared.module.scss';
import styles from './spirit.module.scss';
import { makeTestimoniesRoute } from '@lib/routes/makeTestimoniesRoute';
import { makeAboutPage } from '@lib/routes/makeAboutPage';

export default function SpiritOfAv(): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<AboutNav current="spiritofav" />
			<Heading1>
				<FormattedMessage
					id="about__spiritTitle"
					defaultMessage="Spirit of AudioVerse"
				/>
			</Heading1>
			<ContentWidthLimiter>
				<div className={sharedStyles.base}>
					<p className={sharedStyles.bodyDeck}>
						<FormattedMessage
							id="about__spiritIntro"
							defaultMessage="AudioVerse provides free Bible-based and Christ-centered audiovisual resources aimed at inspiring and educating Seventh-day Adventists and all spiritually interested people around the world."
						/>
					</p>
					<p>
						<FormattedMessage
							id="about__spiritPurpose"
							defaultMessage="Our main purpose is to proclaim the everlasting Gospel of Jesus Christ in order to hasten and to prepare the world for His imminent Second Coming. In view of this, AudioVerse upholds the following set of principles regarding the materials that we make available on this website:"
						/>
					</p>
					<dl className={styles.list}>
						<dt>01</dt>
						<dd>
							<FormattedMessage
								id="about__spirit1"
								defaultMessage="Materials should promote doctrines, theology, principles and values that have been established through a careful, thorough study of the Bible and the Spirit of Prophecy by trustworthy, experienced and godly people."
							/>
						</dd>
						<dt>02</dt>
						<dd>
							<FormattedMessage
								id="about__spirit2"
								defaultMessage="Materials should affirm the Bible and the Spirit of Prophecy as reflected by the stated fundamental beliefs of the Seventh-day Adventist Church."
							/>
						</dd>
						<dt>03</dt>
						<dd>
							<FormattedMessage
								id="about__spirit3"
								defaultMessage="Materials should promote the reality that victory over sin is possible through the believer's dependence on the grace and power of Jesus Christ."
							/>
						</dd>
						<dt>04</dt>
						<dd>
							<FormattedMessage
								id="about__spirit4"
								defaultMessage="Materials should promote lifestyle and behavioral choices that are in harmony with principles from Scripture and the Spirit of Prophecy."
							/>
						</dd>
						<dt>05</dt>
						<dd>
							<FormattedMessage
								id="about__spirit5"
								defaultMessage="Materials should represent the historical-grammatical/historical-Biblical method of Biblical interpretation along with the historicist method of prophetic interpretation rather than futurism, preterism, higher criticism, imposed allegorical, or other speculative and unacceptable hermeneutics."
							/>
						</dd>
						<dt>06</dt>
						<dd>
							<FormattedMessage
								id="about__spirit6"
								defaultMessage="Materials should predominantly appeal to the mind and reason, rather than the speculative or sensational; neither hype, an unwarranted excitement, nor extra-Biblical predictions about the future, are acceptable."
							/>
						</dd>
						<dt>07</dt>
						<dd>
							<FormattedMessage
								id="about__spirit7"
								defaultMessage="Materials should represent a balanced and disciplined view of Scripture and the Spirit of Prophecy that reflects the entirety of these inspired writings. We do not advocate the overemphasis of one aspect to the exclusion of other equally important aspects nor do we condone viewpoints that extend beyond the proper application of Biblical and Spirit of Prophecy principles."
							/>
						</dd>
						<dt>08</dt>
						<dd>
							<FormattedMessage
								id="about__spirit8"
								defaultMessage="Materials should seek to provide lessons from history rather than revising or criticizing it to the detriment of our doctrines or teachings."
							/>
						</dd>
						<dt>09</dt>
						<dd>
							<FormattedMessage
								id="about__spirit9"
								defaultMessage="Materials should be supportive of the Seventh-day Adventist Church as well as her leadership and institutions. They are not to seek to tarnish or vilify the reputations of individuals or institutions."
							/>
						</dd>
						<dt>10</dt>
						<dd>
							<FormattedMessage
								id="about__spirit10"
								defaultMessage="Materials should be completely truthful. Dishonesty or anything that is intentionally misleading is unacceptable."
							/>
						</dd>
						<dt>11</dt>
						<dd>
							<FormattedMessage
								id="about__spirit11"
								defaultMessage="Materials should be delivered in a spirit of reverence, respect, and humility, recognizing that they represent the Gospel of Jesus Christ. We reject an attitude that is spiteful, arrogant, vulgar, irreverent, flippant, frivolous, demeaning, or otherwise unChrist-like."
							/>
						</dd>
						<dt>12</dt>
						<dd>
							<FormattedMessage
								id="about__spirit12"
								defaultMessage="Materials should be from presenters who are associated with organizations or groups who uphold and represent the above-described spirit of AudioVerse, and are Seventh-day Adventists in good standing."
							/>
						</dd>
					</dl>
					<div className={sharedStyles.navigation}>
						<Button
							type="secondary"
							IconRight={IconForward}
							text={
								<FormattedMessage
									id="about__navTestimonials"
									defaultMessage="Testimonials"
								/>
							}
							href={makeTestimoniesRoute(languageRoute)}
						/>
						<Button
							type="secondary"
							IconLeft={IconBack}
							text={
								<FormattedMessage
									id="about__navPurpose"
									defaultMessage="Our Purpose"
								/>
							}
							href={makeAboutPage(languageRoute, 7)}
						/>
					</div>
				</div>
			</ContentWidthLimiter>
		</>
	);
}
