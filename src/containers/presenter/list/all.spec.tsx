import {
	GetPersonListLetterCountsDocument,
	GetPresenterListAllPageDataDocument,
} from '@lib/generated/graphql';
import { buildLoader } from '@lib/test/buildLoader';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import All, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/presenters/all';
import { screen } from '@testing-library/react';

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

	it('displays "All" heading', async () => {
		await renderPage();

		expect(screen.getByText('All')).toBeInTheDocument();
	});
});

// includes all link
