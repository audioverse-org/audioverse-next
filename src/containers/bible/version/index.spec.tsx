import { getStaticPaths } from '~src/pages/[language]/bibles/[version]/[[...slug]]';
import getVersions from '~src/services/bibles/getVersions';

jest.mock('~src/services/bibles/getVersions');

describe('Bible Version', () => {
	beforeEach(() => {
		jest.mocked(getVersions).mockResolvedValue([
			{
				id: 'ENGKJV2',
				title: 'The Version Title',
			},
		]);
	});

	it('should return the static paths', async () => {
		const paths = await getStaticPaths();

		expect(paths).toEqual(
			expect.objectContaining({
				paths: [`/en/bibles/ENGKJV2/the-version-title`],
			}),
		);
	});
});
