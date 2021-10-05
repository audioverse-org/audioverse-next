import React from 'react';

import { Language } from '@lib/generated/graphql';
import { loadQuery, renderWithIntl } from '@lib/test/helpers';
import Search, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/search';

const renderPage = async () => {
	return renderWithIntl(<Search language={Language.English} />);
};

describe('search', () => {
	it('renders', async () => {
		loadQuery();

		await renderPage();
	});

	it('registers search paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/search');
	});

	it('includes props', async () => {
		const { props } = await getStaticProps({
			params: {
				language: 'en',
			},
		});

		expect(props).toBeDefined();
	});
});
