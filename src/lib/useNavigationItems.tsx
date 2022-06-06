import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';

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
	makeSongAlbumsListRoute,
	makeSponsorListRoute,
	makeStoryAlbumListPage,
	makeTestimoniesRoute,
	makeTestimonySubmitRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export type INavigationItem = {
	key: string;
	href?: string;
	onClick?: (props: { popSubmenu: () => void }) => void;
	isDivider?: true;
	isTargetBlank?: true;
	Icon?: React.ComponentType;
	label: string;
	children?: INavigationItem[];
	childNode?: JSX.Element;
};

export function useNavigationItems(): INavigationItem[] {
	const router = useRouter();
	const intl = useIntl();
	const languageRoute = useLanguageRoute();

	return [
		{
			key: 'discover',
			href: makeDiscoverRoute(languageRoute),
			Icon: dynamic(() => import('@public/img/icons/icon-search.svg')),
			label: intl.formatMessage({
				id: `header__navItemDiscover`,
				defaultMessage: 'Discover',
				description: `Header nav link name: Discover`,
			}),
		},
		{
			key: 'library',
			href: makeLibraryRoute(languageRoute),
			Icon: dynamic(() => import('@public/img/icons/icon-books.svg')),
			label: intl.formatMessage({
				id: `header__navItemLibrary`,
				defaultMessage: 'Library',
				description: `Header nav link name: Library`,
			}),
			children: [
				{
					key: 'saved',
					href: makeLibraryRoute(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-bookmark.svg')),
					label: intl.formatMessage({
						id: `header__navItemLibrary-saved`,
						defaultMessage: 'Saved',
					}),
				},
				{
					key: 'playlists',
					href: makeLibraryRoute(languageRoute, 'playlists'),
					Icon: dynamic(() => import('@public/img/icons/fa-stream.svg')),
					label: intl.formatMessage({
						id: `header__navItemLibrary-playlists`,
						defaultMessage: 'Playlists',
					}),
				},
				{
					key: 'history',
					href: makeLibraryRoute(languageRoute, 'history'),
					Icon: dynamic(() => import('@public/img/icons/fa-history.svg')),
					label: intl.formatMessage({
						id: `header__navItemLibrary-history`,
						defaultMessage: 'History',
					}),
				},
			],
		},
		...(languageRoute === 'en'
			? [
					{
						key: 'bibles',
						href: makeBibleListRoute(languageRoute),
						Icon: dynamic(() => import('@public/img/icons/icon-bible.svg')),
						label: intl.formatMessage({
							id: `header__navItemBible`,
							defaultMessage: 'Bible',
							description: `Header nav link name: Bible`,
						}),
					},
			  ]
			: []),
		{
			key: 'collections',
			href: makeDiscoverCollectionsRoute(languageRoute),
			Icon: dynamic(() => import('@public/img/icons/icon-collections.svg')),
			label: intl.formatMessage({
				id: `header__navItemCollections`,
				defaultMessage: 'Collections',
				description: `Header nav link name: Collections`,
			}),
			children: [
				{
					key: 'all',
					href: makeDiscoverCollectionsRoute(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-list-alt.svg')),
					label: intl.formatMessage({
						id: `header__navItemCollections-all`,
						defaultMessage: 'All Collections',
					}),
				},
				{
					key: 'sponsors',
					href: makeSponsorListRoute(languageRoute),
					Icon: dynamic(
						() => import('@public/img/icons/fa-user-plus-heavy.svg')
					),
					label: intl.formatMessage({
						id: `header__navItemCollections-sponsors`,
						defaultMessage: 'Sponsors',
					}),
				},
				{
					key: 'conferences',
					href: makeConferenceListRoute(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-calendar.svg')),
					label: intl.formatMessage({
						id: `header__navItemCollections-conferences`,
						defaultMessage: 'Conferences',
					}),
				},
				{
					key: 'presenter',
					href: makePresenterListRoute(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-user-heavy.svg')),
					label: intl.formatMessage({
						id: `header__navItemCollections-presenters`,
						defaultMessage: 'Presenters',
					}),
				},
				{
					key: 'stories',
					href: makeStoryAlbumListPage(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-feather.svg')),
					label: intl.formatMessage({
						id: `header__navItemCollections-stories`,
						defaultMessage: 'Stories',
					}),
				},
				{
					key: 'books',
					href: makeAudiobookListRoute(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-book.svg')),
					label: intl.formatMessage({
						id: `header__navItemCollections-books`,
						defaultMessage: 'Books',
					}),
				},
				{
					key: 'songs',
					href: makeSongAlbumsListRoute(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-music.svg')),
					label: intl.formatMessage({
						id: `header__navItemCollections-songs`,
						defaultMessage: 'Scripture Songs',
					}),
				},
			],
		},
		{
			key: 'presenters',
			href: makePresenterListRoute(languageRoute),
			Icon: dynamic(() => import('@public/img/icons/icon-account.svg')),
			label: intl.formatMessage({
				id: `header__navItemPresenters`,
				defaultMessage: 'Presenters',
			}),
		},
		{
			key: 'story',
			href: makeAboutPage(languageRoute, 1),
			Icon: dynamic(() => import('@public/img/icons/icon-our-story.svg')),
			label: intl.formatMessage({
				id: `header__navItemStory`,
				defaultMessage: 'Our Story',
			}),
			children: [
				{
					key: 'about',
					href: makeAboutPage(languageRoute, 1),
					Icon: dynamic(() => import('@public/img/icons/fa-seedling.svg')),
					label: intl.formatMessage({
						id: `header__navItemStory`,
						defaultMessage: 'Our Story',
					}),
				},
				{
					key: 'meettheteam',
					href: makeAboutPage(languageRoute, 13),
					Icon: dynamic(() => import('@public/img/icons/fa-users-heavy.svg')),
					label: intl.formatMessage({
						id: `header__navItemStory-team`,
						defaultMessage: 'The Team',
					}),
				},
				{
					key: 'purpose',
					href: makeAboutPage(languageRoute, 7),
					Icon: dynamic(
						() => import('@public/img/icons/fa-bullseye-heavy.svg')
					),
					label: intl.formatMessage({
						id: `header__navItemStory-purpose`,
						defaultMessage: 'Our Purpose',
					}),
				},
				{
					key: 'spiritofav',
					href: makeAboutPage(languageRoute, 12),
					Icon: dynamic(() => import('@public/img/icons/fa-fire-heavy.svg')),
					label: intl.formatMessage({
						id: `header__navItemStory-spiritOfAudioVerse`,
						defaultMessage: 'Spirit of AudioVerse',
					}),
				},
				{
					key: 'blog',
					href: makeBlogPostListRoute(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-align-left.svg')),
					label: intl.formatMessage({
						id: `header__navItemStory-blog`,
						defaultMessage: 'Blog',
					}),
				},
				{
					key: 'testimonials',
					href: makeTestimoniesRoute(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-comment-heavy.svg')),
					label: intl.formatMessage({
						id: `header__navItemStory-testimonials`,
						defaultMessage: 'Testimonials',
					}),
				},
				{
					key: 'donate',
					href: makeDonateRoute(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-heart-heavy.svg')),
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
			Icon: dynamic(() => import('@public/img/icons/icon-contact.svg')),
			label: intl.formatMessage({
				id: `header__navItemContact`,
				defaultMessage: 'Contact',
			}),
			children: [
				{
					key: 'general',
					href: makeContactRoute(languageRoute, '/general'),
					Icon: dynamic(() => import('@public/img/icons/fa-inbox.svg')),
					label: intl.formatMessage({
						id: `header__navItemContact-general`,
						defaultMessage: 'General Contact',
					}),
				},
				{
					key: 'support',
					href: makeContactRoute(languageRoute, '/support'),
					Icon: dynamic(() => import('@public/img/icons/fa-comment-heavy.svg')),
					label: intl.formatMessage({
						id: `header__navItemContact-support`,
						defaultMessage: 'Request Support',
					}),
				},
				{
					key: 'testimony',
					href: makeTestimonySubmitRoute(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-comment-heavy.svg')),
					label: intl.formatMessage({
						id: `header__navItemContact-testimonial`,
						defaultMessage: 'Share Testimonial',
					}),
				},
				{
					key: 'divider',
					label: '',
					isDivider: true,
				},
				{
					key: 'facebook',
					href: 'https://www.facebook.com/AudioVerse',
					Icon: dynamic(() => import('@public/img/icons/fa-facebook.svg')),
					label: intl.formatMessage({
						id: `header__navItemContact-facebook`,
						defaultMessage: 'Facebook',
					}),
					isTargetBlank: true,
				},
				{
					key: 'instagram',
					href: 'https://www.instagram.com/audioverse/',
					Icon: dynamic(() => import('@public/img/icons/fa-instagram.svg')),
					label: intl.formatMessage({
						id: `header__navItemContact-instagram`,
						defaultMessage: 'Instagram',
					}),
					isTargetBlank: true,
				},
				{
					key: 'twitter',
					href: 'https://www.twitter.com/audioverse/',
					Icon: dynamic(() => import('@public/img/icons/fa-twitter.svg')),
					label: intl.formatMessage({
						id: `header__navItemContact-twitter`,
						defaultMessage: 'Twitter',
					}),
					isTargetBlank: true,
				},
				{
					key: 'youtube',
					href: 'https://www.youtube.com/user/AudioVerseMinistry',
					Icon: dynamic(() => import('@public/img/icons/fa-youtube.svg')),
					label: intl.formatMessage({
						id: `header__navItemContact-youtube`,
						defaultMessage: 'YouTube',
					}),
					isTargetBlank: true,
				},
			],
		},
		{
			key: 'more',
			Icon: dynamic(() => import('@public/img/icons/icon-more.svg')),
			label: intl.formatMessage({
				id: `header__navItemMore`,
				defaultMessage: 'More',
				description: `Header nav link name: More`,
			}),
			children: [
				{
					key: 'help',
					href: 'https://help.audioverse.org/',
					isTargetBlank: true,
					Icon: dynamic(
						() => import('@public/img/icons/fa-question-circle.svg')
					),
					label: intl.formatMessage({
						id: `header__navItemMore-help`,
						defaultMessage: 'Get Help',
					}),
				},
				{
					key: 'store',
					href: 'https://audioversestore.org',
					isTargetBlank: true,
					Icon: dynamic(() => import('@public/img/icons/fa-store.svg')),
					label: intl.formatMessage({
						id: `header__navItemMore-store`,
						defaultMessage: 'AudioVerse Store',
					}),
				},
				{
					key: 'ju',
					href: 'https://journeysunscripted.com/',
					isTargetBlank: true,
					Icon: dynamic(() => import('@public/img/icons/fa-link.svg')),
					label: intl.formatMessage({
						id: `header__navItemMore-ju`,
						defaultMessage: 'Journeys Unscripted',
					}),
				},
				{
					key: 'swj',
					href: 'https://startingwithjesus.com/',
					isTargetBlank: true,
					Icon: dynamic(() => import('@public/img/icons/fa-link.svg')),
					label: intl.formatMessage({
						id: `header__navItemMore-swj`,
						defaultMessage: 'Starting With Jesus',
					}),
				},
				{
					key: 'legal',
					href: makeAboutPage(languageRoute, 3),
					Icon: dynamic(
						() => import('@public/img/icons/fa-landmark-heavy.svg')
					),
					label: intl.formatMessage({
						id: `header__navItemMore-legal`,
						defaultMessage: 'Legal',
					}),
				},
				{
					key: 'privacy',
					href: makeAboutPage(languageRoute, 4),
					Icon: dynamic(() => import('@public/img/icons/fa-lock-heavy.svg')),
					label: intl.formatMessage({
						id: `header__navItemMore-privacy`,
						defaultMessage: 'Privacy',
					}),
				},
				{
					key: 'terms',
					href: makeAboutPage(languageRoute, 5),
					Icon: dynamic(
						() => import('@public/img/icons/fa-newspaper-heavy.svg')
					),
					label: intl.formatMessage({
						id: `header__navItemMore-terms`,
						defaultMessage: 'Terms of Use',
					}),
				},
			],
			childNode: (
				<>
					<li>
						<LanguageButton
							buttonType="secondary"
							onClick={(url) => router.push(`/${url}/`)}
						/>
					</li>
					<li>
						<DownloadAppButton
							buttonType="secondary"
							menuAlignment="left"
							id="useNavigationItems-downloadApp"
						/>
					</li>
				</>
			),
		},
		{
			key: 'account',
			label: intl.formatMessage({
				id: `header__navItemUser`,
				defaultMessage: 'User Settings',
				description: `Header nav link name: User Settings`,
			}),
			children: [
				{
					key: 'profile',
					href: makeAccountProfileRoute(languageRoute),
					Icon: dynamic(() => import('@public/img/icons/fa-user-heavy.svg')),
					label: intl.formatMessage({
						id: `header__navItemUser-profile`,
						defaultMessage: 'Profile',
					}),
				},
				{
					key: 'logout',
					href: makeLogoutRoute(languageRoute),
					onClick: ({ popSubmenu }) => popSubmenu(),
					Icon: dynamic(() => import('@public/img/icons/icon-sign-out.svg')),
					label: intl.formatMessage({
						id: `header__navItemUser-logout`,
						defaultMessage: 'Log Out',
					}),
				},
			],
		},
	];
}
