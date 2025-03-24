import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext, useMemo } from 'react';
import { useIntl } from 'react-intl';

import DownloadAppButton from '~components/molecules/downloadAppButton';
import LanguageButton from '~components/molecules/languageButton';
import root from '~lib/routes';
import { CollectionContentType } from '~src/__generated__/graphql';
import { PlaybackContext } from '~src/components/templates/andPlaybackContext';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';

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

// We use the spread operator because next/dynamic requires an object
// literal.
// WORKAROUND: https://nextjs.org/docs/messages/invalid-dynamic-options-type
const opts = {
	ssr: false,
};

const iconMap = {
	icon_search: dynamic(() => import('~public/img/icons/icon-search.svg'), {
		...opts,
	}),
	icon_books: dynamic(() => import('~public/img/icons/icon-books.svg'), {
		...opts,
	}),
	fa_bookmark: dynamic(() => import('~public/img/icons/fa-bookmark.svg'), {
		...opts,
	}),
	fa_stream: dynamic(() => import('~public/img/icons/fa-stream.svg'), {
		...opts,
	}),
	fa_history: dynamic(() => import('~public/img/icons/fa-history.svg'), {
		...opts,
	}),
	icon_bible: dynamic(() => import('~public/img/icons/icon-bible.svg'), {
		...opts,
	}),
	icon_collections: dynamic(
		() => import('~public/img/icons/icon-collections.svg'),
		{ ...opts },
	),
	fa_list_alt: dynamic(() => import('~public/img/icons/fa-list-alt.svg'), {
		...opts,
	}),
	fa_user_plus_heavy: dynamic(
		() => import('~public/img/icons/fa-user-plus-heavy.svg'),
		{ ...opts },
	),
	fa_calendar: dynamic(() => import('~public/img/icons/fa-calendar.svg'), {
		...opts,
	}),
	fa_user_heavy: dynamic(() => import('~public/img/icons/fa-user-heavy.svg'), {
		...opts,
	}),
	fa_feather: dynamic(() => import('~public/img/icons/fa-feather.svg'), {
		...opts,
	}),
	fa_book: dynamic(() => import('~public/img/icons/fa-book.svg'), { ...opts }),
	fa_music: dynamic(() => import('~public/img/icons/fa-music.svg'), {
		...opts,
	}),
	icon_account: dynamic(() => import('~public/img/icons/icon-account.svg'), {
		...opts,
	}),
	icon_our_story: dynamic(
		() => import('~public/img/icons/icon-our-story.svg'),
		{ ...opts },
	),
	fa_seedling: dynamic(() => import('~public/img/icons/fa-seedling.svg'), {
		...opts,
	}),
	fa_users_heavy: dynamic(
		() => import('~public/img/icons/fa-users-heavy.svg'),
		{ ...opts },
	),
	fa_bullseye_heavy: dynamic(
		() => import('~public/img/icons/fa-bullseye-heavy.svg'),
		{ ...opts },
	),
	fa_fire_heavy: dynamic(() => import('~public/img/icons/fa-fire-heavy.svg'), {
		...opts,
	}),
	fa_align_left: dynamic(() => import('~public/img/icons/fa-align-left.svg'), {
		...opts,
	}),
	fa_comment_heavy: dynamic(
		() => import('~public/img/icons/fa-comment-heavy.svg'),
		{ ...opts },
	),
	fa_heart_heavy: dynamic(
		() => import('~public/img/icons/fa-heart-heavy.svg'),
		{ ...opts },
	),
	icon_contact: dynamic(() => import('~public/img/icons/icon-contact.svg'), {
		...opts,
	}),
	fa_inbox: dynamic(() => import('~public/img/icons/fa-inbox.svg'), {
		...opts,
	}),
	fa_facebook: dynamic(() => import('~public/img/icons/fa-facebook.svg'), {
		...opts,
	}),
	fa_instagram: dynamic(() => import('~public/img/icons/fa-instagram.svg'), {
		...opts,
	}),
	fa_twitter: dynamic(() => import('~public/img/icons/fa-twitter.svg'), {
		...opts,
	}),
	fa_youtube: dynamic(() => import('~public/img/icons/fa-youtube.svg'), {
		...opts,
	}),
	icon_more: dynamic(() => import('~public/img/icons/icon-more.svg'), {
		...opts,
	}),
	fa_question_circle: dynamic(
		() => import('~public/img/icons/fa-question-circle.svg'),
		{ ...opts },
	),
	fa_link: dynamic(() => import('~public/img/icons/fa-link.svg'), { ...opts }),
	fa_landmark_heavy: dynamic(
		() => import('~public/img/icons/fa-landmark-heavy.svg'),
		{ ...opts },
	),
	fa_lock_heavy: dynamic(() => import('~public/img/icons/fa-lock-heavy.svg'), {
		...opts,
	}),
	fa_newspaper_heavy: dynamic(
		() => import('~public/img/icons/fa-newspaper-heavy.svg'),
		{ ...opts },
	),
	icon_sign_out: dynamic(() => import('~public/img/icons/icon-sign-out.svg'), {
		...opts,
	}),
	fa_store: dynamic(() => import('~public/img/icons/fa-store.svg'), {
		...opts,
	}),
	fa_layer_group: dynamic(
		() => import('~public/img/icons/fa-layer-group.svg'),
		{ ...opts },
	),
};

export function useNavigationItems(): INavigationItem[] {
	const router = useRouter();
	const intl = useIntl();
	const languageRoute = useLanguageRoute();
	const context = useContext(PlaybackContext);
	const loadedRecording = context.getRecording();

	const [collectionId, collectionTitle] = useMemo(() => {
		const c = loadedRecording?.collection;
		const isVersion = c?.contentType === CollectionContentType.BibleVersion;
		if (!isVersion) return [null, null];
		return [c.id, c.title];
	}, [loadedRecording?.collection]);

	const biblesUrl = useMemo(() => {
		if (!collectionId) return root.lang(languageRoute).bibles.get();
		return root
			.lang(languageRoute)
			.bibles.versionId(collectionId)
			.versionTitle(collectionTitle)
			.get();
	}, [collectionId, collectionTitle, languageRoute]);

	return [
		{
			key: 'discover',
			href: root.lang(languageRoute).discover.get(),
			Icon: iconMap.icon_search,
			label: intl.formatMessage({
				id: `header__navItemDiscover`,
				defaultMessage: 'Discover',
				description: `Header nav link name: Discover`,
			}),
		},
		{
			key: 'collections',
			href: root.lang(languageRoute).discover.collections.get(),
			Icon: iconMap.icon_collections,
			label: intl.formatMessage({
				id: `header__navItemBrowse`,
				defaultMessage: 'Browse',
				description: `Header nav link name: Browse`,
			}),
			children: [
				{
					key: 'all',
					href: root.lang(languageRoute).discover.collections.get(),
					Icon: iconMap.fa_list_alt,
					label: intl.formatMessage({
						id: `header__navItemCollections-all`,
						defaultMessage: 'All Collections',
					}),
				},
				{
					key: 'sponsors',
					href: root.lang(languageRoute).sponsors.get(),
					Icon: iconMap.fa_user_plus_heavy,
					label: intl.formatMessage({
						id: `header__navItemCollections-sponsors`,
						defaultMessage: 'Sponsors',
					}),
				},
				{
					key: 'conferences',
					href: root.lang(languageRoute).conferences.get(),
					Icon: iconMap.fa_calendar,
					label: intl.formatMessage({
						id: `header__navItemCollections-conferences`,
						defaultMessage: 'Conferences',
					}),
				},
				{
					key: 'presenter',
					href: root.lang(languageRoute).presenters.get(),
					Icon: iconMap.fa_user_heavy,
					label: intl.formatMessage({
						id: `header__navItemCollections-presenters`,
						defaultMessage: 'Presenters',
					}),
				},
				{
					key: 'topics',
					href: root.lang(languageRoute).topics.get(),
					Icon: iconMap.fa_layer_group,
					label: intl.formatMessage({
						id: `header__navItemCollections-topics`,
						defaultMessage: 'Topics',
					}),
				},
				{
					key: 'stories',
					href: root.lang(languageRoute).stories.albums.get(),
					Icon: iconMap.fa_seedling,
					label: intl.formatMessage({
						id: `header__navItemCollections-stories`,
						defaultMessage: 'Stories',
					}),
				},
				{
					key: 'egwbooks',
					href: root.lang(languageRoute).egwbooks.get(),
					Icon: iconMap.fa_feather,
					label: intl.formatMessage({
						id: `header__navItemCollections-egwbooks`, //egw
						defaultMessage: 'Ellen White',
					}),
				},
				{
					key: 'books',
					href: root.lang(languageRoute).books.get(),
					Icon: iconMap.fa_book,
					label: intl.formatMessage({
						id: `header__navItemCollections-books`,
						defaultMessage: 'Books',
					}),
				},

				{
					key: 'songs',
					href: root.lang(languageRoute).songs.albums.get(),
					Icon: iconMap.fa_music,
					label: intl.formatMessage({
						id: `header__navItemCollections-songs`,
						defaultMessage: 'Scripture Songs',
					}),
				},
			],
		},
		...(languageRoute === 'en'
			? [
					{
						key: 'bibles',
						href: biblesUrl,
						Icon: iconMap.icon_bible,
						label: intl.formatMessage({
							id: `header__navItemBible`,
							defaultMessage: 'Bible',
							description: `Header nav link name: Bible`,
						}),
					},
				]
			: []),
		{
			key: 'library',
			href: root.lang(languageRoute).library.get(),
			Icon: iconMap.icon_books,
			label: intl.formatMessage({
				id: `header__navItemLibrary`,
				defaultMessage: 'Library',
				description: `Header nav link name: Library`,
			}),
			children: [
				{
					key: 'saved',
					href: root.lang(languageRoute).library.get(),
					Icon: iconMap.fa_bookmark,
					label: intl.formatMessage({
						id: `header__navItemLibrary-listenLater`,
						defaultMessage: 'Listen Later',
					}),
				},
				{
					key: 'playlists',
					href: root.lang(languageRoute).library.playlists().get(),
					Icon: iconMap.fa_stream,
					label: intl.formatMessage({
						id: `header__navItemLibrary-playlists`,
						defaultMessage: 'Playlists',
					}),
				},
				{
					key: 'history',
					href: root.lang(languageRoute).library.history.get(),
					Icon: iconMap.fa_history,
					label: intl.formatMessage({
						id: `header__navItemLibrary-history`,
						defaultMessage: 'History',
					}),
				},
			],
		},
		{
			key: 'presenters',
			href: root.lang(languageRoute).presenters.get(),
			Icon: iconMap.icon_account,
			label: intl.formatMessage({
				id: `header__navItemPresenters`,
				defaultMessage: 'Presenters',
			}),
		},
		{
			key: 'story',
			href: root.lang(languageRoute).about.id(1).get(),
			Icon: iconMap.icon_our_story,
			label: intl.formatMessage({
				id: `header__navItemStory`,
				defaultMessage: 'Our Story',
			}),
			children: [
				{
					key: 'about',
					href: root.lang(languageRoute).about.id(1).get(),
					Icon: iconMap.fa_seedling,
					label: intl.formatMessage({
						id: `header__navItemStory`,
						defaultMessage: 'Our Story',
					}),
				},
				// {
				// 	key: 'meettheteam',
				// 	href: root.lang(languageRoute).about.id(13).get(),
				// 	Icon: iconMap.fa_users_heavy,
				// 	label: intl.formatMessage({
				// 		id: `header__navItemStory-team`,
				// 		defaultMessage: 'The Team',
				// 	}),
				// },
				{
					key: 'purpose',
					href: root.lang(languageRoute).about.id(7).get(),
					Icon: iconMap.fa_bullseye_heavy,
					label: intl.formatMessage({
						id: `header__navItemStory-purpose`,
						defaultMessage: 'Our Purpose',
					}),
				},
				{
					key: 'spiritofav',
					href: root.lang(languageRoute).about.id(12).get(),
					Icon: iconMap.fa_fire_heavy,
					label: intl.formatMessage({
						id: `header__navItemStory-spiritOfAudioVerse`,
						defaultMessage: 'Spirit of AudioVerse',
					}),
				},
				{
					key: 'blog',
					href: root.lang(languageRoute).blog.get(),
					Icon: iconMap.fa_align_left,
					label: intl.formatMessage({
						id: `header__navItemStory-blog`,
						defaultMessage: 'Blog',
					}),
				},
				{
					key: 'testimonials',
					href: root.lang(languageRoute).testimonies.get(),
					Icon: iconMap.fa_comment_heavy,
					label: intl.formatMessage({
						id: `header__navItemStory-testimonials`,
						defaultMessage: 'Testimonials',
					}),
				},
				{
					key: 'donate',
					href: root.lang(languageRoute).give.get(),
					Icon: iconMap.fa_heart_heavy,
					label: intl.formatMessage({
						id: `header__navItemStory-donate`,
						defaultMessage: 'Donate',
					}),
				},
			],
		},
		{
			key: 'contact',
			href: root.lang(languageRoute).contact.get(),
			Icon: iconMap.icon_contact,
			label: intl.formatMessage({
				id: `header__navItemContact`,
				defaultMessage: 'Contact',
			}),
			children: [
				{
					key: 'general',
					href: root.lang(languageRoute).contact.general.get(),
					Icon: iconMap.fa_inbox,
					label: intl.formatMessage({
						id: `header__navItemContact-general`,
						defaultMessage: 'General Contact',
					}),
				},
				{
					key: 'support',
					href: root.lang(languageRoute).contact.support.get(),
					Icon: iconMap.fa_comment_heavy,
					label: intl.formatMessage({
						id: `header__navItemContact-support`,
						defaultMessage: 'Request Support',
					}),
				},
				{
					key: 'testimony',
					href: root.lang(languageRoute).contact.testimonies.get(),
					Icon: iconMap.fa_comment_heavy,
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
					Icon: iconMap.fa_facebook,
					label: intl.formatMessage({
						id: `header__navItemContact-facebook`,
						defaultMessage: 'Facebook',
					}),
					isTargetBlank: true,
				},
				{
					key: 'instagram',
					href: 'https://www.instagram.com/audioverse',
					Icon: iconMap.fa_instagram,
					label: intl.formatMessage({
						id: `header__navItemContact-instagram`,
						defaultMessage: 'Instagram',
					}),
					isTargetBlank: true,
				},
				{
					key: 'twitter',
					href: 'https://www.x.com/audioverse',
					Icon: iconMap.fa_twitter,
					label: intl.formatMessage({
						id: `header__navItemContact-twitter`,
						defaultMessage: 'Twitter',
					}),
					isTargetBlank: true,
				},
				{
					key: 'youtube',
					href: 'https://www.youtube.com/user/AudioVerseMinistry',
					Icon: iconMap.fa_youtube,
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
			Icon: iconMap.icon_more,
			label: intl.formatMessage({
				id: `header__navItemMore`,
				defaultMessage: 'More',
				description: `Header nav link name: More`,
			}),
			children: [
				{
					key: 'help',
					href: 'https://help.audioverse.org',
					isTargetBlank: true,
					Icon: iconMap.fa_question_circle,
					label: intl.formatMessage({
						id: `header__navItemMore-help`,
						defaultMessage: 'Get Help',
					}),
				},
				{
					key: 'sharingtools',
					href: 'https://share.audioverse.org/',
					isTargetBlank: true,
					Icon: iconMap.fa_link,
					label: intl.formatMessage({
						id: `header__navItemMore-sharingtools`,
						defaultMessage: 'Sharing Tools',
					}),
				},
				{
					key: 'store',
					href: 'https://audioversestore.org',
					isTargetBlank: true,
					Icon: iconMap.fa_store,
					label: intl.formatMessage({
						id: `header__navItemMore-store`,
						defaultMessage: 'AudioVerse Store',
					}),
				},
				{
					key: 'ju',
					href: 'https://journeysunscripted.com/',
					isTargetBlank: true,
					Icon: iconMap.fa_link,
					label: intl.formatMessage({
						id: `header__navItemMore-ju`,
						defaultMessage: 'Journeys Unscripted',
					}),
				},
				{
					key: 'swj',
					href: 'https://startingwithjesus.com/',
					isTargetBlank: true,
					Icon: iconMap.fa_link,
					label: intl.formatMessage({
						id: `header__navItemMore-swj`,
						defaultMessage: 'Starting With Jesus',
					}),
				},
				{
					key: 'legal',
					href: root.lang(languageRoute).about.id(3).get(),
					Icon: iconMap.fa_landmark_heavy,
					label: intl.formatMessage({
						id: `header__navItemMore-legal`,
						defaultMessage: 'Legal',
					}),
				},
				{
					key: 'privacy',
					href: root.lang(languageRoute).about.id(4).get(),
					Icon: iconMap.fa_lock_heavy,
					label: intl.formatMessage({
						id: `header__navItemMore-privacy`,
						defaultMessage: 'Privacy',
					}),
				},
				{
					key: 'terms',
					href: root.lang(languageRoute).about.id(5).get(),
					Icon: iconMap.fa_newspaper_heavy,
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
					href: root.lang(languageRoute).account.get(),
					Icon: iconMap.fa_user_heavy,
					label: intl.formatMessage({
						id: `header__navItemUser-profile`,
						defaultMessage: 'Profile',
					}),
				},
				{
					key: 'logout',
					href: root.lang(languageRoute).account.logout.get(),
					onClick: ({ popSubmenu }) => popSubmenu(),
					Icon: iconMap.icon_sign_out,
					label: intl.formatMessage({
						id: `header__navItemUser-logout`,
						defaultMessage: 'Log Out',
					}),
				},
			],
		},
	];
}
