import fs from 'fs';

import { render, waitFor } from '@testing-library/react';
import * as feed from 'feed';
import { useRouter } from 'next/router';
import React from 'react';

import { getSermonCount, getSermons } from '@lib/api';
import { ENTRIES_PER_PAGE, LANGUAGES, PROJECT_ROOT } from '@lib/constants';
import { loadSermons, mockFeed, setSermonCount } from '@lib/test/helpers';
import SermonList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sermons/all/page/[i]';

jest.mock('@lib/api');
jest.mock('next/router');
jest.mock('fs');

function loadQuery(query = {}) {
	(useRouter as jest.Mock).mockReturnValue({ query });
}

const renderPage = async ({
	params = { i: '1', language: 'en' },
	query = {},
} = {}) => {
	loadQuery(query);
	const { props } = await getStaticProps({ params });
	return render(<SermonList {...props} />);
};

function loadGetSermonsError() {
	(getSermons as jest.Mock).mockReturnValue(Promise.reject('API failure'));
}

describe('sermons list page', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockFeed();
	});

	it('can be rendered', async () => {
		loadSermons();

		await renderPage();
	});

	it('generates static paths', async () => {
		setSermonCount(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/sermons/all/page/1');
	});

	it('generates in all languages', async () => {
		setSermonCount(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/sermons/all/page/1');
	});

	it('sets proper fallback strategy', async () => {
		setSermonCount(1);

		const { fallback } = await getStaticPaths();

		expect(fallback).toBe(true);
	});

	it('generates all pages in language', async () => {
		setSermonCount(100 * ENTRIES_PER_PAGE);

		const result = await getStaticPaths();

		const expected = 100 * Object.keys(LANGUAGES).length;
		expect(result.paths.length).toBe(expected);
	});

	it('uses language codes to get sermon counts', async () => {
		setSermonCount(1);

		await getStaticPaths();

		expect(getSermonCount).toBeCalledWith('ENGLISH');
	});

	it('gets sermons for list page', async () => {
		loadSermons();

		await getStaticProps({ params: { i: '2', language: 'en' } });

		await waitFor(() =>
			expect(getSermons).toBeCalledWith('ENGLISH', {
				offset: ENTRIES_PER_PAGE,
				first: ENTRIES_PER_PAGE,
			})
		);
	});

	it('displays sermons list', async () => {
		loadSermons();

		const { getByText } = await renderPage();

		expect(getByText('the_sermon_title')).toBeDefined();
	});

	it('renders 404 on api error', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: false });
		loadGetSermonsError();

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeDefined();
	});

	it('returns 404 on empty data', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: false });
		loadSermons({ nodes: [] });

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeDefined();
	});

	it('includes pagination', async () => {
		loadSermons();

		const { getByText } = await renderPage();

		expect(getByText('1')).toBeDefined();
	});

	it('links to last pagination page', async () => {
		loadSermons({ count: 75 });

		const { getByText } = await renderPage();

		expect(getByText('3')).toBeDefined();
	});

	it('calculates pages using items per page', async () => {
		loadSermons({ count: 75 });

		const { getByText } = await renderPage({
			params: { i: '3', language: 'en' },
		});

		expect(() => getByText('4')).toThrow();
	});

	it('handles string page index', async () => {
		loadSermons();

		await renderPage({ params: { i: '3', language: 'en' } });
	});

	it('links pagination properly', async () => {
		loadSermons();

		const { getByText } = await renderPage(),
			link = getByText('1') as HTMLAnchorElement;

		expect(link.href).toContain('/en/sermons/page/1');
	});

	it('gets sermons for list page', async () => {
		loadSermons();

		await getStaticProps({ params: { i: '2', language: 'en' } });

		await waitFor(() =>
			expect(getSermons).toBeCalledWith('ENGLISH', {
				offset: ENTRIES_PER_PAGE,
				first: ENTRIES_PER_PAGE,
			})
		);
	});

	it('revalidates static pages', async () => {
		loadSermons();

		const props = await getStaticProps({ params: { i: '2', language: 'en' } });

		expect(props.revalidate).toBe(10);
	});

	it('links All button', async () => {
		loadSermons();

		const { getByRole } = await renderPage();

		expect(getByRole('link', { name: 'All' })).toHaveAttribute(
			'href',
			'/en/sermons/all/page/1'
		);
	});

	it('links All button using lang', async () => {
		loadSermons();

		const { getByRole } = await renderPage({ query: { language: 'es' } });

		expect(getByRole('link', { name: 'All' })).toHaveAttribute(
			'href',
			'/es/sermons/all/page/1'
		);
	});

	it('links Video button', async () => {
		loadSermons();

		const { getByRole } = await renderPage();

		expect(getByRole('link', { name: 'Video' })).toHaveAttribute(
			'href',
			'/en/sermons/video/page/1'
		);
	});

	it('links Audio button', async () => {
		loadSermons();

		const { getByRole } = await renderPage();

		expect(getByRole('link', { name: 'Audio' })).toHaveAttribute(
			'href',
			'/en/sermons/audio/page/1'
		);
	});

	it('does not include video paths', async () => {
		setSermonCount(1);

		const result = await getStaticPaths();

		expect(result.paths).not.toContain('/en/sermons/video/page/1');
	});

	it('calls createFeed', async () => {
		loadSermons();

		await renderPage();

		expect(fs.writeFileSync).toBeCalled();
	});

	it('provides path', async () => {
		loadSermons();

		await renderPage();

		const { calls } = (fs.writeFileSync as any).mock;

		expect(calls[0][0]).toEqual(`${PROJECT_ROOT}/public/en/sermons/all.xml`);
	});

	it('calls mikdirSync', async () => {
		loadSermons();

		await renderPage();

		expect(fs.mkdirSync).toBeCalled();
	});

	it('only renders feed once per language', async () => {
		loadSermons();

		await renderPage({ params: { i: '1', language: 'en' } });
		await renderPage({ params: { i: '2', language: 'en' } });

		expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
	});

	it('renders feeds for other languages', async () => {
		loadSermons();

		await renderPage({ params: { i: '1', language: 'es' } });

		const { calls } = (fs.writeFileSync as any).mock;

		expect(calls[0][0]).toEqual(`${PROJECT_ROOT}/public/es/sermons/all.xml`);
	});

	it('adds sermons to feed', async () => {
		const { addItem } = mockFeed();

		loadSermons({
			nodes: [
				{
					audioFiles: [
						{
							url: 'file_url',
						},
					],
				},
				{
					audioFiles: [
						{
							url: 'file_url',
						},
					],
				},
			],
		});

		await renderPage();

		expect(addItem).toBeCalledTimes(2);
	});

	it('titles feeds', async () => {
		mockFeed();
		loadSermons();

		await renderPage();

		const calls = (feed.Feed as any).mock.calls;

		expect(calls[0][0].title).toEqual('AudioVerse Recent Recordings: English');
	});
});
