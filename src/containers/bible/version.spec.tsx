import React from 'react';

import * as bibleBrain from '@lib/api/bibleBrain';
import { renderWithIntl } from '@lib/test/helpers';
import Version, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/bibles/[id]';

jest.mock('@lib/api/bibleBrain');

async function renderPage() {
	const { props } = (await getStaticProps({
		params: { id: 'the_version_id' },
	})) as any;
	return renderWithIntl(<Version {...props} />);
}

function loadPageData() {
	jest.spyOn(bibleBrain, 'getBible').mockResolvedValue({
		id: 'the_version_id',
		abbreviation: 'KJV',
		title: 'the_version_title',
		sponsor: {
			title: 'FCBH',
			url: '',
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
		jest.spyOn(bibleBrain, 'getBibles').mockResolvedValue([
			{
				id: 'the_version_id',
				abbreviation: 'KJV',
				title: 'the_version_title',
				sponsor: {
					title: 'FCBH',
					url: '',
				},
				books: [],
			} as bibleBrain.IBibleVersion,
		]);

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/bibles/the_version_id');
	});

	it('links books', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		const link = getByText('Genesis').parentElement as HTMLLinkElement;

		expect(link.href).toContain('/en/bibles/ENGESVC/Gen');
	});

	it('renders 404', async () => {
		jest.spyOn(bibleBrain, 'getBible').mockResolvedValue(null);

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});
