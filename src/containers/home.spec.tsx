import { waitFor } from '@testing-library/react';

import { getHomeStaticProps } from '@lib/generated/graphql';
import * as graphql from '@lib/generated/graphql';
import { loadQuery, renderWithIntl } from '@lib/test/helpers';
import Home, { getStaticPaths, getStaticProps } from '@pages/[language]';

jest.mock('@lib/api');
jest.mock('next/router');
jest.mock('@lib/generated/graphql');

const renderHome = async ({ params = { language: 'en' }, query = {} } = {}) => {
	loadQuery(query);
	const { props } = await getStaticProps({ params });
	return renderWithIntl(Home, props);
};

function loadQueryResponse() {
	jest.spyOn(graphql, 'getHomeStaticProps').mockResolvedValue({
		sermons: {
			nodes: [
				{
					id: 'sermon_id',
					title: 'the_sermon_title',
				},
			],
		},
	} as any);
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

		expect(fallback).toBe(true);
	});

	it('gets recent sermons', async () => {
		await renderHome();

		expect(getHomeStaticProps).toHaveBeenCalledWith({ language: 'ENGLISH' });
	});

	it('displays recent sermons', async () => {
		loadQueryResponse();

		const { getByText } = await renderHome();

		expect(getByText('the_sermon_title')).toBeInTheDocument();
	});

	it('links sermons', async () => {
		loadQueryResponse();

		const { getByText } = await renderHome({ query: { language: 'en' } });
		const el = getByText('the_sermon_title');
		const href = el.getAttribute('href');

		expect(href).toBe('/en/sermons/sermon_id');
	});

	it('generates static paths for all languages', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/es');
	});

	it('uses query lang in urls', async () => {
		loadQueryResponse();

		const { getByText } = await renderHome({ query: { language: 'es' } });
		const el = getByText('the_sermon_title');
		const href = el.getAttribute('href');

		expect(href).toBe('/es/sermons/sermon_id');
	});

	it('queries with language', async () => {
		await renderHome({ params: { language: 'es' } });

		await waitFor(() =>
			expect(getHomeStaticProps).toBeCalledWith({ language: 'SPANISH' })
		);
	});

	it('includes testimonies', async () => {
		const { getByText } = await renderHome();

		expect(getByText('Testimonies')).toBeInTheDocument();
	});

	it('falls back to English', async () => {
		loadQuery({ language: 'ak' });

		const { getByText } = await renderHome();

		expect(getByText('Testimonies')).toBeInTheDocument();
	});

	it('disables sidebar', async () => {
		const { props } = await getStaticProps({
			params: {
				language: 'en',
			},
		});

		expect(props.disableSidebar).toBeTruthy();
	});
});

// shows marketing header
// includes language switcher
// includes login and signup links
// language switcher opens
// language switcher closes
// localize all text
