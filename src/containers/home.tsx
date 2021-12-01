import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Heading3 from '@components/atoms/heading3';
import Button from '@components/molecules/button';
import CardBibleChapter from '@components/molecules/card/bibleChapter';
import CardPost from '@components/molecules/card/post';
import CardRecording from '@components/molecules/card/recording';
import DownloadAppButton from '@components/molecules/downloadAppButton';
import Input from '@components/molecules/form/input';
import Section from '@components/organisms/section';
import Slider from '@components/organisms/slider';
import Testimonies from '@components/organisms/testimonies';
import { BaseColors } from '@lib/constants';
import { GetHomeStaticPropsQuery } from '@lib/generated/graphql';
import { getAppFeatures } from '@lib/getAppFeatures';
import isServerSide from '@lib/isServerSide';
import { makeAboutPage, makeDonateRoute, makeRegisterRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconBell from '../../public/img/fa-bell.svg';

import styles from './home.module.scss';

export type HomeProps = {
	data: GetHomeStaticPropsQuery | undefined;
};

export default function Home({ data }: HomeProps): JSX.Element {
	const intl = useIntl();
	const languageRoute = useLanguageRoute();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const [isFooterVisible, setIsFooterVisible] = React.useState(false);
	const footerRef = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		const currentFooterRef = footerRef.current;
		if (
			!currentFooterRef ||
			isServerSide() ||
			typeof IntersectionObserver === 'undefined'
		) {
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) =>
				setIsFooterVisible(
					(isFooterVisible) => entry.isIntersecting || isFooterVisible
				)
			);
		});
		observer.observe(currentFooterRef);
		return () => observer.unobserve(currentFooterRef);
	}, []);

	const recentRecordings = data?.websiteRecentRecordings.nodes || [];
	const chapter = data?.audiobible?.book.chapter;
	const testimonies = data?.testimonies.nodes || [];
	const posts = data?.blogPosts.nodes || [];

	const features = getAppFeatures(languageRoute);

	return (
		<div className={styles.wrapper}>
			<Section
				text={
					<>
						<Heading1 className={styles.tagline}>
							<FormattedMessage
								id="homePage__soundDoctrineTitle"
								defaultMessage="Sound Doctrine"
								description="home: Sound Doctrine section title"
							/>
						</Heading1>
						<p className={styles.paragraph}>
							<FormattedMessage
								id="homePage__soundDoctrineText"
								defaultMessage="AudioVerse is a platform curating the best in Adventist audio content. Be challenged and inspired to grow in your relationship with Jesus through songs, sermons, audiobooks, and Bible readings."
								description="home page sound doctrine text"
							/>
						</p>
						<Button
							type="super"
							href={makeAboutPage(languageRoute, 1)}
							text={
								<FormattedMessage
									id="homePage__learnStoryButtonLabel"
									defaultMessage="Learn about our story"
								/>
							}
						/>
					</>
				}
				media={
					<Image
						src="/img/unsplash-headphones.jpg"
						layout="fill"
						objectFit="cover"
					/>
				}
				theme={BaseColors.DARK}
				bleed
			/>
			<Section
				className={styles.recentSection}
				text={
					<>
						<Heading1>
							<FormattedMessage
								id="homePage__recentContentSectionTitle"
								defaultMessage="Recent Content"
								description="home page recent content section title"
							/>
						</Heading1>
						<p className={clsx(styles.paragraph, styles.narrow)}>
							<FormattedMessage
								id="homePage__recentContentSectionText"
								defaultMessage="Explore a select few of our audio pieces. Then when you’re ready, <a>create an account</a> to view even more."
								description="home page recent content section text"
								values={{
									a: function a(chunks: string) {
										return (
											<Link href={makeRegisterRoute(languageRoute)}>
												<a>{chunks}</a>
											</Link>
										);
									},
								}}
							/>
						</p>
						<Slider perSlide={3} clip={false} disabledOnMobile>
							{recentRecordings.slice(0, 2).map((recording) => (
								<div className={styles.slideCard} key={recording.canonicalPath}>
									<CardRecording recording={recording} />
								</div>
							))}
							{chapter && (
								<div className={styles.slideCard}>
									<CardBibleChapter chapter={chapter} />
								</div>
							)}
							{recentRecordings.slice(2).map((recording) => (
								<div className={styles.slideCard} key={recording.canonicalPath}>
									<CardRecording recording={recording} />
								</div>
							))}
						</Slider>
					</>
				}
				center
				reverse
			/>
			<Section
				text={
					<div className={styles.blogSection}>
						<Heading1>
							<FormattedMessage
								id="homePage__recentPostsSectionTitle"
								defaultMessage="Recent Blog Posts"
								description="home page recent posts section title"
							/>
						</Heading1>
						<p className={clsx(styles.paragraph, styles.narrow)}>
							<FormattedMessage
								id="homePage__recentPostsSectionText"
								defaultMessage="Read through our blog to find articles about recent events, sermons, and conferences."
								description="home page recent posts section text"
							/>
						</p>
						<div
							className={clsx(
								styles.posts,
								posts.length === 4 && styles.postsSquare
							)}
						>
							{posts.map((p) => (
								<CardPost key={p.title} post={p} alternate />
							))}
						</div>
					</div>
				}
				theme={BaseColors.CREAM}
				center
			/>
			<div className={styles.featuresWrapper}>
				<Slider perSlide={1} floatingControls dark grow>
					{features.map(({ heading, kicker, cta, url, image }, index) => (
						<Section
							key={index}
							text={
								<>
									<Heading1>{heading}</Heading1>
									<p className={styles.paragraph}>{kicker}</p>
									<Button type="super" href={url} text={cta} />
								</>
							}
							media={<Image src={image} layout="fill" objectFit="cover" />}
							theme={BaseColors.DARK}
							className={styles.featureSlide}
						/>
					))}
				</Slider>
			</div>
			<Section
				text={
					<>
						<Heading1 className={styles.testimoniesHeading}>
							<FormattedMessage
								id="home__testimoniesTitle"
								defaultMessage="Testimonies"
								description="Testimonies slider title"
							/>
						</Heading1>
						<Testimonies testimonies={testimonies} />
					</>
				}
				center
				reverse
			/>
			<Section
				text={
					<>
						<Heading1>
							<FormattedMessage
								id="homePage__downloadAppSectionTitle"
								defaultMessage="Download the App"
								description="home page download app section title"
							/>
						</Heading1>
						<p className={styles.paragraph}>
							<FormattedMessage
								id="homePage__downloadAppSectionText"
								defaultMessage="If you have a smartphone, download the app to take AudioVerse with you wherever you go. Stream teachings from anywhere or download to your device. New app coming in 2022."
								description="home page download app section text"
							/>
						</p>
						<DownloadAppButton
							buttonType="super"
							menuAlignment="left"
							alternateCta
						/>
					</>
				}
				media={
					<Image src="/img/players.jpeg" layout="fill" objectFit="cover" />
				}
				theme={BaseColors.CREAM}
				reverse
			/>
			<Section
				theme={BaseColors.DARK}
				reverse
				bleed
				short
				text={
					<>
						<Heading1 className={styles.newsletterPromoTitle}>
							<FormattedMessage
								id="homePage__newsletterSectionTitle"
								defaultMessage="Subscribe to Updates"
								description="home page newsletter section title"
							/>
						</Heading1>
						<p className={styles.newsletterPromoKicker}>
							<FormattedMessage
								id="homePage__newsletterSectionText"
								defaultMessage="Want to hear when we’re releasing new features, going to conferences, or releasing new AudioVerse Swag? Subscribe to our newsletter to get updates."
								description="home page newsletter section text"
							/>
						</p>
					</>
				}
				media={
					<div className={styles.newsletterWrapper}>
						<div className={styles.newsletterBox}>
							<div className={styles.newsletterHat}>
								<IconBell />
								<FormattedMessage
									id="homePage__newsletterHatTitle"
									defaultMessage="Sign up for our Newsletter"
								/>
							</div>
							<form
								className={styles.newsletterBody}
								action="https://audioverse.z2systems.com/np/clients/audioverse/submitSubscription.jsp"
								method="POST"
								target="_blank"
							>
								<input type="hidden" name="subscription" value="5" />
								<input
									type="hidden"
									name="skipDuplicateRequestCheck"
									value="1"
								/>
								<div className={styles.newsletterFieldRow}>
									<Input
										name="subscriber.name"
										type="text"
										label={
											<FormattedMessage
												id="homePage__newsletterName"
												defaultMessage="Name"
											/>
										}
										placeholder={intl.formatMessage({
											id: 'homePage__newsletterNamePlaceholder',
											defaultMessage: 'Joseph Bates',
										})}
										value={name}
										setValue={setName}
									/>
									<Input
										name="subscriber.email1"
										type="text"
										label={
											<FormattedMessage
												id="homePage__newsletterEmail"
												defaultMessage="Email Address"
											/>
										}
										placeholder={intl.formatMessage({
											id: 'homePage__newsletterEmailPlaceholder',
											defaultMessage: 'josephbates@email.com',
										})}
										value={email}
										setValue={setEmail}
									/>
								</div>
								<Button
									type="secondary"
									text={
										<FormattedMessage
											id="homePage__newsletterSubscribe"
											defaultMessage="Subscribe"
										/>
									}
								/>
							</form>
						</div>
					</div>
				}
			/>
			<Section
				text={
					<>
						<Heading1>
							<FormattedMessage
								id="homePage__supportSectionTitle"
								defaultMessage="Support free audio"
								description="home page support section title"
							/>
						</Heading1>
						<p className={styles.paragraph}>
							<FormattedMessage
								id="homePage__supportSectionText"
								defaultMessage="AudioVerse is a non-profit ministry that exists because of our supporters. Creating, maintaining, and improving a technology platform takes a lot of resources and we’re grateful to our generous group of donors. Consider contributing today, even if it’s just 5 dollars a month, and help ensure that we can continue providing sound doctrine."
								description="home page support section text"
							/>
						</p>
						<Button
							type="super"
							href={makeDonateRoute(languageRoute)}
							text={
								<FormattedMessage
									id="homePage__supportSectionCTA"
									defaultMessage="Make a donation"
									description="home page support section cta"
								/>
							}
						/>
					</>
				}
				media={
					<Image
						src="/img/unsplash-support.jpg"
						layout="fill"
						objectFit="cover"
					/>
				}
				theme={BaseColors.LIGHT_TONE}
				bleed
			/>
			<div
				className={clsx(styles.footer, isFooterVisible && styles.footerVisible)}
				ref={footerRef}
			>
				<Image src="/img/logo.svg" width={161} height={23} />
				<Heading3 sans unpadded>
					<FormattedMessage
						id="homePage__tagline"
						defaultMessage="Sound Doctrine"
					/>
				</Heading3>
			</div>
		</div>
	);
}
