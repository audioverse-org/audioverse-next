import { RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as intl from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

import Favorite from '@components/molecules/favorite';
import PlaylistButton from '@components/molecules/playlistButton';
import SpeakerName from '@components/molecules/speakerName';
import Footer from '@components/organisms/footer';
import Header from '@components/organisms/header';
import Audiobook from '@containers/audiobook/audiobook';
import Audiobooks from '@containers/audiobook/audiobooks';
import Book from '@containers/bible/book';
import SermonDetail, { Sermon } from '@containers/sermon/detail';
import TagList from '@containers/tag/list';
import * as api from '@lib/api';
import { isPersonFavorited, isRecordingFavorited } from '@lib/api';
import { Person } from '@lib/generated/graphql';
import { readableBytes } from '@lib/readableBytes';
import {
	makePlaylistButtonData,
	mockedFetchApi,
	renderWithQueryProvider,
} from '@lib/test/helpers';

jest.mock('react-intl');
jest.mock('@lib/api/isRecordingFavorited');
jest.mock('@lib/api/isPersonFavorited');
jest.mock('react-toastify');
jest.mock('@lib/readableBytes');

const expectNoUnlocalizedText = (
	screen: RenderResult,
	whitelist: string[] = []
) => {
	const { queryAllByText, queryAllByAltText } = screen;
	const r = /[^z\d\W\s]+/;
	const m = (c: string) => !!c.match(r) && !whitelist.includes(c);
	const hits = [...queryAllByText(m), ...queryAllByAltText(m)];

	expect(hits).toHaveLength(0);
};

const expectNoUnlocalizedToasts = () => {
	const calls = ((toast as any) as jest.Mock).mock.calls;
	calls.forEach((c) => {
		expect(c[0]).not.toMatch(/[^z]+/);
	});
};

const toLocaleStringBackup = global.Date.prototype.toLocaleString;

describe('localization usage', () => {
	beforeEach(() => {
		jest.resetAllMocks();

		jest.spyOn(intl, 'FormattedMessage').mockImplementation((() => 'z') as any);
		jest
			.spyOn(FormattedMessage.prototype, 'shouldComponentUpdate')
			.mockImplementation(() => true);

		const formatter = jest.fn();
		formatter.mockReturnValue('z');
		jest.spyOn(intl, 'useIntl').mockReturnValue({
			formatMessage: formatter,
		} as any);

		(readableBytes as jest.Mock).mockReturnValue('z');
	});

	beforeAll(() => {
		global.Date.prototype.toLocaleString = jest.fn(() => 'z');
	});

	afterAll(() => {
		global.Date.prototype.toLocaleString = toLocaleStringBackup;
	});

	it('localizes playlistButton logged out', async () => {
		const screen = await renderWithQueryProvider(
			<PlaylistButton recordingId={'recording_id'} />
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes playlistButton logged in', async () => {
		mockedFetchApi.mockResolvedValue(makePlaylistButtonData([]));

		const screen = await renderWithQueryProvider(
			<PlaylistButton recordingId={'recording_id'} />
		);

		await waitFor(() => expect(mockedFetchApi).toHaveBeenCalled());

		expectNoUnlocalizedText(screen);
	});

	it('localizes speakerName', async () => {
		const screen = await renderWithQueryProvider(
			<SpeakerName
				person={
					{
						id: 'z',
						name: 'z',
					} as Person
				}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes sermon detail page', async () => {
		const screen = await renderWithQueryProvider(
			<SermonDetail
				sermon={
					{
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
						videoDownloads: [
							{
								id: 'z',
								url: 'z',
								filesize: '100',
							},
						],
					} as Sermon
				}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes Unfavorite button', async () => {
		jest.spyOn(api, 'isRecordingFavorited').mockResolvedValue(true);

		const screen = await renderWithQueryProvider(
			<Favorite id={'recording_id'} />
		);

		await waitFor(() => expect(isRecordingFavorited).toBeCalled());

		expectNoUnlocalizedText(screen);
	});

	it('localizes SpeakerName login error', async () => {
		const { getByRole } = await renderWithQueryProvider(
			<SpeakerName person={{} as Person} />
		);

		await waitFor(() => expect(isPersonFavorited).toBeCalled());

		const byRole = getByRole('button');

		userEvent.click(byRole);

		expectNoUnlocalizedToasts();
	});

	it('localizes tag list page', async () => {
		const screen = await renderWithQueryProvider(
			<TagList
				nodes={[
					{
						id: 'z',
						name: 'z',
					},
				]}
				pagination={{ current: 0, total: 0 }}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes header', async () => {
		const screen = await renderWithQueryProvider(<Header />);

		expectNoUnlocalizedText(screen, ['AudioVerse']);
	});

	it('localizes Bible book page', async () => {
		const screen = await renderWithQueryProvider(
			<Book
				data={{
					audiobible: {
						title: 'z',
						book: {
							title: 'z',
							shareUrl: 'z',
							chapters: [
								{
									title: 'z',
									url: '',
									id: 'z',
									verses: [],
								},
							],
						},
						sponsor: {
							name: 'z',
							url: 'z',
						},
						copyrightText: 'z',
					},
				}}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes footer', async () => {
		const screen = await renderWithQueryProvider(<Footer />);

		expectNoUnlocalizedText(screen, [
			'Types & Symbols',
			'Русский',
			'Français',
			'Español',
			'English',
			'Deutsch',
		]);
	});

	it('localizes audiobooks list page', async () => {
		const screen = await renderWithQueryProvider(
			<Audiobooks
				nodes={[
					{
						id: 'z',
						title: 'z',
						imageWithFallback: {
							url: 'z',
						},
					},
				]}
				pagination={{ total: 1, current: 1 }}
			/>
		);

		expectNoUnlocalizedText(screen);
	});

	it('localizes audiobook detail page', async () => {
		const screen = await renderWithQueryProvider(
			<Audiobook audiobook={undefined as any} rssPath={''} />
		);

		expectNoUnlocalizedText(screen);
	});
});
