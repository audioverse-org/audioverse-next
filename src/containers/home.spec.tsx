import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { getSermons } from '@lib/api';
import { loadQuery } from '@lib/test/helpers';
import Home, { getStaticPaths, getStaticProps } from '@pages/[language]';

jest.mock('@lib/api');
jest.mock('next/router');

const renderHome = async ({ params = { language: 'en' }, query = {} } = {}) => {
	loadQuery(query);
	const { props } = await getStaticProps({ params });
	return render(<Home {...props} />);
};

function loadRecentSermons() {
	(getSermons as jest.Mock).mockReturnValue({
		nodes: [
			{
				id: 1,
				title: 'the_sermon_title',
			},
		],
	});
}

describe('home page', () => {
	beforeEach(() => jest.resetAllMocks());

	it('revalidates static copy every 10s', async () => {
		const { revalidate } = await getStaticProps({ params: { language: 'en' } });

		expect(revalidate).toBe(10);
	});

	it('generates static paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en');
	});

	it('sets proper fallback strategy', async () => {
		const { fallback } = await getStaticPaths();

		expect(fallback).toBe('unstable_blocking');
	});

	it('gets recent sermons', async () => {
		await renderHome();

		expect(getSermons).toHaveBeenCalled();
	});

	it('displays recent sermons', async () => {
		loadRecentSermons();

		const { getByText } = await renderHome();

		expect(getByText('the_sermon_title')).toBeDefined();
	});

	it('links sermons', async () => {
		loadRecentSermons();

		const { getByText } = await renderHome({ query: { language: 'en' } });
		const el = getByText('the_sermon_title');
		const href = el.getAttribute('href');

		expect(href).toBe('/en/sermons/1');
	});

	it('generates static paths for all languages', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/es');
	});

	it('uses query lang in urls', async () => {
		loadRecentSermons();

		const { getByText } = await renderHome({ query: { language: 'es' } });
		const el = getByText('the_sermon_title');
		const href = el.getAttribute('href');

		expect(href).toBe('/es/sermons/1');
	});

	it('queries with language', async () => {
		await renderHome({ params: { language: 'es' } });

		await waitFor(() => expect(getSermons).toBeCalledWith('SPANISH'));
	});
});
