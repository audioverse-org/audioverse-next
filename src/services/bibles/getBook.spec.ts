import getBook from './getBook';

describe('getBook', () => {
	it('finds fcbh book case insensitive', async () => {
		const book = await getBook('ENGKJV2', 'gen');

		expect(book).toBeDefined();
	});
});
