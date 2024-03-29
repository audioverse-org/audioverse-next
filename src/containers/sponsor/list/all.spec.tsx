import { screen } from '@testing-library/react';

import { buildLoader } from '~lib/test/buildLoader';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import Sponsors, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/sponsors/all';

import { GetSponsorListLetterCountsDocument } from './__generated__/list';

const renderPage = buildStaticRenderer(Sponsors, getStaticProps);

const loadData = buildLoader(GetSponsorListLetterCountsDocument, {
	sponsorLetterCounts: [
		{
			letter: 'A',
		},
	],
});

describe('sponsor list all page', () => {
	beforeEach(() => {
		loadData();
	});

	it('generates paths', async () => {
		const { paths } = getStaticPaths();

		const m = paths.find((p) => typeof p === 'string' && p.match(/pt/));

		expect(m).toBeDefined();
	});

	it('renders page title', async () => {
		await renderPage();

		expect(screen.getByRole('heading', { name: 'All' })).toBeInTheDocument();
	});
});
