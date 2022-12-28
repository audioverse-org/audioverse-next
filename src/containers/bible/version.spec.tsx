import React from 'react';

import * as bibleBrain from '@lib/api/bibleBrain';
import { GetAudiobibleVersionsDataDocument } from '@lib/generated/graphql';
import { buildLoader } from '@lib/test/buildLoader';
import renderWithProviders from '@lib/test/renderWithProviders';
import Version, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/bibles/[id]/[[...slugs]]';
import { screen } from '@testing-library/react';

jest.mock('@lib/api/bibleBrain');

async function renderPage() {
	const { props } = (await getStaticProps({
		params: { id: 'ENGKJV2' },
	})) as any;
	return renderWithProviders(<Version {...props} />, undefined);
}

const loadData = buildLoader(GetAudiobibleVersionsDataDocument, {
	collections: {
		nodes: [],
	},
});

function loadPageData() {
	jest.spyOn(bibleBrain, 'getBible').mockResolvedValue({
		id: 'the_version_id',
		abbreviation: 'KJV',
		title: 'the_version_title',
		sponsor: {
			title: 'FCBH',
			website: '',
		},
		books: [
			{
				book_id: 'ENGESVC/Gen',
				name: 'Genesis',
				chapters: [50],
				bible: {
					abbreviation: 'ESV',
				},
			},
		],
	} as bibleBrain.IBibleVersion);
}

describe('version detail page', () => {
	it('renders', async () => {
		loadPageData();

		await renderPage();
	});

	it('lists books', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		expect(getByText('Genesis')).toBeInTheDocument();
	});

	it('generates paths', async () => {
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

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/bibles/the_version_id');
	});

	it('links books', async () => {
		loadPageData();

		await renderPage();

		const link = screen.getByRole('link', { name: /Genesis/ }) as any;

		expect(link.href).toContain('/en/bibles/ENGESVC/Gen');
	});

	it('renders 404', async () => {
		jest.spyOn(bibleBrain, 'getBible').mockResolvedValue(null);

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});
