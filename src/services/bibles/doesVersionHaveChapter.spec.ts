import doesVersionHaveChapter from './doesVersionHaveChapter';
import fetchResponse from './fcbh/fetchResponse';
import { getGraphqlChapterId } from './graphql/getGraphqlChapterId';

jest.mock('./graphql/getGraphqlChapterId');

describe('doesVersionHaveChapter', () => {
	it('does not hit fcbh api', async () => {
		await doesVersionHaveChapter('ENGKJV2', 'Genesis', 1);

		expect(fetchResponse).not.toBeCalled();
	});

	it('awaits graphql api', async () => {
		jest.mocked(getGraphqlChapterId).mockResolvedValue(null);

		const result = await doesVersionHaveChapter(123, 'Genesis', 1);

		expect(result).toBe(false);
	});
});
