import Image from 'next/legacy/image';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import Button from '~components/molecules/button';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import AboutNav from '~components/organisms/aboutNav';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import IconForward from '../../../public/img/icons/icon-forward-light.svg';
import sharedStyles from './shared.module.scss';

export default function Story(): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<AboutNav current="about" />
			<Heading1>
				<FormattedMessage id="about__storyTitle" defaultMessage="Our Story" />
			</Heading1>
			<div className={sharedStyles.image}>
				<Image
					src="/img/hero-av-full.jpg"
					layout="fill"
					objectFit="cover"
					priority
				/>
			</div>
			<ContentWidthLimiter>
				<div className={sharedStyles.base}>
					<p className={sharedStyles.bodyDeck}>
						<FormattedMessage
							id="about__storyIntro"
							defaultMessage="AudioVerse began in 2005 as an idea by Tim Arakawa and Curtis Farnham, both poor graduate students at the time. It was spurred by increasing requests for sermon recordings from various ministries with which Tim and Curtis had been involved, including Advent HOPE Sabbath School, Restoration Ministry, and GYC Southwest (formerly Southwest Youth Conference)."
						/>
					</p>
					<p>
						<figure>
							<Image
								src="/img/audioverse-ancient-screenshot.jpeg"
								width={858}
								height={602}
							/>
							<figcaption>
								<FormattedMessage
									id="about__storyImageCaption"
									defaultMessage="The original AudioVerse design, in use from October 2005 to August 2006."
								/>
							</figcaption>
						</figure>
					</p>
					<p>
						<FormattedMessage
							id="about__story1"
							defaultMessage="They were excited about this idea not only because it would fulfill the immediate need (and make less work producing CDs!), but because they saw that these messages of hope, love, and the soon return of our Savior Jesus Christ, could be a blessing to people worldwide who were seeking knowledge and wisdom about God."
						/>
					</p>
					<p>
						<FormattedMessage
							id="about__story2"
							defaultMessage='Curtis put the idea into action and quickly began developing a sermon website. A contest was held at Advent HOPE Sabbath School to choose the name, during which over 100 names were submitted. "AudioVerse" was the winner, and the AudioVerse.org website was launched on October 22, 2005.'
						/>
					</p>
					<p>
						<FormattedMessage
							id="about__story3"
							defaultMessage="Since that humble beginning, God demonstrated His providential leading of this ministry many times.  The initial bandwidth for the website was donated by a friend of the ministry who operated his own Internet service provider, which was crucial in meeting the traffic generated early on.  Later, an unsolicited donation enabled us to upgrade and expand our entire server infrastructure to better serve the whole world.  Not to mention, tremendous partnerships have been developed with various ministries like ASI, AMEN, and GYC (along with many smaller affiliate GYCs)."
						/>
					</p>
					<p>
						<FormattedMessage
							id="about__story4"
							defaultMessage="Website traffic has also grown tremendously.  Now millions of sermons are downloaded and listened to every year!  The people accessing these messages come from over 200 countries from all corners of the world including many closed or developing countries in the 10/40 window such as countries in the Middle East and China."
						/>
					</p>
					<p>
						<FormattedMessage
							id="about__story5"
							defaultMessage="As this website has grown, we have had the opportunity to feature recordings in other languages than English.  In an effort to reach as many people as possible, messages in Spanish, French, German, and Chinese are now available with more to come."
						/>
					</p>

					<div className={sharedStyles.navigation}>
						{/* <Button
							type="secondary"
							text={
								<FormattedMessage
									id="about__navTeam"
									defaultMessage="The Team"
								/>
							}
							IconRight={IconForward}
							href={root.lang(languageRoute).about.id(13).get()}
						/> */}
						<Button
							type="secondary"
							IconRight={IconForward}
							text={
								<FormattedMessage
									id="about__navPurpose"
									defaultMessage="Our Purpose"
								/>
							}
							href={root.lang(languageRoute).about.id(7).get()}
						/>
					</div>
				</div>
			</ContentWidthLimiter>
		</>
	);
}
