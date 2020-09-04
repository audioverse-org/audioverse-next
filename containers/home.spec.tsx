import { render } from '@testing-library/react';
import React from 'react';
import Home, { getStaticProps, getStaticPaths } from '../pages/[language]';
import { getRecentSermons } from '../lib/api';

jest.mock('../lib/api');

const renderHome = async (params = {}) => {
	const { props } = await getStaticProps({ params });
	return render(<Home {...props} />);
};

describe('home page', () => {
	it('revalidates static copy every 10s', async () => {
		const { revalidate } = await getStaticProps({ params: {} });

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

		expect(getRecentSermons).toHaveBeenCalled();
	});

	it('displays recent sermons', async () => {
		(getRecentSermons as jest.Mock).mockReturnValue({
			nodes: [
				{
					id: 1,
					title: 'the_sermon_title',
				},
			],
		});

		const { getByText } = await renderHome();

		expect(getByText('the_sermon_title')).toBeDefined();
	});

	it('links sermons', async () => {
		(getRecentSermons as jest.Mock).mockReturnValue({
			nodes: [
				{
					id: 1,
					title: 'the_sermon_title',
				},
			],
		});

		const { getByText } = await renderHome();
		const el = getByText('the_sermon_title');
		const href = el.getAttribute('href');

		expect(href).toBe('/en/sermons/1');
	});
});
