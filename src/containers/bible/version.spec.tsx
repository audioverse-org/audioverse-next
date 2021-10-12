import { when } from 'jest-when';
import React from 'react';

import {
	GetVersionDetailPageDataDocument,
	GetVersionDetailPathDataDocument,
} from '@lib/generated/graphql';
import { mockedFetchApi, renderWithIntl } from '@lib/test/helpers';
import Version, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/bibles/[id]';

async function renderPage() {
	const { props } = (await getStaticProps({
		params: { id: 'the_version_id' },
	})) as any;
	return renderWithIntl(<Version {...props} />);
}

function loadPageData() {
	when(mockedFetchApi)
		.calledWith(GetVersionDetailPageDataDocument, expect.anything())
		.mockResolvedValue({
			audiobible: {
				books: [
					{
						id: 'ENGESVC-Gen',
						title: 'Genesis',
						chapterCount: 50,
						bible: {
							abbreviation: 'ESV',
						},
					},
				],
			},
		});
}

describe('version detail page', () => {
	it('renders', async () => {
		loadPageData();

		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetVersionDetailPageDataDocument, {
			variables: {
				id: 'the_version_id',
			},
		});
	});

	it('lists books', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		expect(getByText('Genesis')).toBeInTheDocument();
	});

	it('generates paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetVersionDetailPathDataDocument, expect.anything())
			.mockResolvedValue({
				audiobibles: {
					nodes: [
						{
							id: 'the_version_id',
						},
					],
				},
			});

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
		when(mockedFetchApi)
			.calledWith(GetVersionDetailPageDataDocument, expect.anything())
			.mockResolvedValue({
				audiobible: null,
			});

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});
