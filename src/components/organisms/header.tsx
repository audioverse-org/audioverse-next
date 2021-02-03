import React from 'react';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from '@components/molecules/loadingIndicator';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './header.module.scss';

const Header = (): JSX.Element => {
	const languageRoute = useLanguageRoute();

	return (
		<header className={styles.header}>
			<ul>
				<li>
					<a
						href={`https://audioversestore.org/`}
						target={'_blank'}
						rel={'noreferrer noopener'}
					>
						<FormattedMessage
							id={`header__sisterSiteStoreLink`}
							defaultMessage="AudioVerse Store"
							description={`Header sister site link: store`}
						/>
					</a>
				</li>
				<li>
					<a
						href={`https://www.journeysunscripted.com/`}
						target={'_blank'}
						rel={'noreferrer noopener'}
					>
						<FormattedMessage
							id={`header__sisterSiteJourneysUnscriptedLink`}
							defaultMessage="Journeys Unscripted"
							description={`Header sister site link: Journeys Unscripted`}
						/>
					</a>
				</li>
			</ul>
			<h1>
				<a href={`/${languageRoute}`}>
					<img src="/img/av-logo.png" alt="AudioVerse" width={300} />
				</a>
			</h1>
			<input placeholder={'Search'} />
			<a href={`/${languageRoute}/give`}>
				<FormattedMessage
					id="header__donateButton"
					defaultMessage="Donate Now"
					description="Header donate button"
				/>
			</a>
			<LoadingIndicator />
			<ul>
				<li>
					<a href={`/${languageRoute}/sermons/all/page/1`}>
						<FormattedMessage
							id={`header__navItemPresentations`}
							defaultMessage="Presentations"
							description={`Header nav link name: Presentations`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__navItemBibles`}
							defaultMessage="Bibles"
							description={`Header nav link name: Bibles`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemBooks`}
							defaultMessage="Books"
							description={`Header nav link name: Books`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemStories`}
							defaultMessage="Stories"
							description={`Header nav link name: Stories`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemScriptureSongs`}
							defaultMessage="Scripture Songs"
							description={`Header nav link name: Scripture Songs`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemConferences`}
							defaultMessage="Conferences"
							description={`Header nav link name: Conferences`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemPresenters`}
							defaultMessage="Presenters"
							description={`Header nav link name: Presenters`}
						/>
					</a>
				</li>
				<li>
					<a href={`/${languageRoute}/tags/page/1`}>
						<FormattedMessage
							id={`header__naveItemTags`}
							defaultMessage="Tags"
							description={`Header nav link name: Tags`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemSponsors`}
							defaultMessage="Sponsors"
							description={`Header nav link name: Sponsors`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemSeries`}
							defaultMessage="Series"
							description={`Header nav link name: Series`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemPlaylists`}
							defaultMessage="Playlists"
							description={`Header nav link name: Playlists`}
						/>
					</a>
				</li>
				<li>
					<a href={`/${languageRoute}/profile`}>
						<FormattedMessage
							id={`header__naveItemManageAccount`}
							defaultMessage="Manage Account"
							description={`Header nav link name: Manage Account`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemMyPlaylists`}
							defaultMessage="My Playlists"
							description={`Header nav link name: My Playlists`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemFavorites`}
							defaultMessage="Favorites"
							description={`Header nav link name: Favorites`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemHistory`}
							defaultMessage="History"
							description={`Header nav link name: History`}
						/>
					</a>
				</li>
				<li>
					<a href="#">
						<FormattedMessage
							id={`header__naveItemLogout`}
							defaultMessage="Logout"
							description={`Header nav link name: Logout`}
						/>
					</a>
				</li>
			</ul>
		</header>
	);
};

export default Header;
