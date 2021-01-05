import {
	Matcher,
	SelectorMatcherOptions,
	waitFor,
} from '@testing-library/react';
import React from 'react';
import * as intl from 'react-intl';
import { FormattedMessage } from 'react-intl';

import PlaylistButton from '@components/molecules/playlistButton';
import SpeakerName from '@components/molecules/speakerName';
import * as api from '@lib/api';
import {
	getPlaylists,
	isPersonFavorited,
	isRecordingFavorited,
} from '@lib/api';
import { renderWithQueryProvider } from '@lib/test/helpers';
import SermonDetail from '@containers/sermon/detail';
import { Person, Sermon } from 'types';
import Favorite from '@components/molecules/favorite';
import { toast } from 'react-toastify';
import userEvent from '@testing-library/user-event';

jest.mock('react-intl');
jest.mock('@lib/api/getPlaylists');
jest.mock('@lib/api/isRecordingFavorited');
jest.mock('@lib/api/isPersonFavorited');
jest.mock('react-toastify');

type QueryByText = (
	text: Matcher,
	options?: SelectorMatcherOptions | undefined,
	waitForElementOptions?: unknown
) => HTMLElement | null;

const expectNoUnlocalizedText = (queryByText: QueryByText) => {
	expect(queryByText(/[^z]+/)).toBeNull();
};

const expectNoUnlocalizedToasts = () => {
	const calls = ((toast as any) as jest.Mock).mock.calls;
	calls.forEach((c) => {
		expect(c[0]).not.toMatch(/[^z]+/);
	});
};

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
	});

	it('localizes playlistButton logged out', async () => {
		const { queryByText } = await renderWithQueryProvider(
			<PlaylistButton recordingId={'recording_id'} />
		);

		expectNoUnlocalizedText(queryByText);
	});

	it('localizes playlistButton logged in', async () => {
		jest.spyOn(api, 'getPlaylists').mockResolvedValue([]);

		const { queryByText } = await renderWithQueryProvider(
			<PlaylistButton recordingId={'recording_id'} />
		);

		await waitFor(() => expect(getPlaylists).toHaveBeenCalled());

		expectNoUnlocalizedText(queryByText);
	});

	it('localizes speakerName', async () => {
		const { queryByText } = await renderWithQueryProvider(
			<SpeakerName
				person={{
					id: 'z',
					name: 'z',
				}}
			/>
		);

		expectNoUnlocalizedText(queryByText);
	});

	it('localizes sermon detail page', async () => {
		const { queryByText } = await renderWithQueryProvider(
			<SermonDetail sermon={{} as Sermon} />
		);

		expectNoUnlocalizedText(queryByText);
	});

	it('localizes Unfavorite button', async () => {
		jest.spyOn(api, 'isRecordingFavorited').mockResolvedValue(true);

		const { queryByText } = await renderWithQueryProvider(
			<Favorite id={'recording_id'} />
		);

		await waitFor(() => expect(isRecordingFavorited).toBeCalled());

		expectNoUnlocalizedText(queryByText);
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
});
