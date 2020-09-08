import { waitFor } from '@testing-library/dom';

import { getSermons as getLatestSermons, getSermons } from '@lib/api';
import { getStaticPaths } from '@pages/[language]/sermons/[id]';

jest.mock('@lib/api');

function loadRecentSermons() {
	(getSermons as jest.Mock).mockReturnValue({
		nodes: [
			{
				id: 1,
				title: 'the_sermon_title',
				recordingDate: '2020-06-01T09:30:00.000Z',
			},
		],
	});
}

describe('detailPageGenerator', () => {
	beforeEach(() => jest.resetAllMocks());

	it('gets sermons', async () => {
		loadRecentSermons();

		await getStaticPaths();

		await waitFor(() => expect(getLatestSermons).toBeCalledWith('ENGLISH'));
	});

	it('gets recent sermons in all languages', async () => {
		loadRecentSermons();

		await getStaticPaths();

		await waitFor(() => expect(getLatestSermons).toBeCalledWith('SPANISH'));
	});

	it('returns paths', async () => {
		loadRecentSermons();

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/sermons/1');
	});

	it('generates localized paths', async () => {
		loadRecentSermons();

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/sermons/1');
	});
});
