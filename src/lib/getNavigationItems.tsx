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
} from '@lib/routes';

import IconBook from '../../public/img/fa-book.svg';
import IconBullseyeHeavy from '../../public/img/fa-bullseye-heavy.svg';
import IconCommentHeavy from '../../public/img/fa-comment-heavy.svg';
import IconFeather from '../../public/img/fa-feather.svg';
import IconFireHeavy from '../../public/img/fa-fire-heavy.svg';
import IconHeartHeavy from '../../public/img/fa-heart-heavy.svg';
import IconLandmark from '../../public/img/fa-landmark-heavy.svg';
import IconListAltLight from '../../public/img/fa-list-alt-light.svg';
import IconListAlt from '../../public/img/fa-list-alt.svg';
import IconList from '../../public/img/fa-list-light.svg';
import IconLock from '../../public/img/fa-lock-heavy.svg';
import IconMusic from '../../public/img/fa-music.svg';
import IconNewpaper from '../../public/img/fa-newspaper-heavy.svg';
import IconSignOut from '../../public/img/fa-sign-out.svg';
import IconUser from '../../public/img/fa-user-heavy.svg';
import IconUserLight from '../../public/img/fa-user-light.svg';
import IconUserPlusHeavy from '../../public/img/fa-user-plus-heavy.svg';
import IconUserPlus from '../../public/img/fa-user-plus-light.svg';
import IconUsersHeavy from '../../public/img/fa-users-heavy.svg';
import IconBible from '../../public/img/icon-bible.svg';
import IconBlog from '../../public/img/icon-blog.svg';
import IconBooks from '../../public/img/icon-books.svg';
import IconCollections from '../../public/img/icon-collections.svg';
import IconMore from '../../public/img/icon-more.svg';
import IconOurStory from '../../public/img/icon-our-story.svg';
import IconSearch from '../../public/img/icon-search.svg';

import getIntl from './getIntl';

export type INavigationItem = {
	key: string;
	href?: string;
	onClick?: (props: { popSubmenu: () => void }) => void;
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
					Icon: IconListAltLight,
					label: intl.formatMessage({
						id: `header__naveItemCollections-all`,
						defaultMessage: 'All Collections',
					}),
				},
				{
					key: 'sponsors',
					href: makeSponsorListRoute(languageRoute),
					Icon: IconUserPlus,
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
					Icon: IconUserLight,
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
					href: makeAboutPage(languageRoute, 123), // TODO
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
			key: 'blog',
			href: makeBlogPostListRoute(languageRoute),
			Icon: IconBlog,
			label: intl.formatMessage({
				id: `header__navItemBlog`,
				defaultMessage: 'Blog',
				description: `Header nav link name: Blog`,
			}),
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
						<DownloadAppButton menuAlignment="left" />
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
