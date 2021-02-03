import React from 'react';
import { FormattedMessage } from 'react-intl';

import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './footer.module.scss';

export default function Footer(): JSX.Element {
	const languageRoute = useLanguageRoute();

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
					<a href="/de">
						<FormattedMessage
							id={`footer__NavItemGerman`}
							defaultMessage="Deutsch"
							description={`Footer nav link name: German`}
						/>
					</a>
				</li>
				<li>
					<a href="/en">
						<FormattedMessage
							id={`footer__NavItemEnglish`}
							defaultMessage="English"
							description={`Footer nav link name: English`}
						/>
					</a>
				</li>
				<li>
					<a href="/es">
						<FormattedMessage
							id={`footer__NavItemSpanish`}
							defaultMessage="Español"
							description={`Footer nav link name: Spanish`}
						/>
					</a>
				</li>
				<li>
					<a href="/fr">
						<FormattedMessage
							id={`footer__NavItemFrench`}
							defaultMessage="Français"
							description={`Footer nav link name: French`}
						/>
					</a>
				</li>
				<li>
					<a href="/ja">
						<FormattedMessage
							id={`footer__NavItemJapanese`}
							defaultMessage="日本語"
							description={`Footer nav link name: Japanese`}
						/>
					</a>
				</li>
				<li>
					<a href="/zh">
						<FormattedMessage
							id={`footer__NavItemZhongwen`}
							defaultMessage="中文"
							description={`Footer nav link name: Zhongwen`}
						/>
					</a>
				</li>
				<li>
					<a href="/ru">
						<FormattedMessage
							id={`footer__NavItemRussian`}
							defaultMessage="Русский"
							description={`Footer nav link name: Russian`}
						/>
					</a>
				</li>
			</ul>
		</div>
	);
}
