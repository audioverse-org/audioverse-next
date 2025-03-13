import { fetchFcbhChapterMediaUrl } from '~src/services/bibles/fcbh/fetchFcbhChapterMediaUrl';

import { getRefreshedUrl } from './getRefreshedUrl';

jest.mock('~/services/bibles/fcbh/fetchFcbhChapterMediaUrl');

describe('getRefreshedUrl', () => {
	it('uses recording ID to fetch the url', async () => {
		await getRefreshedUrl({ id: 'ENGKJVO2DA/ECC/7' } as any);

		expect(fetchFcbhChapterMediaUrl).toHaveBeenCalledWith(
			'ENGKJVO2DA',
			'ECC',
			7,
		);
	});
});
