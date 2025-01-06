import clsx from 'clsx';
import Image from 'next/legacy/image';
import React, { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import Link from '~components/atoms/linkWithoutPrefetch';
import Button from '~components/molecules/button';
import CardPost from '~components/molecules/card/post';
import CardRecording from '~components/molecules/card/recording';
import CardSequence from '~components/molecules/card/sequence';
import CardMasonry from '~components/molecules/cardMasonry';
import DownloadAppButton from '~components/molecules/downloadAppButton';
import NewsletterForm from '~components/molecules/newsletterForm';
import Slider from '~components/organisms/slider';
import Testimonies from '~components/organisms/testimonies';
import { BaseColors } from '~lib/constants';
import { getAppFeatures } from '~lib/getAppFeatures';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import IconForward from '~public/img/icons/icon-forward-light.svg';
import ImagePlayers from '~public/img/players.jpeg';

import { GetHomeStaticPropsQuery } from './__generated__/home';
import styles from './home.module.scss';
import Section from './home.section';

export type HomeProps = {
	data: GetHomeStaticPropsQuery | undefined;
};

export default function Home({ data }: HomeProps): JSX.Element {
	const intl = useIntl();
	const languageRoute = useLanguageRoute();

	const recentRecordings = data?.websiteRecentRecordings.nodes || [];
	const testimonies = data?.testimonies.nodes || [];
	const posts = data?.blogPosts.nodes || [];
	const bibleChapters = data?.bibleChapters.nodes || [];
	const features = getAppFeatures(languageRoute, intl);
	const isEnglish = languageRoute === 'en';

	return (
		<>
			<div className={styles.wrapper}>
				<Section
					text={
						<>
							<Heading1 className={styles.tagline}>
								<FormattedMessage
									id="homePage__newDevotionalTitle"
									defaultMessage="New Devotional"
									description="home: New Devotional section title"
								/>
							</Heading1>
							<p className={styles.paragraph}>
								<FormattedMessage
									id="homePage__newDevotionalText"
									defaultMessage="Begin each day with uplifting daily audio devotionals. Strengthen your faith, deepen your connection with God, and focus your heart as you start the year with inspiring messages."
									description="home page new devotional text"
								/>
							</p>
							<div className={styles.primaryCtas}>
								<Button
									type="superHero"
									href="https://devotionals.audioverse.org/"
									text={
										<FormattedMessage
											id="homePage__newDevotionalButtonLabel"
											defaultMessage="Sign Up"
										/>
									}
								/>
							</div>
						</>
					}
					media={
						<div className={styles.bannerImage}>
							<Image
								src="/img/hero-devotional.png"
								alt={intl.formatMessage({
									id: 'homePage__bannerImageAlt',
									defaultMessage: 'Young woman with phone and reading a book.',
									description: 'home page banner image alt',
								})}
								layout="fill"
								objectFit="cover"
								priority
							/>
						</div>
					}
					theme={BaseColors.DARK}
					bleed
					short
				/>
				<Section
					className={styles.latestSection}
					text={
						<>
							<Heading1>
								<FormattedMessage
									id="homePage__latestContentSectionTitle"
									defaultMessage="Latest Content"
									description="home page latest content section title"
								/>
							</Heading1>
							<p className={clsx(styles.paragraph, styles.narrow)}>
								<FormattedMessage
									id="homePage__latestContentSectionText"
									defaultMessage="Explore a sample of some of our recent audio pieces. Then when you’re ready, <a>visit the Discover page</a> to see more."
									description="home page latest content section text"
									values={{
										a: function a(chunks: ReactNode[]) {
											return (
												<Link
													href={root.lang(languageRoute).discover.get()}
													legacyBehavior
												>
													<a className="decorated">{chunks}</a>
												</Link>
											);
										},
									}}
								/>
							</p>

							<div className={styles.latestContentWrapper}>
								<CardMasonry
									items={[
										...recentRecordings.map(
											(r) =>
												({
													type: 'recording',
													data: r,
												}) as const,
										),
										...(languageRoute === 'en'
											? [
													{
														type: 'bible',
													} as const,
												]
											: []),
									]}
									render={({ data }) =>
										data.type === 'recording' ? (
											<CardRecording
												key={data.data.title}
												recording={data.data}
											/>
										) : (
											<CardSequence sequence={bibleChapters[0]} />
										)
									}
									key={`item-${recentRecordings.length}`}
								/>
							</div>
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
									posts.length === 4 && styles.postsSquare,
								)}
							>
								{posts.map((p) => (
									<CardPost key={p.title} post={p} alternate />
								))}
							</div>
							<div className={styles.postsSeeAll}>
								<Button
									type="secondary"
									IconLeft={IconForward}
									text={
										<FormattedMessage
											id="homePage__recentPostsSeeAll"
											defaultMessage="See All Blog Posts"
										/>
									}
									href={root.lang(languageRoute).blog.get()}
								/>
							</div>
						</div>
					}
					theme={BaseColors.CREAM}
					center
				/>
				<div className={styles.featuresWrapper}>
					<Slider perSlide={1} floatingControls dark grow>
						{features.map(
							({ heading, kicker, cta, url, image, imageAlt }, index) => (
								<Section
									key={index}
									text={
										<>
											<Heading1>{heading}</Heading1>
											<p className={styles.paragraph}>{kicker}</p>
											<Button type="super" href={url} text={cta} />
										</>
									}
									media={
										<Image
											alt={imageAlt}
											src={image}
											layout="fill"
											objectFit="cover"
										/>
									}
									theme={BaseColors.DARK}
									className={styles.featureSlide}
								/>
							),
						)}
					</Slider>
				</div>
				{!!testimonies.length && (
					<Section
						text={
							<>
								<Heading1 className={styles.testimoniesHeading}>
									<FormattedMessage
										id="home__testimonialsTitle"
										defaultMessage="Testimonials"
										description="Testimonials slider title"
									/>
								</Heading1>
								<p className={clsx(styles.paragraph, styles.narrow)}>
									<FormattedMessage
										id="homePage__testimoniesIntro"
										defaultMessage="See what some of our listeners have shared about using AudioVerse. <a>Visit the Testimonials page</a> to see even more."
										values={{
											a: function a(chunks: ReactNode[]) {
												return (
													<Link
														href={root.lang(languageRoute).testimonies.get()}
														legacyBehavior
													>
														<a className="decorated">{chunks}</a>
													</Link>
												);
											},
										}}
									/>
								</p>
								<Testimonies testimonies={testimonies} />
							</>
						}
						center
						reverse
					/>
				)}
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
								id="home-downloadApp"
							/>
						</>
					}
					media={
						<Image
							alt={intl.formatMessage({
								id: 'homePage__downloadAppImageAlt',
								defaultMessage: 'Smartphones with AudioVerse app',
								description: 'home page download app image alt',
							})}
							src={ImagePlayers}
							layout="fill"
							objectFit="cover"
							sizes="(max-width: 664px) 100vw, 50vw"
						/>
					}
					theme={BaseColors.CREAM}
					reverse
				/>
				{isEnglish && (
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
							<div className={styles.newsletterWrapper} id="newsletter-signup">
								<NewsletterForm />
							</div>
						}
					/>
				)}
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
								href={root.lang(languageRoute).give.get()}
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
							alt={intl.formatMessage({
								id: 'homePage__supportSectionImageAlt',
								defaultMessage: 'People having a discussion in a meeting',
								description: 'home page support section image alt',
							})}
							src="/img/unsplash-support.jpg"
							layout="fill"
							objectFit="cover"
						/>
					}
					theme={BaseColors.LIGHT_TONE}
					bleed
					tall
				/>
			</div>
		</>
	);
}
