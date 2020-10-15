import { renderWithIntl } from '@lib/test/helpers';
import Search, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/search';

describe('search', () => {
	it('renders', async () => {
		await renderWithIntl(Search, { sermons: [] });
	});

	it('registers search paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/search');
	});

	it('includes props', async () => {
		const { props } = await getStaticProps();

		expect(props).toBeDefined();
	});
});
