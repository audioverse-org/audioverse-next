import { waitFor } from '@testing-library/react';

import { getHomeStaticProps } from '@lib/generated/graphql';
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

	it('generates static paths for all languages', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/es');
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
// displays 404 on getStaticProps fetch errors
