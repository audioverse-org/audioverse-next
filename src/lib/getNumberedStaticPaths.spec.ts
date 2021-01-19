import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	ENTRIES_PER_PAGE,
	LANGUAGES,
	LIST_PRERENDER_LIMIT,
} from '@lib/constants';

describe('getNumberedStaticPaths', () => {
	it('enforces list render limit', async () => {
		const languageCount = Object.keys(LANGUAGES).length;
		const expected = LIST_PRERENDER_LIMIT * languageCount;

		const result = await getNumberedStaticPaths(
			'base',
			async () => 2 * ENTRIES_PER_PAGE * expected
		);

		expect(result.paths.length).toEqual(expected);
	});
});
