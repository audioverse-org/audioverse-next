import fs from 'fs';

import { getBibles } from '~src/services/fcbh/getBibles';
import transformBible from '~src/services/fcbh/transformBible';

import main from './save-fcbh-meta.main';

jest.mock('../src/services/fcbh/getBibles', () => ({
	getBibles: jest.fn(() => Promise.resolve([{}])),
}));
jest.mock('../src/services/fcbh/transformBible', () => jest.fn());
jest.mock('fs');

describe('save-fcbh-meta', () => {
	it('gets fcbh bibles', async () => {
		await main();

		expect(getBibles).toHaveBeenCalled();
	});

	it('transforms fcbh bibles', async () => {
		await main();

		expect(transformBible).toHaveBeenCalled();
	});

	it('throws error if bibles are length 0', async () => {
		jest.mocked(getBibles).mockResolvedValue([]);

		await expect(main()).rejects.toThrowError('No Bibles found');
	});

	it('transforms all bibles', async () => {
		jest.mocked(getBibles).mockResolvedValue([{}, {}, {}] as any);

		await main();

		expect(transformBible).toHaveBeenCalledTimes(3);
	});

	it('writes bibles to disk', async () => {
		jest.mocked(transformBible).mockReturnValue({} as any);

		await main();

		expect(fs.writeFileSync).toHaveBeenCalled();
	});
});
