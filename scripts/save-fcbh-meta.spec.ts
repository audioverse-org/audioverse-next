import fs from 'fs';

import { fetchFcbhBibles } from '~src/services/bibles/fcbh/fetchFcbhBibles';

import main from './save-fcbh-meta.main';

jest.mock('../src/services/bibles/fcbh/fetchFcbhBibles');
jest.mock('fs');

describe('save-fcbh-meta', () => {
	beforeEach(() => {
		jest
			.mocked(fetchFcbhBibles)
			.mockResolvedValue([
				{ books: [{ chapters_full: [{ url: 'the_url' }] }] } as any,
			]);
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

	it('strips chapter urls', async () => {
		await main();

		expect(fs.writeFileSync).not.toHaveBeenCalledWith(
			expect.anything(),
			expect.stringContaining('the_url'),
		);
	});
});
