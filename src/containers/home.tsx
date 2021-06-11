import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardBibleChapter from '@components/molecules/cardBibleChapter';
import CardSermon from '@components/molecules/cardSermon';
import CardSong from '@components/molecules/cardSong';
import CardStory from '@components/molecules/cardStory';
import CardTopic from '@components/molecules/cardTopic';
import LanguageSwitcher from '@components/molecules/languageSwitcher';
import CardSlider from '@components/organisms/cardSlider';
import Section from '@components/organisms/section';
import Testimonies from '@components/organisms/testimonies';
import { HomeProps } from '@pages/[language]';

import styles from './home.module.scss';

export default function Home({ data }: HomeProps): JSX.Element {
	const song = data?.musicTracks.nodes && data.musicTracks.nodes[0];
	const chapter = data?.audiobible?.book.chapter;
	const story = data?.stories.nodes && data.stories.nodes[0];
	const topicRecording = data?.tag.nodes && data.tag.nodes[0];
	const recording = data?.sermons.nodes && data.sermons.nodes[0];

	return (
		<div>
			<header className={styles.header}>
				<img src="/img/logo.svg" width={161} height={23} />
				<nav className={styles.nav}>
					<LanguageSwitcher />
					<a href={'#'} className={`${styles.button} ${styles.primary}`}>
						<FormattedMessage
							id={'homePage__donateButtonLabel'}
							defaultMessage={'Donate'}
							description={'home page donate button label'}
						/>
					</a>
					<a href={'#'} className={`${styles.button} ${styles.primary}`}>
						<FormattedMessage
							id={'homePage__downloadAppButtonLabel'}
							defaultMessage={'Download App'}
							description={'home page download app button label'}
						/>
					</a>
					<span>|</span>
					<a href={'#'}>
						<FormattedMessage
							id={'homePage__loginButtonLabel'}
							defaultMessage={'Login'}
							description={'home page login button label'}
						/>
					</a>
					<a href={'#'}>
						<FormattedMessage
							id={'srcContainersHomeTsx__signUp'}
							defaultMessage={'Sign Up'}
							description={'home: Sign up button label'}
						/>
					</a>
				</nav>
			</header>
			<Section
				text={
					<>
						<h2>
							<FormattedMessage
								id={'homePage__soundDoctrineTitle'}
								defaultMessage={'Sound Doctrine'}
								description={'home: Sound Doctrine section title'}
							/>
						</h2>
						<p>
							<FormattedMessage
								id={'homePage__soundDoctrineText'}
								defaultMessage={
									'AudioVerse is a platform curating the best in Adventist audio content. Be challenged and inspired to grow in your relationship with Jesus through songs, sermons, audiobooks, and Bible readings.'
								}
								description={'home page sound doctrine text'}
							/>
						</p>
						<a href="#" className={`${styles.button} ${styles.primary}`}>
							<FormattedMessage
								id={'homePage__joinAudioverseButtonLabel'}
								defaultMessage={'Join AudioVerse'}
								description={'home page join audioverse button label'}
							/>
						</a>
					</>
				}
				media={
					<img
						src={'/img/unsplash-headphones.jpg'}
						width={4724}
						height={3072}
					/>
				}
				theme={'dark'}
				bleed={true}
			/>
			<Section
				text={
					<>
						<h2>
							<FormattedMessage
								id={'homePage__recentContentSectionTitle'}
								defaultMessage={'Recent content'}
								description={'home page recent content section title'}
							/>
						</h2>
						<p>
							<FormattedMessage
								id={'homePage__recentContentSectionText'}
								defaultMessage={
									'Explore a select few of our audio pieces. Then when you’re ready, <a>create an account</a> to view even more.'
								}
								description={'home page recent content section text'}
								values={{
									a: function a(chunks: string) {
										return <a href="#">{chunks}</a>;
									},
								}}
							/>
						</p>
					</>
				}
				media={
					<CardSlider>
						{song && <CardSong song={song} />}
						{chapter && <CardBibleChapter chapter={chapter} />}
						{story && <CardStory story={story} />}
						{topicRecording && <CardTopic topicRecording={topicRecording} />}
						{recording && <CardSermon recording={recording} />}
					</CardSlider>
				}
				center={true}
				reverse={true}
			/>
			<Section
				text={
					<>
						<h2>
							<FormattedMessage
								id={'homePage__downloadAppSectionTitle'}
								defaultMessage={'Download the App'}
								description={'home page download app section title'}
							/>
						</h2>
						<p>
							<FormattedMessage
								id={'homePage__downloadAppSectionText'}
								defaultMessage={
									'If you have a smartphone, download the app to take AudioVerse with you wherever you go. Stream teachings from anywhere over your network connection or download before-hand to listen on-the-go without using your data.'
								}
								description={'home page download app section text'}
							/>
						</p>
						<a href="#" className={`${styles.button} ${styles.primary}`}>
							<FormattedMessage
								id={'homePage__downloadNowButtonLabel'}
								defaultMessage={'Download Now'}
								description={'home page download now button label'}
							/>
						</a>
					</>
				}
				media={<img src={'/img/players.jpeg'} width={3564} height={1724} />}
				theme={'dark'}
			/>
			<Section
				text={
					<>
						<h2>
							<FormattedMessage
								id="home__testimoniesTitle"
								defaultMessage="Testimonies"
								description="Testimonies slider title"
							/>
						</h2>
						<p>
							<FormattedMessage
								id={'homePage__testimoniesSectionText'}
								defaultMessage={
									'Hear from some of the people who use AudioVerse.'
								}
								description={'home page testimonies section text'}
							/>
						</p>
					</>
				}
				media={
					<>
						<Testimonies />
						<div>
							<FormattedMessage
								id={'homePage__testimoniesPaginationPlaceholder'}
								defaultMessage={'pagination'}
								description={'home page testimonies pagination placeholder'}
							/>
						</div>
					</>
				}
				center={true}
				reverse={true}
			/>
			<Section
				text={
					<>
						<h2>
							<FormattedMessage
								id={'homePage__recentPostsSectionTitle'}
								defaultMessage={'Recent blog posts'}
								description={'home page recent posts section title'}
							/>
						</h2>
						<p>
							<FormattedMessage
								id={'homePage__recentPostsSectionText'}
								defaultMessage={
									'Read through our blog to find articles about recent events, sermons, and conferences. It’s updated semi-regularly at least once a month.'
								}
								description={'home page recent posts section text'}
							/>
						</p>
						<a href="#" className={`${styles.button} ${styles.primary}`}>
							<FormattedMessage
								id={'homePage__recentPostsButtonLabel'}
								defaultMessage={'View all blog posts'}
								description={'home page recent posts button label'}
							/>
						</a>
					</>
				}
				media={
					<>
						<div>
							<FormattedMessage
								id={'homePage__postOnePlaceholder'}
								defaultMessage={'post 1'}
								description={'home page post one placeholder'}
							/>
						</div>
						<div>
							<FormattedMessage
								id={'homePage__postTwoPlaceholder'}
								defaultMessage={'post 2'}
								description={'post two placeholder'}
							/>
						</div>
					</>
				}
				theme={'lightTone'}
			/>
			<Section
				text={
					<>
						<h2>
							<FormattedMessage
								id={'homePage__createAccountSectionTitle'}
								defaultMessage={'Create an account'}
								description={'home page create account section title'}
							/>
						</h2>
						<p>
							<FormattedMessage
								id={'homePage__createAccountSectionText'}
								defaultMessage={
									'Create an account to get the most of Audioverse. Download teachings, save series to your library, and subscribe to sponsors and speakers to always get the latest.'
								}
								description={'home page create account section text'}
							/>
						</p>
						<a href="#" className={`${styles.button} ${styles.primary}`}>
							<FormattedMessage
								id={'homePage__createAccountSectionCTA'}
								defaultMessage={'Sign up now'}
								description={'home page create account section cta'}
							/>
						</a>
					</>
				}
				media={
					<>
						<div>
							<FormattedMessage
								id={'homePage__addToLibraryPlaceholder'}
								defaultMessage={'Add to Library'}
								description={'home page add to library placeholder'}
							/>
						</div>
						<div>
							<FormattedMessage
								id={'homePage__downloadQueuePlaceholder'}
								defaultMessage={'Download Queue'}
								description={'home page downloaed queue placeholder'}
							/>
						</div>
						<div>
							<FormattedMessage
								id={'homePage__followFunctionalityPlaceholder'}
								defaultMessage={'Follow Functionality'}
								description={'home page follow functionality placeholder'}
							/>
						</div>
					</>
				}
				reverse={true}
			/>
			<Section
				text={
					<>
						<h2>
							<FormattedMessage
								id={'homePage__supportSectionTitle'}
								defaultMessage={'Support free audio'}
								description={'home page support section title'}
							/>
						</h2>
						<p>
							<FormattedMessage
								id={'homePage__supportSectionText'}
								defaultMessage={
									'AudioVerse is a non-profit ministry that exists because of our supporters. Creating, maintaining, and improving a technology platform takes a lot of resources and we’re grateful to our generous group of donors. Consider contributing today, even if it’s just 5 dollars a month, and help ensure that we can continue providing sound doctrine.'
								}
								description={'home page support section text'}
							/>
						</p>
						<a href="#" className={`${styles.button} ${styles.primary}`}>
							<FormattedMessage
								id={'homePage__supportSectionCTA'}
								defaultMessage={'Make a donation'}
								description={'home page support section cta'}
							/>
						</a>
					</>
				}
				media={
					<div>
						<FormattedMessage
							id={'homePage__supportSectionImagePlaceholder'}
							defaultMessage={'image'}
							description={'home page support section image placeholder'}
						/>
					</div>
				}
				theme={'cream'}
			/>
			<Section
				theme={'dark'}
				reverse={true}
				text={
					<>
						<h2>
							<FormattedMessage
								id={'homePage__newsletterSectionTitle'}
								defaultMessage={'Subscribe to Updates'}
								description={'home page newsletter section title'}
							/>
						</h2>
						<p>
							<FormattedMessage
								id={'homePage__newsletterSectionText'}
								defaultMessage={
									'Want to hear when we’re releasing new features, going to conferences, or releasing new AudioVerse Swag? Subscribe to our newsletter to get updates.'
								}
								description={'home page newsletter section text'}
							/>
						</p>
					</>
				}
				media={
					<div>
						<FormattedMessage
							id={'homePage__newsletterSectionFormPlaceholder'}
							defaultMessage={'newsletter signup form'}
							description={'home page newsletter section form placeholder'}
						/>
					</div>
				}
			/>
			<div>
				<img src="/img/logo.svg" width={161} height={23} />
				<h5>
					<FormattedMessage
						id={'homePage__footerSocialTitle'}
						defaultMessage={'Social'}
						description={'home page footer social title'}
					/>
				</h5>
				<ul>
					<li>
						<a href="#">
							<FormattedMessage
								id={'homePage__footerFacebookLink'}
								defaultMessage={'Facebook'}
								description={'home page footer facebook link'}
							/>
						</a>
					</li>
					<li>
						<a href="#">
							<FormattedMessage
								id={'homePage__footerInstagramLink'}
								defaultMessage={'Instagram'}
								description={'home page footer instagram link'}
							/>
						</a>
					</li>
					<li>
						<a href="#">
							<FormattedMessage
								id={'homePage__footerTwitterLink'}
								defaultMessage={'Twitter'}
								description={'home page footer twitter link'}
							/>
						</a>
					</li>
				</ul>
				<h5>
					<FormattedMessage
						id={'homePage__footerLinksTitle'}
						defaultMessage={'Links'}
						description={'home page footer links title'}
					/>
				</h5>
				<ul>
					<li>
						<a href="#">
							<FormattedMessage
								id={'homePage__footerDownloadAppButton'}
								defaultMessage={'Download app'}
								description={'home page footer download app button'}
							/>
						</a>
					</li>
					<li>
						<a href="#">
							<FormattedMessage
								id={'homePage__footerNewsletterSignup'}
								defaultMessage={'Sign up for newsletter'}
								description={'homePage__footerNewsletterSignup'}
							/>
						</a>
					</li>
					<li>
						<a href="#">
							<FormattedMessage
								id={'homePage__footerDonateLink'}
								defaultMessage={'Donate'}
								description={'home page footer donate link'}
							/>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
