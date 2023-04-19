import { Language } from './generated/graphql';
import { getLanguageIdByRoute } from './getLanguageIdByRoute';

describe('getLanguageIdByRoute', () => {
	it('handles `br`', async () => {
		const result = getLanguageIdByRoute('br');

		expect(result).toBe(Language.Portuguese);
	});
});
