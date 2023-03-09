import { buildRenderer } from '@lib/test/buildRenderer';
import Sponsors, { getStaticPaths } from '@pages/[language]/sponsors/all';

const renderPage = buildRenderer(Sponsors);

describe('sponsor list all page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('generates paths', async () => {
		const { paths } = getStaticPaths();

		const m = paths.find((p) => typeof p === 'string' && p.match(/pt/));

		expect(m).toBeDefined();
	});
});
