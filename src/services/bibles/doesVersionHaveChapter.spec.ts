import doesVersionHaveChapter from './doesVersionHaveChapter';
import fetchResponse from './fcbh/fetchResponse';
import { fetchGraphqlChapterId } from './graphql/graphqlVersionIndex';

jest.mock('./graphql/graphqlVersionIndex');

describe('doesVersionHaveChapter', () => {
	it('does not hit fcbh api', async () => {
		await doesVersionHaveChapter('ENGKJV2', 'Genesis', 1);

		expect(fetchResponse).not.toBeCalled();
	});

	it('returns false if fetchGraphqlChapterId throws error', async () => {
		jest.mocked(fetchGraphqlChapterId).mockRejectedValue(new Error('test'));

		const result = await doesVersionHaveChapter('ABC', 'Genesis', 1);

		expect(result).toBe(false);
	});
});
