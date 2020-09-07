import { render } from '@testing-library/react';
import React from 'react';
import Home, { getStaticProps, getStaticPaths } from '../pages/[language]';
import { getRecentSermons } from '../lib/api';
import { useRouter } from 'next/router';

jest.mock('../lib/api');
jest.mock('next/router');

const renderHome = async ({ params = {}, query = {} } = {}) => {
	(useRouter as jest.Mock).mockReturnValue({ query });
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
		(getRecentSermons as jest.Mock).mockReturnValue({
			nodes: [
				{
					id: 1,
					title: 'the_sermon_title',
				},
			],
		});

		const { getByText } = await renderHome({ query: { language: 'es' } });
		const el = getByText('the_sermon_title');
		const href = el.getAttribute('href');

		expect(href).toBe('/es/sermons/1');
	});
});
