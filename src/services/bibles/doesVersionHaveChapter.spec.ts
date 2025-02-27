import doesVersionHaveChapter from './doesVersionHaveChapter';
import fetchResponse from './fcbh/fetchResponse';

describe('doesVersionHaveChapter', () => {
	it('does not hit fcbh api', async () => {
		await doesVersionHaveChapter('ENGKJV2', 'Genesis', 1);

		expect(fetchResponse).not.toBeCalled();
	});
});
