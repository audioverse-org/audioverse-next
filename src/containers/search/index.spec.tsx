import { __loadQuery } from 'next/router';
import React from 'react';

import renderWithProviders from '@lib/test/renderWithProviders';
import Search, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/search';

const renderPage = async () => {
	return renderWithProviders(<Search language={Language.English} />, undefined);
};

describe('search', () => {
	it('renders', async () => {
		__loadQuery();

		await renderPage();
	});

	it('registers search paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/search');
	});

	it('includes props', async () => {
		const { props } = (await getStaticProps({
			params: {
				language: 'en',
			},
		})) as any;

		expect(props).toBeDefined();
	});
});
