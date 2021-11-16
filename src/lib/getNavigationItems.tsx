import { NextRouter } from 'next/router';
import React from 'react';

import DownloadAppButton from '@components/molecules/downloadAppButton';
import LanguageButton from '@components/molecules/languageButton';
import {
	makeAboutPage,
	makeAccountProfileRoute,
	makeAudiobookListRoute,
	makeBibleListRoute,
	makeBlogPostListRoute,
	makeConferenceListRoute,
	makeContactRoute,
	makeDiscoverCollectionsRoute,
	makeDiscoverRoute,
	makeDonateRoute,
	makeLibraryRoute,
	makeLogoutRoute,
	makePresenterListRoute,
	makeSeriesListRoute,
	makeSongAlbumsListRoute,
	makeSponsorListRoute,
	makeStoryAlbumListPage,
	makeTestimoniesRoute,
	makeTestimonySubmitRoute,
} from '@lib/routes';

import IconAlignLeft from '../../public/img/fa-align-left.svg';
import IconBook from '../../public/img/fa-book.svg';
import IconBullseyeHeavy from '../../public/img/fa-bullseye-heavy.svg';
import IconCommentHeavy from '../../public/img/fa-comment-heavy.svg';
import IconFacebook from '../../public/img/fa-facebook.svg';
import IconFeather from '../../public/img/fa-feather.svg';
import IconFireHeavy from '../../public/img/fa-fire-heavy.svg';
import IconHeartHeavy from '../../public/img/fa-heart-heavy.svg';
import IconInbox from '../../public/img/fa-inbox.svg';
import IconInstagram from '../../public/img/fa-instagram.svg';
import IconLandmark from '../../public/img/fa-landmark-heavy.svg';
import IconListAlt from '../../public/img/fa-list-alt.svg';
import IconListAltHeavy from '../../public/img/fa-list-alt.svg';
import IconList from '../../public/img/fa-list-light.svg';
import IconLock from '../../public/img/fa-lock-heavy.svg';
import IconMusic from '../../public/img/fa-music.svg';
import IconNewpaper from '../../public/img/fa-newspaper-heavy.svg';
import IconSignOut from '../../public/img/fa-sign-out.svg';
import IconTwitter from '../../public/img/fa-twitter.svg';
import IconUser from '../../public/img/fa-user-heavy.svg';
import IconUserPlusHeavy from '../../public/img/fa-user-plus-heavy.svg';
import IconUsersHeavy from '../../public/img/fa-users-heavy.svg';
import IconYouTube from '../../public/img/fa-youtube.svg';
import IconBible from '../../public/img/icon-bible.svg';
import IconBooks from '../../public/img/icon-books.svg';
import IconCollections from '../../public/img/icon-collections.svg';
import IconContact from '../../public/img/icon-contact.svg';
import IconMore from '../../public/img/icon-more.svg';
import IconOurStory from '../../public/img/icon-our-story.svg';
import IconSearch from '../../public/img/icon-search.svg';

import getIntl from './getIntl';

export type INavigationItem = {
	key: string;
	href?: string;
	onClick?: (props: { popSubmenu: () => void }) => void;
	isDivider?: true;
	isTargetBlank?: true;
	Icon: React.ElementType | null;
	label: string;
	children?: INavigationItem[];
	childNode?: JSX.Element;
};

export function getNavigationItems(
	router: NextRouter,
	languageRoute: string
): INavigationItem[] {
	const intl = getIntl(languageRoute);

	return [
		{
			key: 'discover',
			href: makeDiscoverRoute(languageRoute),
			Icon: IconSearch,
			label: intl.formatMessage({
				id: `header__navItemDiscover`,
				defaultMessage: 'Discover',
				description: `Header nav link name: Discover`,
			}),
		},
		{
			key: 'library',
			href: makeLibraryRoute(languageRoute),
			Icon: IconBooks,
			label: intl.formatMessage({
				id: `header__navItemLibrary`,
				defaultMessage: 'Library',
				description: `Header nav link name: Library`,
			}),
		},
		{
			key: 'bibles',
			href: makeBibleListRoute(languageRoute),
			Icon: IconBible,
			label: intl.formatMessage({
				id: `header__naveItemBible`,
				defaultMessage: 'Bible',
				description: `Header nav link name: Bible`,
			}),
		},
		{
			key: 'collections',
			href: makeDiscoverCollectionsRoute(languageRoute),
			Icon: IconCollections,
			label: intl.formatMessage({
				id: `header__navItemCollections`,
				defaultMessage: 'Collections',
				description: `Header nav link name: Collections`,
			}),
			children: [
				{
					key: 'all',
					href: makeDiscoverCollectionsRoute(languageRoute),
					Icon: IconListAltHeavy,
					label: intl.formatMessage({
						id: `header__naveItemCollections-all`,
						defaultMessage: 'All Collections',
					}),
				},
				{
					key: 'sponsors',
					href: makeSponsorListRoute(languageRoute),
					Icon: IconUserPlusHeavy,
					label: intl.formatMessage({
						id: `header__naveItemCollections-sponsor`,
						defaultMessage: 'Sponsor',
					}),
				},
				{
					key: 'conferences',
					href: makeConferenceListRoute(languageRoute),
					Icon: IconList,
					label: intl.formatMessage({
						id: `header__naveItemCollections-conference`,
						defaultMessage: 'Conference',
					}),
				},
				{
					key: 'series',
					href: makeSeriesListRoute(languageRoute),
					Icon: IconListAlt,
					label: intl.formatMessage({
						id: `header__naveItemCollections-series`,
						defaultMessage: 'Series',
					}),
				},
				{
					key: 'presenter',
					href: makePresenterListRoute(languageRoute),
					Icon: IconUser,
					label: intl.formatMessage({
						id: `header__naveItemCollections-speaker`,
						defaultMessage: 'Speaker',
					}),
				},
				{
					key: 'stories',
					href: makeStoryAlbumListPage(languageRoute),
					Icon: IconFeather,
					label: intl.formatMessage({
						id: `header__naveItemCollections-stories`,
						defaultMessage: 'Stories',
					}),
				},
				{
					key: 'books',
					href: makeAudiobookListRoute(languageRoute),
					Icon: IconBook,
					label: intl.formatMessage({
						id: `header__naveItemCollections-book`,
						defaultMessage: 'Book',
					}),
				},
				{
					key: 'songs',
					href: makeSongAlbumsListRoute(languageRoute),
					Icon: IconMusic,
					label: intl.formatMessage({
						id: `header__naveItemCollections-songs`,
						defaultMessage: 'Scripture Songs',
					}),
				},
			],
		},
		{
			key: 'story',
			href: makeAboutPage(languageRoute, 1),
			Icon: IconOurStory,
			label: intl.formatMessage({
				id: `header__navItemStory`,
				defaultMessage: 'Our Story',
			}),
			children: [
				{
					key: 'about',
					href: makeAboutPage(languageRoute, 1),
					Icon: IconUserPlusHeavy,
					label: intl.formatMessage({
						id: `header__navItemStory`,
						defaultMessage: 'Our Story',
					}),
				},
				{
					key: 'meettheteam',
					href: makeAboutPage(languageRoute, 13),
					Icon: IconUsersHeavy,
					label: intl.formatMessage({
						id: `header__navItemStory-team`,
						defaultMessage: 'The Team',
					}),
				},
				{
					key: 'purpose',
					href: makeAboutPage(languageRoute, 7),
					Icon: IconBullseyeHeavy,
					label: intl.formatMessage({
						id: `header__navItemStory-purpose`,
						defaultMessage: 'Our Purpose',
					}),
				},
				{
					key: 'spiritofav',
					href: makeAboutPage(languageRoute, 12),
					Icon: IconFireHeavy,
					label: intl.formatMessage({
						id: `header__navItemStory-spiritOfAudioVerse`,
						defaultMessage: 'Spirit of AudioVerse',
					}),
				},
				{
					key: 'blog',
					href: makeBlogPostListRoute(languageRoute),
					Icon: IconAlignLeft,
					label: intl.formatMessage({
						id: `header__navItemStory-blog`,
						defaultMessage: 'Blog',
					}),
				},
				{
					key: 'testimonials',
					href: makeTestimoniesRoute(languageRoute),
					Icon: IconCommentHeavy,
					label: intl.formatMessage({
						id: `header__navItemStory-testimonials`,
						defaultMessage: 'Testimonials',
					}),
				},
				{
					key: 'donate',
					href: makeDonateRoute(languageRoute),
					Icon: IconHeartHeavy,
					label: intl.formatMessage({
						id: `header__navItemStory-donate`,
						defaultMessage: 'Donate',
					}),
				},
			],
		},
		{
			key: 'contact',
			href: makeContactRoute(languageRoute),
			Icon: IconContact,
			label: intl.formatMessage({
				id: `header__navItemContact`,
				defaultMessage: 'Contact',
			}),
			children: [
				{
					key: 'general',
					href: makeContactRoute(languageRoute, '/general'),
					Icon: IconInbox,
					label: intl.formatMessage({
						id: `header__naveItemContact-general`,
						defaultMessage: 'General Contact',
					}),
				},
				{
					key: 'support',
					href: makeContactRoute(languageRoute, '/support'),
					Icon: IconCommentHeavy,
					label: intl.formatMessage({
						id: `header__naveItemContact-support`,
						defaultMessage: 'Request Support',
					}),
				},
				{
					key: 'testimony',
					href: makeTestimonySubmitRoute(languageRoute),
					Icon: IconCommentHeavy,
					label: intl.formatMessage({
						id: `header__naveItemContact-testimony`,
						defaultMessage: 'Share Testimony',
					}),
				},
				{
					key: 'divider',
					Icon: null,
					label: '',
					isDivider: true,
				},
				{
					key: 'facebook',
					href: 'https://www.facebook.com/AudioVerse',
					Icon: IconFacebook,
					label: intl.formatMessage({
						id: `header__naveItemContact-facebook`,
						defaultMessage: 'Facebook',
					}),
					isTargetBlank: true,
				},
				{
					key: 'instagram',
					href: 'https://www.instagram.com/audioverse/',
					Icon: IconInstagram,
					label: intl.formatMessage({
						id: `header__naveItemContact-instagram`,
						defaultMessage: 'Instagram',
					}),
					isTargetBlank: true,
				},
				{
					key: 'twitter',
					href: 'https://www.twitter.com/audioverse/',
					Icon: IconTwitter,
					label: intl.formatMessage({
						id: `header__naveItemContact-twitter`,
						defaultMessage: 'Twitter',
					}),
					isTargetBlank: true,
				},
				{
					key: 'youtube',
					href: 'https://www.youtube.com/user/AudioVerseMinistry',
					Icon: IconYouTube,
					label: intl.formatMessage({
						id: `header__naveItemContact-youtube`,
						defaultMessage: 'YouTube',
					}),
					isTargetBlank: true,
				},
			],
		},
		{
			key: 'more',
			Icon: IconMore,
			label: intl.formatMessage({
				id: `header__navItemMore`,
				defaultMessage: 'More',
				description: `Header nav link name: More`,
			}),
			children: [
				{
					key: 'legal',
					href: makeAboutPage(languageRoute, 3),
					Icon: IconLandmark,
					label: intl.formatMessage({
						id: `header__naveItemMore-legal`,
						defaultMessage: 'Legal',
					}),
				},
				{
					key: 'privacy',
					href: makeAboutPage(languageRoute, 4),
					Icon: IconLock,
					label: intl.formatMessage({
						id: `header__naveItemMore-privacy`,
						defaultMessage: 'Privacy',
					}),
				},
				{
					key: 'terms',
					href: makeAboutPage(languageRoute, 5),
					Icon: IconNewpaper,
					label: intl.formatMessage({
						id: `header__naveItemMore-terms`,
						defaultMessage: 'Terms of Use',
					}),
				},
			],
			childNode: (
				<>
					<li>
						<LanguageButton
							buttonType="secondary"
							onClick={(baseUrl) => {
								router.push(`/${baseUrl}/`);
							}}
						/>
					</li>
					<li>
						<DownloadAppButton buttonType="secondary" menuAlignment="left" />
					</li>
				</>
			),
		},
		{
			key: 'account',
			Icon: null,
			label: intl.formatMessage({
				id: `header__navItemUser`,
				defaultMessage: 'User Settings',
				description: `Header nav link name: User Settings`,
			}),
			children: [
				{
					key: 'profile',
					href: makeAccountProfileRoute(languageRoute),
					Icon: IconUser,
					label: intl.formatMessage({
						id: `header__naveItemUser-profile`,
						defaultMessage: 'Profile',
					}),
				},
				{
					key: 'logout',
					href: makeLogoutRoute(languageRoute),
					onClick: ({ popSubmenu }) => popSubmenu(),
					Icon: IconSignOut,
					label: intl.formatMessage({
						id: `header__naveItemUser-logout`,
						defaultMessage: 'Log Out',
					}),
				},
			],
		},
	];
}
