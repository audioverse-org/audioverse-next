import { fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';

import SpeakerName from '@components/molecules/speakerName';
import * as api from '@lib/api';
import { isPersonFavorited } from '@lib/api';
import { setPersonFavorited } from '@lib/api/setPersonFavorited';
import { renderWithIntl } from '@lib/test/helpers';

jest.mock('react-toastify');
jest.mock('@lib/api/setPersonFavorited');
jest.mock('@lib/api/isPersonFavorited');
jest.mock('@lib/api/fetchApi');

describe('speaker name component', () => {
	beforeEach(() => jest.resetAllMocks());

	it('renders', async () => {
		await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
			},
		});
	});

	it('renders speaker name', async () => {
		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
			},
		});

		expect(getByText('the_name')).toBeInTheDocument();
	});

	it('renders speaker summary', async () => {
		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
				summary: 'the_summary',
			},
		});

		expect(getByText('the_summary')).toBeInTheDocument();
	});

	it('renders speaker image', async () => {
		const { getByAltText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
				imageWithFallback: {
					url: 'the_url',
				},
			},
		});

		const image = getByAltText('the_name') as HTMLImageElement;

		expect(image.src).toContain('the_url');
	});

	it('has favorite toggle', async () => {
		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
			},
		});

		expect(getByText('Favorite')).toBeInTheDocument();
	});

	it('renders summary html', async () => {
		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
				summary: 'hello <i>target</i> hello',
			},
		});

		expect(getByText('target')).toBeInTheDocument();
	});

	it('sets initial toggle state', async () => {
		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
				viewerHasFavorited: true,
			},
		});

		expect(getByText('Unfavorite')).toBeInTheDocument();
	});

	it('alerts need for login', async () => {
		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
			},
		});

		userEvent.click(getByText('Favorite'));

		expect(toast).toBeCalledWith('You must be logged in to do this');
	});

	it('prevents button click default action', async () => {
		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
			},
		});

		const result = fireEvent.click(getByText('Favorite'));

		expect(result).toBe(false);
	});

	it('favorites speaker', async () => {
		jest.spyOn(api, 'isPersonFavorited').mockResolvedValue(false);

		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
			},
		});

		await waitFor(() => expect(isPersonFavorited).toBeCalled);

		userEvent.click(getByText('Favorite'));

		expect(setPersonFavorited).toBeCalledWith('the_id', true);
	});

	it('does not toast if authenticated', async () => {
		jest.spyOn(api, 'isPersonFavorited').mockResolvedValue(false);

		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
			},
		});

		await waitFor(() => expect(isPersonFavorited).toBeCalled());

		userEvent.click(getByText('Favorite'));

		expect(toast).not.toBeCalled();
	});

	// does not call api if user not authenticated
	it('does not call api if user not authenticated', async () => {
		const { getByText } = await renderWithIntl(SpeakerName, {
			person: {
				id: 'the_id',
				name: 'the_name',
			},
		});

		userEvent.click(getByText('Favorite'));

		expect(setPersonFavorited).not.toBeCalled();
	});

	// does not toast error before initial load (isLoading)
	// caches isPersonFavorited
	// saves toggle state optimistically
	// cancels queries to avoid clobbering optimistic updates
	// roles back state if error
	// includes rss link
	// includes person website
	// renders person summary html
	// link to person detail page
});
