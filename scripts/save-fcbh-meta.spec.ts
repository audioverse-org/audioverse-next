import fs from 'fs';

import { fetchFcbhBibles } from '~src/services/bibles/api/fetchFcbhBibles';
import { fetchFcbhChapters } from '~src/services/bibles/api/fetchFcbhChapters';

import main from './save-fcbh-meta.main';

jest.mock('../src/services/bibles/api/fetchFcbhBibles');
jest.mock('../src/services/bibles/api/fetchFcbhChapters');
jest.mock('fs');

describe('save-fcbh-meta', () => {
	beforeEach(() => {
		jest.mocked(fetchFcbhBibles).mockResolvedValue([{} as any]);
		jest.mocked(fetchFcbhChapters).mockResolvedValue([{} as any]);
	});

	it('gets fcbh bibles', async () => {
		await main();

		expect(fetchFcbhBibles).toHaveBeenCalled();
	});

	it('throws error if bibles are length 0', async () => {
		jest.mocked(fetchFcbhBibles).mockResolvedValue([]);

		await expect(main()).rejects.toThrowError('No Bibles found');
	});

	it('writes bibles to disk', async () => {
		await main();

		expect(fs.writeFileSync).toHaveBeenCalled();
	});
});
