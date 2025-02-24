import { Language } from '~src/__generated__/graphql';

import { getDetailStaticPaths } from './getDetailStaticPaths';

const languageCount = Object.values(Language).filter(
	(l) => l !== Language.Nordic,
).length;

describe('getDetailStaticPaths', () => {
	const mockGetter = jest
		.fn()
		.mockResolvedValue({ nodes: [], hasNextPage: false });
	const mockParseNodes = jest.fn((data) => data.nodes);
	const mockPathMapper = jest.fn((l, n) => `/${l}/${n}`);

	it('calls getter multiple times for same language with Infinity prerenderLimit', async () => {
		mockGetter.mockResolvedValueOnce({ nodes: [1], hasNextPage: true });
		mockGetter.mockResolvedValueOnce({ nodes: [2], hasNextPage: true });

		await getDetailStaticPaths(mockGetter, mockParseNodes, mockPathMapper, {
			prerenderLimit: Infinity,
			parseHasNextPage: (data) => data.hasNextPage,
		});

		expect(mockGetter.mock.calls.length).toBeGreaterThan(languageCount);
	});
});
