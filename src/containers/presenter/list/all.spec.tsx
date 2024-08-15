import { screen } from '@testing-library/react';

import { buildLoader } from '~lib/test/buildLoader';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import All, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/presenters/all';

import { GetPresenterListAllPageDataDocument } from './__generated__/all';
import { GetPersonListLetterCountsDocument } from './__generated__/list';

const renderPage = buildStaticRenderer(All, getStaticProps);

const loadServerData = buildLoader(GetPersonListLetterCountsDocument, {
	personLetterCounts: [
		{
			letter: 'A',
		},
	],
});

const loadClientData = buildLoader(GetPresenterListAllPageDataDocument, {
	persons: {
		nodes: [],
	},
});

describe('presenter list all', () => {
	beforeEach(() => {
		loadServerData();
		loadClientData();
	});

	it('generates paths', async () => {
		const { paths } = getStaticPaths();

		const m = paths.find((p: string) => p.includes('pt'));

		expect(m).toBeTruthy();
	});

	it('has All link', async () => {
		await renderPage();

		expect(screen.getByRole('link', { name: 'All' })).toBeInTheDocument();
	});
});

// includes all link
