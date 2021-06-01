import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './footer.module.scss';

// TODO: Finish linking all entries
// TODO: Delete this component and migrate functionality according to T&S design

export default function Footer(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const intl = useIntl();

	return (
		<div className={styles.footer}>
			<ul>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemAboutUs`}
							defaultMessage="About Us"
							description={`Footer nav link name: About Us`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemMeetTheTeam`}
							defaultMessage="Meet the Team"
							description={`Footer nav link name: Meet the Team`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemSpiritOfAudioVerse`}
							defaultMessage="Spirit of AudioVerse"
							description={`Footer nav link name: Spirit of AudioVerse`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemFAQ`}
							defaultMessage="FAQ"
							description={`Footer nav link name: FAQ`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemContactUs`}
							defaultMessage="Contact Us"
							description={`Footer nav link name: Contact Us`}
						/>
					</a>
				</li>
				<li>
					<a href={`/${languageRoute}/sermons/all/page/1`}>
						<FormattedMessage
							id={`footer__NavItemPresentations`}
							defaultMessage="Presentations"
							description={`Footer nav link name: Presentations`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemBibles`}
							defaultMessage="Bibles"
							description={`Footer nav link name: Bibles`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemBooks`}
							defaultMessage="Books"
							description={`Footer nav link name: Books`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemStories`}
							defaultMessage="Stories"
							description={`Footer nav link name: Stories`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemScriptureSongs`}
							defaultMessage="Scripture Songs"
							description={`Footer nav link name: Scripture Songs`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemConferences`}
							defaultMessage="Conferences"
							description={`Footer nav link name: Conferences`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemPresenters`}
							defaultMessage="Presenters"
							description={`Footer nav link name: Presenters`}
						/>
					</a>
				</li>
				<li>
					<a href={`/${languageRoute}/tags/page/1`}>
						<FormattedMessage
							id={`footer__NavItemTags`}
							defaultMessage="Tags"
							description={`Footer nav link name: Tags`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemSponsors`}
							defaultMessage="Sponsors"
							description={`Footer nav link name: Sponsors`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemSeries`}
							defaultMessage="Series"
							description={`Footer nav link name: Series`}
						/>
					</a>
				</li>
				<li>
					<a href={`/${languageRoute}/testimonies/page/1`}>
						<FormattedMessage
							id={`footer__NavItemTestimonials`}
							defaultMessage="Testimonials"
							description={`Footer nav link name: Testimonials`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemPlaylists`}
							defaultMessage="Playlists"
							description={`Footer nav link name: Playlists`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`footer__NavItemBlog`}
							defaultMessage="Blog"
							description={`Footer nav link name: Blog`}
						/>
					</a>
				</li>
				<li>
					<a
						href="https://audioversestore.org/"
						target={'_blank'}
						rel={'noreferrer noopener'}
					>
						<FormattedMessage
							id={`footer__NavItemAudioVerseStore`}
							defaultMessage="AudioVerse Store"
							description={`Footer nav link name: AudioVerse Store`}
						/>
					</a>
				</li>
				<li>
					<a
						href="https://www.journeysunscripted.com/"
						target={'_blank'}
						rel={'noreferrer noopener'}
					>
						<FormattedMessage
							id={`footer__NavItemJourneysUnscripted`}
							defaultMessage="Journeys Unscripted"
							description={`Footer nav link name: Journeys Unscripted`}
						/>
					</a>
				</li>
				<li>
					<a href="/de">Deutsch</a>
				</li>
				<li>
					<a href="/en">English</a>
				</li>
				<li>
					<a href="/es">Español</a>
				</li>
				<li>
					<a href="/fr">Français</a>
				</li>
				<li>
					<a href="/ja">日本語</a>
				</li>
				<li>
					<a href="/zh">中文</a>
				</li>
				<li>
					<a href="/ru">Русский</a>
				</li>
			</ul>

			<a
				href="https://itunes.apple.com/us/app/audioverse/id726998810?mt=8"
				target={'_blank'}
				rel={'noreferrer noopener'}
			>
				<img
					src="/img/app-apple.png"
					alt={intl.formatMessage({
						id: 'footer__iosAppImageAlt',
						defaultMessage: 'iOS App',
						description: 'iOS app link image alt text',
					})}
					width={230}
					height={80}
				/>
			</a>

			<a
				href="https://play.google.com/store/apps/details?id=org.audioverse.exodus"
				target={'_blank'}
				rel={'noreferrer noopener'}
			>
				<img
					src="/img/app-android.png"
					alt={intl.formatMessage({
						id: 'footer__androidAppImageAlt',
						defaultMessage: 'Android App',
						description: 'Android app link image alt text',
					})}
					width={230}
					height={80}
				/>
			</a>

			<p>
				<FormattedMessage
					id={`footer__copyright`}
					defaultMessage="AudioVerse © {year} All Rights Reserved."
					description={`Footer copyright`}
					values={{ year: new Date().getFullYear() }}
				/>
				{/*<span>{`AudioVerse © ${new Date().getFullYear()} All Rights Reserved.`}</span>{' '}*/}
				{/* TODO: Update links when pages exist */}
				<a href="#">
					<FormattedMessage
						id={`footer__legalInfoLink`}
						defaultMessage="Legal Info"
						description={`Footer legal info link text`}
					/>
				</a>
				,{' '}
				<a href="#">
					<FormattedMessage
						id={`footer__termsLink`}
						defaultMessage="Terms of Use"
						description={`Footer terms of use link text`}
					/>
				</a>
				,{' '}
				<a href="#">
					<FormattedMessage
						id={`footer__privacyPolicyLink`}
						defaultMessage="Privacy Policy"
						description={`Footer privacy policy link text`}
					/>
				</a>
				.{' '}
				<FormattedMessage
					id={`footer__designedBy`}
					defaultMessage="Designed by"
					description={`Footer designed by prefix`}
				/>{' '}
				<a
					href="https://typesandsymbols.com/"
					target={'_blank'}
					rel={'noreferrer noopener'}
				>
					Types & Symbols
				</a>
				.
			</p>
		</div>
	);
}
