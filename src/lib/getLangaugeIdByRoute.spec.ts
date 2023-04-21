import { Language } from '@src/__generated__/graphql';
import { getLanguageIdByRoute } from './getLanguageIdByRoute';

describe('getLanguageIdByRoute', () => {
	it('handles `br`', async () => {
		const result = getLanguageIdByRoute('br');

		expect(result).toBe(Language.Portuguese);
	});
});
