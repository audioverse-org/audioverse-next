import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

describe('getPaginatedStaticProps', () => {
	it('defaults nodes to empty array', async () => {
		const result = await getPaginatedStaticProps(
			'en',
			1,
			async (): Promise<any> => undefined
		);

		expect(result.props.nodes).toEqual([]);
	});
});
