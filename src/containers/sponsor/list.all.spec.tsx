import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import Sponsors, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/all';

const renderPage = buildStaticRenderer(Sponsors, getStaticProps);

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
