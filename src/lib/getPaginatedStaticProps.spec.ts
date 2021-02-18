import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

describe('getPaginatedStaticProps', () => {
	it('defaults nodes to empty array', async () => {
		const result = await getPaginatedStaticProps(
			{
				language: 'en',
				i: 1,
			},
			async (): Promise<any> => undefined,
			'recordings.nodes',
			'recordings.aggregate.count'
		);

		expect(result.props.nodes).toEqual([]);
	});
});
