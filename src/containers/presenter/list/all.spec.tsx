import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import All, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/presenters/all';

const renderPage = buildStaticRenderer(All, getStaticProps);

describe('presenter list all', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('generates paths', async () => {
		const { paths } = getStaticPaths();

		const m = paths.find((p: string) => p.includes('pt'));

		expect(m).toBeTruthy();
	});
});
