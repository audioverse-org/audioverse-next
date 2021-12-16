import { act, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import * as intl from 'react-intl';

import Login from '@components/molecules/login';
import PersonLockup from '@components/molecules/personLockup';
import Player from '@components/molecules/player';
import PlaylistButton from '@components/molecules/playlistButton';
import RecordingButtonFavorite from '@components/molecules/recordingButtonFavorite';
import SearchBar from '@components/molecules/searchBar';
import TeaseRecording from '@components/molecules/teaseRecording';
import Transcript from '@components/molecules/transcript';
import Header from '@components/organisms/header';
import Navigation from '@components/organisms/navigation';
import AccountPlaylists from '@containers/account/playlists';
import Profile from '@containers/account/profile';
import profile from '@containers/account/profile';
import Register from '@containers/account/register';
import Reset from '@containers/account/reset';
import AudiobooksList from '@containers/audiobook/list';
import Book from '@containers/bible/book';
import CollectionDetail from '@containers/collection/detail';
import CollectionList from '@containers/collection/list';
import Home from '@containers/home';
import Presenters from '@containers/presenter/list';
import PresenterRecordings from '@containers/presenter/recordings';
import SeriesDetail from '@containers/series/detail';
import SeriesList from '@containers/series/list';
import SermonDetail, { SermonDetailProps } from '@containers/sermon/detail';
import SermonList from '@containers/sermon/list';
import SongList from '@containers/song/albums/list';
import SponsorConferences from '@containers/sponsor/conferences';
import Sponsors from '@containers/sponsor/list';
import SponsorSeries from '@containers/sponsor/series';
import SponsorTeachings from '@containers/sponsor/teachings';
import StoryAlbumsList from '@containers/story/albums/list';
import * as api from '@lib/api';
import { useIsRecordingFavorited } from '@lib/api';
import { BaseColors } from '@lib/constants';
import {
	CollectionContentType,
	GetWithAuthGuardDataDocument,
	Language,
	RecordingContentType,
	SequenceContentType,
} from '@lib/generated/graphql';
import { getLanguageDisplayNames } from '@lib/getLanguageDisplayNames';
import { readableBytes } from '@lib/readableBytes';
import {
	loadAuthGuardData,
	loadRouter,
	makePlaylistButtonData,
	mockedFetchApi,
	renderWithQueryProvider,
} from '@lib/test/helpers';
import { useFormattedDuration } from '@lib/time';
import Logout from '@pages/[language]/account/logout';

jest.mock('react-intl');
jest.mock('@lib/readableBytes');
jest.mock('@lib/time');
jest.mock('@lib/api/useLogout');
jest.mock('@lib/api/useIsRecordingFavorited');

const expectNoUnlocalizedText = (
	screen: RenderResult,
	whitelist: string[] = []
) => {
	const {
		queryAllByText,
		queryAllByAltText,
		queryAllByPlaceholderText,
		queryAllByLabelText,
	} = screen;
	const r = /[^z\d\W\s]+/;
	const languageNames = getLanguageDisplayNames();
	const whitelist_ = [...languageNames, ...whitelist];
	const m = (c: string) => !!c.match(r) && !whitelist_.includes(c);
	const hits = [
		...queryAllByText(m),
		...queryAllByAltText(m),
		...queryAllByPlaceholderText(m),
		...queryAllByLabelText(m),
	];

	expect(hits).toHaveLength(0);
};

const expectNoUnlocalizedMessages = async <T,>(
	Component: React.ComponentType<T>,
	data: { [key: string]: any },
	whitelist: string[] = []
) => {
	const screen = await renderWithQueryProvider(
		<Component {...(data as any)} />
	);

	expectNoUnlocalizedText(screen, whitelist);
};

const toLocaleStringBackup = global.Date.prototype.toLocaleString;

describe('localization usage', () => {
	beforeEach(() => {
		jest.resetAllMocks();

		(intl.FormattedMessage as any) = jest.fn().mockReturnValue('z');

		const formatter = jest.fn();
		formatter.mockReturnValue('z');
		jest.spyOn(intl, 'useIntl').mockReturnValue({
			formatMessage: formatter,
		} as any);
		jest.spyOn(intl, 'createIntl').mockReturnValue({
			formatMessage: formatter,
		} as any);

		(readableBytes as jest.Mock).mockReturnValue('z');
		(useFormattedDuration as jest.Mock).mockReturnValue('z');
	});

	beforeAll(() => {
		global.Date.prototype.toLocaleString = jest.fn(() => 'z');
	});

	afterAll(() => {
		global.Date.prototype.toLocaleString = toLocaleStringBackup;
	});

	it('localizes playlistButton logged out', async () => {
		const screen = await renderWithQueryProvider(
			<PlaylistButton recordingId="recording_id" />
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes playlistButton logged in', async () => {
		mockedFetchApi.mockResolvedValue(makePlaylistButtonData([]));

		const screen = await renderWithQueryProvider(
			<PlaylistButton recordingId="recording_id" />
		);

		await waitFor(() => expect(mockedFetchApi).toHaveBeenCalled());

		expectNoUnlocalizedText(screen);
	});

	it('localizes personLockup', async () => {
		const screen = await renderWithQueryProvider(
			<PersonLockup
				person={{
					name: 'z',
					canonicalPath: 'z',
					imageWithFallback: {
						url: 'z',
					},
				}}
				textColor={BaseColors.DARK}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes sermon detail page', async () => {
		jest.spyOn(api, 'useIsRecordingFavorited').mockReturnValue({
			isFavorited: false,
			isLoading: false,
			toggleFavorited: {} as any,
		});
		const screen = await renderWithQueryProvider(
			<SermonDetail
				recording={
					{
						contentType: RecordingContentType.Sermon,
						description: 'z',
						recordingDate: '2003-03-01T09:30:00.000Z',
						recordingTags: {
							nodes: [
								{
									tag: {
										id: 'z',
										name: 'z',
									},
								},
							],
						},
						attachments: [
							{
								filename: 'z',
								url: 'z',
							},
						],
						sequenceIndex: 1,
						sequence: {
							contentType: SequenceContentType.Series,
							canonicalPath: 'z',
							recordings: {
								nodes: [
									{ id: 1, canonicalPath: 'z', persons: [] },
									{ id: 2, canonicalPath: 'z', persons: [] },
									{ id: 3, canonicalPath: 'z', persons: [] },
								] as any,
							},
						},
						speakers: [] as any,
						imageWithFallback: { url: '' },
					} as SermonDetailProps['recording']
				}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes Unfavorite button', async () => {
		jest.spyOn(api, 'useIsRecordingFavorited').mockReturnValue({
			isFavorited: false,
			isLoading: false,
			toggleFavorited: {} as any,
		});

		const screen = await renderWithQueryProvider(
			<RecordingButtonFavorite
				id="recording_id"
				backgroundColor={BaseColors.WHITE}
			/>
		);

		await waitFor(() => expect(useIsRecordingFavorited).toBeCalled());

		expectNoUnlocalizedText(screen);
	});

	it('localizes header', async () => {
		const screen = await renderWithQueryProvider(<Header />);

		expectNoUnlocalizedText(screen, ['AudioVerse']);
	});

	it('localizes navigation', async () => {
		loadRouter({
			asPath: '',
		});
		const screen = await renderWithQueryProvider(
			<Navigation
				onExit={() => void 0}
				searchTerm=""
				onSearchChange={() => void 0}
			/>
		);

		expectNoUnlocalizedText(screen, ['AudioVerse']);
	});

	it('localizes Bible book page', async () => {
		jest.spyOn(api, 'useIsRecordingFavorited').mockReturnValue({
			isFavorited: false,
			isLoading: false,
			toggleFavorited: {} as any,
		});

		const screen = await renderWithQueryProvider(
			<Book
				version={{} as any}
				book={{} as any}
				chapters={{} as any}
				chapterNumber="1"
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes audiobooks list page', async () => {
		const screen = await renderWithQueryProvider(
			<AudiobooksList
				nodes={[
					{
						id: 'z',
						title: 'z',
						canonicalPath: 'z',
						contentType: SequenceContentType.Audiobook,
						sequenceWriters: { nodes: [] },
						allRecordings: {},
					} as any,
				]}
				pagination={{ total: 1, current: 1 }}
				data={undefined as any}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes story albums list page', async () => {
		const screen = await renderWithQueryProvider(
			<StoryAlbumsList
				nodes={[
					{
						id: 'the_story_id',
						canonicalPath: '/the_story_path',
						duration: 100,
						contentType: SequenceContentType.StorySeason,
						speakers: [],
						allRecordings: {
							aggregate: {
								count: 0,
							},
						},
					} as any,
				]}
				pagination={undefined as any}
				data={undefined as any}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes songs list page', async () => {
		const screen = await renderWithQueryProvider(
			<SongList
				musicAlbums={{ nodes: [], aggregate: { count: 0 } }}
				musicBookTags={{ nodes: [] }}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes conferences list page', async () => {
		const screen = await renderWithQueryProvider(
			<CollectionList
				nodes={
					[
						{
							id: 'z',
							canonicalPath: '/conference_path',
							allSequences: { aggregate: { count: 0 } },
							allRecordings: { aggregate: { count: 0 } },
						},
					] as any
				}
				pagination={undefined as any}
				data={undefined as any}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes conference detail page', async () => {
		const screen = await renderWithQueryProvider(
			<CollectionDetail
				collection={{
					id: '123',
					title: 'z',
					contentType: CollectionContentType.Conference,
					description: '',
					duration: 123.4,
					image: null,
					location: '',
					startDate: null,
					endDate: null,
					canonicalUrl: '',
					language: Language.English,
					shareUrl: '',
					sequences: {
						aggregate: {
							count: 0,
						},
						nodes: [],
						pageInfo: {
							hasNextPage: false,
						},
					},
					persons: {
						aggregate: {
							count: 0,
						},
						nodes: [],
						pageInfo: {
							hasNextPage: false,
						},
					},
					sponsor: {
						id: '234',
						title: 'z',
						canonicalPath: '...',
						imageWithFallback: {
							url: '',
						},
					},
					recordings: {
						aggregate: {
							count: 0,
						},
						nodes: [],
						pageInfo: {
							hasNextPage: false,
						},
					},
				}}
				__typename="Query"
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes presenter list page', async () => {
		const screen = await renderWithQueryProvider(
			<Presenters
				persons={
					[
						{
							id: 'z',
							surname: 'z',
							canonicalPath: '/presenter_path',
							recordings: {
								aggregate: {
									count: 0,
								},
							},
						},
					] as any
				}
				personLetterCounts={[]}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes presenter recordings page', async () => {
		jest.spyOn(api, 'useIsRecordingFavorited').mockReturnValue({
			isFavorited: false,
			isLoading: false,
			toggleFavorited: {} as any,
		});
		const screen = await renderWithQueryProvider(
			<PresenterRecordings
				nodes={
					[
						{
							id: 'id',
							canonicalPath: 'the_recording_path',
							recordingContentType: RecordingContentType.Sermon,
							persons: [],
						},
					] as any
				}
				data={
					{
						person: { name: 'z', imageWithFallback: { url: '' } },
					} as any
				}
				pagination={undefined as any}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes sponsor list page', async () => {
		const screen = await renderWithQueryProvider(
			<Sponsors
				nodes={[
					{
						id: 'z',
						title: 'z',
						canonicalPath: 'the_path',
						imageWithFallback: {
							url: 'z',
						},
						collections: {
							aggregate: {
								count: 1,
							},
						},
					} as any,
				]}
				{...({ sponsorLetterCounts: [] } as any)}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	type Scenario = [React.ComponentType<any>, any, string[]?];

	const scenarios: Scenario[] = [
		[
			SponsorTeachings,
			{
				nodes: [
					{
						id: 'z',
						canonicalPath: 'z',
						recordingContentType: RecordingContentType.Sermon,
						persons: [],
					},
				],
				data: {
					sponsor: {
						imageWithFallback: {
							url: 'z',
						},
					},
				},
			},
		],
		[
			SponsorConferences,
			{
				nodes: [
					{
						id: 'z',
						canonicalPath: 'z',
						allSequences: { aggregate: { count: 0 } },
						allRecordings: { aggregate: { count: 0 } },
					},
				],
				data: {
					sponsor: {
						imageWithFallback: {
							url: 'z',
						},
					},
				},
			},
		],
		[
			SponsorSeries,
			{
				nodes: [
					{
						id: 'z',
						canonicalPath: 'z',
						contentType: SequenceContentType.Series,
						speakers: [],
						allRecordings: { aggregate: { count: 0 } },
					},
				],
				data: {
					sponsor: {
						imageWithFallback: {
							url: 'z',
						},
					},
				},
			},
		],
		[
			SeriesList,
			{
				nodes: [
					{
						id: 'z',
						canonicalPath: 'the_path',
						contentType: SequenceContentType.Series,
						speakers: [],
						allRecordings: { aggregate: { count: 0 } },
					},
				],
			},
		],
		[
			SeriesDetail,
			{
				sequence: {
					id: 'z',
					canonicalPath: 'z',
					contentType: SequenceContentType.Series,
					recordings: { aggregate: { count: 0 } },
				},
			},
		],
		[Register, {}],
		[Login, {}],
		[Reset, {}],
		[profile, {}],
		[Home, {}, ['Genesis 1', 'King James Version']],
		[
			Player,
			{
				recording: {},
			},
		],
		[SearchBar, {}],
		[
			TeaseRecording,
			{
				recording: {
					canonicalPath: '',
					persons: [],
					sequenceIndex: 1,
					sequence: {
						recordings: {
							aggregate: {
								count: 3,
							},
						},
					},
				},
			},
		],
		[Transcript, {}],
		[
			SermonList,
			{
				nodes: [
					{
						id: 1,
						canonicalPath: 'the_path',
						recordingContentType: RecordingContentType.Sermon,
						persons: [],
					},
				],
				pagination: { current: 1, total: 10 },
			},
		],
	];

	scenarios.map((s: Scenario, i: number) => {
		it(`Localizes scenario index ${i}`, async () => {
			jest.spyOn(api, 'useIsRecordingFavorited').mockReturnValue({
				isFavorited: false,
				isLoading: false,
				toggleFavorited: {} as any,
			});
			await expectNoUnlocalizedMessages(...s);
		});
	});

	it('localizes profile page', async () => {
		loadAuthGuardData();

		const screen = await renderWithQueryProvider(<Profile />);

		await waitFor(() => {
			expect(mockedFetchApi).toBeCalledWith(
				GetWithAuthGuardDataDocument,
				expect.anything()
			);
		});

		expectNoUnlocalizedText(screen);
	});

	it('localizes playlists page', async () => {
		loadAuthGuardData();

		const screen = await renderWithQueryProvider(<AccountPlaylists />);

		await waitFor(() => {
			expect(mockedFetchApi).toBeCalledWith(
				GetWithAuthGuardDataDocument,
				expect.anything()
			);
		});

		expectNoUnlocalizedText(screen);
	});

	it('localizes logout page', async () => {
		loadRouter({
			push: () => Promise.resolve(true),
		});
		loadAuthGuardData();
		jest.spyOn(api, 'useLogout').mockResolvedValue();

		await act(async () => {
			const screen = await renderWithQueryProvider(<Logout />);
			expectNoUnlocalizedText(screen);
		});
	});
});
