import { waitFor } from '@testing-library/react';

import { GetHomeStaticPropsDocument } from '@lib/generated/graphql';
import {
	buildLoader,
	buildStaticRenderer,
	loadQuery,
	mockedFetchApi,
} from '@lib/test/helpers';
import Home, { getStaticPaths, getStaticProps } from '@pages/[language]';

jest.mock('next/router');

const renderPage = buildStaticRenderer(Home, getStaticProps, {
	language: 'en',
});

const loadData = buildLoader(GetHomeStaticPropsDocument, {
	musicTracks: {
		nodes: [{ title: 'the_song_title' }],
	},
});

describe('home page', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		loadData();
	});

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

	it('generates static paths for all languages', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/es');
	});

	it('queries with language', async () => {
		await renderPage({ language: 'es' });

		await waitFor(() =>
			expect(mockedFetchApi).toBeCalledWith(GetHomeStaticPropsDocument, {
				variables: {
					language: 'SPANISH',
				},
			})
		);
	});

	it('includes testimonies', async () => {
		const { getByText } = await renderPage();

		expect(getByText('Testimonies')).toBeInTheDocument();
	});

	it('falls back to English', async () => {
		loadQuery({ language: 'ak' });

		const { getByText } = await renderPage();

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

	it('renders song title', async () => {
		loadData();

		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('the_song_title')).toBeInTheDocument();
		});
	});
});

// shows marketing header
// includes language switcher
// includes login and signup links
// language switcher opens
// language switcher closes
// localize all text
// displays 404 on getStaticProps fetch errors
