import {
	ENTRIES_PER_PAGE,
	LANGUAGES,
	LIST_PRERENDER_LIMIT,
} from '~lib/constants';
import { getNumberedStaticPaths } from '~lib/getNumberedStaticPaths';

describe('getNumberedStaticPaths', () => {
	it('enforces list render limit', async () => {
		const languageCount = Object.values(LANGUAGES)
			.map((c) => c.base_urls)
			.flat().length;
		const expected = LIST_PRERENDER_LIMIT * languageCount;

		const result = await getNumberedStaticPaths(
			'base',
			async () => 2 * ENTRIES_PER_PAGE * expected,
			(d) => d,
		);

		expect(result.paths).toHaveLength(expected);
	});
});
