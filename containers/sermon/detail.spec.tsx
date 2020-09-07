import { getRecentSermons as getLatestSermons } from '../../lib/api';
import { getStaticPaths } from '../../pages/[language]/sermons/[id]';
import { waitFor } from '@testing-library/dom';

jest.mock('../../lib/api');

describe('detailPageGenerator', () => {
	it('gets sermons', async () => {
		(getLatestSermons as jest.Mock).mockReturnValue({ nodes: [] });

		await getStaticPaths();

		await waitFor(() => expect(getLatestSermons).toBeCalledWith('ENGLISH'));
	});
});
