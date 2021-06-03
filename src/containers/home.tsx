import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon from '@components/atoms/icon';
import CardChapter from '@components/molecules/cardChapter';
import CardRecording from '@components/molecules/cardRecording';
import CardSong from '@components/molecules/cardSong';
import CardStory from '@components/molecules/cardStory';
import CardTopic from '@components/molecules/cardTopic';
import Section from '@components/organisms/section';
import Testimonies from '@components/organisms/testimonies';

import LanguageIcon from '../../public/img/icon-language-solid.svg';

import styles from './home.module.scss';

export default function Home(): JSX.Element {
	return (
		<div>
			<div className={styles.header}>
				<img src="/img/logo.svg" width={161} height={23} />
				<div className={styles.nav}>
					{/* TODO: give FA attribution, or purchase a license */}
					<span className={styles.languages}>
						<LanguageIcon
							width={16}
							height={16}
							style={{
								color: '#FF6E6E',
							}}
						/>
						<span>English</span>
						<Icon icon={'chevron-down'} />
					</span>
					<a href={'#'} className={styles.button}>
						Donate
					</a>
					<a href={'#'} className={styles.button}>
						Download App
					</a>
					<span>|</span>
					<a href={'#'}>Login</a>
					<a href={'#'}>Sign Up</a>
				</div>
			</div>
			<Section
				text={
					<>
						<h2>Sound Doctrine</h2>
						<p>
							AudioVerse is a platform curating the best in Adventist audio
							content. Be challenged and inspired to grow in your relationship
							with Jesus through songs, sermons, audiobooks, and Bible readings.
						</p>
						<a href="#" className={styles.button}>
							Join AudioVerse
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
						<h2>Recent content</h2>
						<p>
							Explore a select few of our audio pieces. Then when you’re ready,{' '}
							<a href="#">create an account</a> to view even more.
						</p>
					</>
				}
				media={
					<div className={styles.recent}>
						<CardSong />
						<CardChapter />
						<CardStory />
						<CardTopic />
						<CardRecording />
					</div>
				}
				center={true}
				reverse={true}
			/>
			<Section
				text={
					<>
						<h2>Download the App</h2>
						<p>
							If you have a smartphone, download the app to take AudioVerse with
							you wherever you go. Stream teachings from anywhere over your
							network connection or download before-hand to listen on-the-go
							without using your data.
						</p>
						<a href="#" className={styles.button}>
							Download Now
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
						<p>Hear from some of the people who use AudioVerse.</p>
					</>
				}
				media={
					<>
						<Testimonies />
						<div>pagination</div>
					</>
				}
				center={true}
				reverse={true}
			/>
			<Section
				text={
					<>
						<h2>Recent blog posts</h2>
						<p>
							Read through our blog to find articles about recent events,
							sermons, and conferences. It’s updated semi-regularly at least
							once a month.
						</p>
						<a href="#" className={styles.button}>
							View all blog posts
						</a>
					</>
				}
				media={
					<>
						<div>post 1</div>
						<div>post 2</div>
					</>
				}
				theme={'sky'}
			/>
			<Section
				text={
					<>
						<h2>Create an account</h2>
						<p>
							Create an account to get the most of Audioverse. Download
							teachings, save series to your library, and subscribe to sponsors
							and speakers to always get the latest.
						</p>
						<a href="#" className={styles.button}>
							Sign up now
						</a>
					</>
				}
				media={
					<>
						<div>Add to Library</div>
						<div>Download Queue</div>
						<div>Follow Functionality</div>
					</>
				}
				reverse={true}
			/>
			<div>
				<h2>Support free audio</h2>
				<p>
					AudioVerse is a non-profit ministry that exists because of our
					supporters. Creating, maintaining, and improving a technology platform
					takes a lot of resources and we’re grateful to our generous group of
					donors. Consider contributing today, even if it’s just 5 dollars a
					month, and help ensure that we can continue providing sound doctrine.
				</p>
				<a href="#" className={styles.button}>
					Make a donation
				</a>
				<div>image</div>
			</div>
			<div>
				<h2>Stay in touch</h2>
				<div>circle 1</div>
				<div>circle 2</div>
				<div>circle 3</div>
				<a href="#" className={styles.button}>
					Sign up for newsletter
				</a>
			</div>
			<div>
				<span>footer</span>
				<img src="/img/logo.svg" width={161} height={23} />
				<h5>Social</h5>
				<ul>
					<li>
						<a href="#">Facebook</a>
					</li>
					<li>
						<a href="#">Instagram</a>
					</li>
					<li>
						<a href="#">Twitter</a>
					</li>
				</ul>
				<h5>Links</h5>
				<ul>
					<li>
						<a href="#">Download app</a>
					</li>
					<li>
						<a href="#">Sign up for newsletter</a>
					</li>
					<li>
						<a href="#">Donate</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
