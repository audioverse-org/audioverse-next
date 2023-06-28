import clsx from 'clsx';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import Button from '~components/molecules/button';
import CardPost from '~components/molecules/card/post';
import CardRecording from '~components/molecules/card/recording';
import CardSequence from '~components/molecules/card/sequence';
import CardMasonry from '~components/molecules/cardMasonry';
import DownloadAppButton from '~components/molecules/downloadAppButton';
import Input from '~components/molecules/form/input';
import Section from '~components/organisms/section';
import Slider from '~components/organisms/slider';
import Testimonies from '~components/organisms/testimonies';
import { BaseColors } from '~lib/constants';
import { getSessionToken } from '~lib/cookies';
import { getAppFeatures } from '~lib/getAppFeatures';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import IconBell from '../../public/img/icons/fa-bell.svg';
import IconForward from '../../public/img/icons/icon-forward-light.svg';
import ImagePlayers from '../../public/img/players.jpeg';
import { GetHomeStaticPropsQuery } from './__generated__/home';
import styles from './home.module.scss';

export type HomeProps = {
	data: GetHomeStaticPropsQuery | undefined;
};

export default function Home({ data }: HomeProps): JSX.Element {
	const intl = useIntl();
	const languageRoute = useLanguageRoute();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const isLoggedIn = !!getSessionToken();

	const recentRecordings = data?.websiteRecentRecordings.nodes || [];
	const testimonies = data?.testimonies.nodes || [];
	const posts = data?.blogPosts.nodes || [];
	const bibleChapters = data?.bibleChapters.nodes || [];

	const features = getAppFeatures(languageRoute);

	const isEnglish = languageRoute === 'en';

	return (
		<>
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
							<div className={styles.primaryCtas}>
								<Button
									type="super"
									href={root.lang(languageRoute).discover.get()}
									text={
										<FormattedMessage
											id="homePage__DiscoverAudioButtonLabel"
											defaultMessage="Discover Audio"
										/>
									}
								/>
								{!isLoggedIn && (
									<Button
										type="primaryInverse"
										href={root.lang(languageRoute).account.register.get()}
										text={
											<FormattedMessage
												id="homePage__CreateAccountButtonLabel"
												defaultMessage="Create an Account"
											/>
										}
									/>
								)}
							</div>
						</>
					}
					media={
						<div className={styles.bannerImage}>
							<Image
								src="/img/hero-av.jpg"
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
												} as const)
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
									posts.length === 4 && styles.postsSquare
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
										action="https://audioverse.activehosted.com/proc.php"
										method="POST"
										target="_blank"
									>
										<input type="hidden" name="u" value="1" />
										<input type="hidden" name="f" value="1" />
										<input type="hidden" name="s" />
										<input type="hidden" name="c" value="0" />
										<input type="hidden" name="m" value="0" />
										<input type="hidden" name="act" value="sub" />
										<input type="hidden" name="v" value="2" />
										<input
											type="hidden"
											name="or"
											value="e2e4794f66cb49fa14b643a5f9d6536b"
										/>
										<div className={styles.newsletterFieldRow}>
											<Input
												name="fullname"
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
												name="email"
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
