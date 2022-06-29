import React from 'react';

import * as bibleBrain from '@lib/api/bibleBrain';
import { GetAudiobibleVersionsDataDocument } from '@lib/generated/graphql';
import { buildLoader } from '@lib/test/buildLoader';
import renderWithProviders from '@lib/test/renderWithProviders';
import Versions, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/bibles';
import { screen } from '@testing-library/react';

jest.mock('@lib/api/bibleBrain');

async function renderPage() {
	const { props } = (await getStaticProps({})) as any;
	return renderWithProviders(<Versions {...props} />, undefined);
}

const loadData = buildLoader(GetAudiobibleVersionsDataDocument, {
	collections: {
		nodes: [],
	},
});

function loadPageData() {
	loadData();
	jest.spyOn(bibleBrain, 'getBibles').mockResolvedValue([
		{
			id: 'the_version_id',
			abbreviation: 'KJV',
			title: 'the_version_title',
			sponsor: {
				title: 'FCBH',
				website: '',
			},
			books: [],
		} as bibleBrain.IBibleVersion,
	]);
}

describe('versions list', () => {
	it('renders versions', async () => {
		loadPageData();

		await renderPage();

		expect(screen.getByText('the_version_title')).toBeInTheDocument();
	});

	it('provides language paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/bibles');
	});

	it('links entries', async () => {
		loadPageData();

		await renderPage();

		const link = screen.getByRole('link', { name: /the_version_title/ });

		expect(link).toHaveAttribute('href', '/en/bibles/the_version_id');
	});

	it('renders 404', async () => {
		jest.spyOn(bibleBrain, 'getBibles').mockResolvedValue([]);

		const { notFound } = (await getStaticProps({})) as any;

		expect(notFound).toBe(true);
	});
});
