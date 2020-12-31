import {
	Matcher,
	SelectorMatcherOptions,
	waitFor,
} from '@testing-library/react';
import React from 'react';
import * as intl from 'react-intl';

import PlaylistButton from '@components/molecules/playlistButton';
import * as api from '@lib/api';
import { getPlaylists } from '@lib/api';
import { renderWithQueryProvider } from '@lib/test/helpers';
import { FormattedMessage } from 'react-intl';

jest.mock('react-intl');
jest.mock('@lib/api/getPlaylists');

type QueryByText = (
	text: Matcher,
	options?: SelectorMatcherOptions | undefined,
	waitForElementOptions?: unknown
) => HTMLElement | null;

const expectNoUnlocalizedText = (queryByText: QueryByText) => {
	expect(queryByText(/[^z]+/)).toBeNull();
};

describe('localization usage', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		jest.spyOn(intl, 'FormattedMessage').mockImplementation((() => 'z') as any);
		jest
			.spyOn(FormattedMessage.prototype, 'shouldComponentUpdate')
			.mockImplementation(() => true);
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
});
