import fs from 'fs';

import { fetchFcbhBibles } from '~src/services/bibles/fetchFcbhBibles';
import transformBible from '~src/services/bibles/transformBible';

import main from './save-fcbh-meta.main';

jest.mock('../src/services/bibles/fetchFcbhBibles', () => ({
	fetchFcbhBibles: jest.fn(() => Promise.resolve([{}])),
}));
jest.mock('../src/services/bibles/transformBible', () => jest.fn());
jest.mock('fs');

describe('save-fcbh-meta', () => {
	it('gets fcbh bibles', async () => {
		await main();

		expect(fetchFcbhBibles).toHaveBeenCalled();
	});

	it('transforms fcbh bibles', async () => {
		await main();

		expect(transformBible).toHaveBeenCalled();
	});

	it('throws error if bibles are length 0', async () => {
		jest.mocked(fetchFcbhBibles).mockResolvedValue([]);

		await expect(main()).rejects.toThrowError('No Bibles found');
	});

	it('transforms all bibles', async () => {
		jest.mocked(fetchFcbhBibles).mockResolvedValue([{}, {}, {}] as any);

		await main();

		expect(transformBible).toHaveBeenCalledTimes(3);
	});

	it('writes bibles to disk', async () => {
		jest.mocked(transformBible).mockReturnValue({} as any);

		await main();

		expect(fs.writeFileSync).toHaveBeenCalled();
	});
});
