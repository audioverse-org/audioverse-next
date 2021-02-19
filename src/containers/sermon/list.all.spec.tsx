import fs from 'fs';

import { waitFor } from '@testing-library/react';
import * as feed from 'feed';
import { when } from 'jest-when';
import { useRouter } from 'next/router';

import { ENTRIES_PER_PAGE, LANGUAGES, PROJECT_ROOT } from '@lib/constants';
import {
	GetSermonListPagePathsDataDocument,
	GetSermonListStaticPropsDocument,
} from '@lib/generated/graphql';
import {
	buildRenderer,
	loadSermonListData,
	mockedFetchApi,
	mockFeed,
} from '@lib/test/helpers';
import SermonList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sermons/all/page/[i]';

jest.mock('next/router');
jest.mock('fs');
jest.mock('next/head');
jest.mock('@lib/api/isPersonFavorited');

const renderPage = buildRenderer(SermonList, getStaticProps, {
	language: 'en',
	i: '1',
});

export function loadSermonListPagePathsData(count: number): void {
	when(mockedFetchApi)
		.calledWith(GetSermonListPagePathsDataDocument, expect.anything())
		.mockResolvedValue({
			sermons: {
				aggregate: {
					count,
				},
			},
		});
}

describe('sermons list page', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockFeed();
	});

	it('can be rendered', async () => {
		loadSermonListData();

		await renderPage();
	});

	it('generates static paths', async () => {
		loadSermonListPagePathsData(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/sermons/all/page/1');
	});

	it('generates in all languages', async () => {
		loadSermonListPagePathsData(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/sermons/all/page/1');
	});

	it('sets proper fallback strategy', async () => {
		const { fallback } = await getStaticPaths();

		expect(fallback).toBe(true);
	});

	it('generates all pages in language', async () => {
		loadSermonListPagePathsData(100 * ENTRIES_PER_PAGE);

		const result = await getStaticPaths();

		const expected = 100 * Object.keys(LANGUAGES).length;
		expect(result.paths.length).toBe(expected);
	});

	it('uses language codes to get sermon counts', async () => {
		await getStaticPaths();

		expect(mockedFetchApi).toBeCalledWith(GetSermonListPagePathsDataDocument, {
			variables: { language: 'ENGLISH', hasVideo: null },
		});
	});

	it('gets sermons for list page', async () => {
		loadSermonListData();

		await getStaticProps({ params: { i: '2', language: 'en' } });

		await waitFor(() =>
			expect(mockedFetchApi).toBeCalledWith(GetSermonListStaticPropsDocument, {
				variables: {
					language: 'ENGLISH',
					hasVideo: null,
					offset: ENTRIES_PER_PAGE,
					first: ENTRIES_PER_PAGE,
				},
			})
		);
	});

	it('displays sermons list', async () => {
		loadSermonListData();

		const { getByText } = await renderPage();

		expect(getByText('the_sermon_title')).toBeInTheDocument();
	});

	it('renders 404 on api error', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: false });
		when(mockedFetchApi)
			.calledWith(GetSermonListStaticPropsDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('returns 404 on empty data', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: false });
		loadSermonListData({ nodes: [] });

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('includes pagination', async () => {
		loadSermonListData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toBeInTheDocument();
	});

	it('links to last pagination page', async () => {
		loadSermonListData({ count: 75 });

		const { getByText } = await renderPage();

		expect(getByText('3')).toBeInTheDocument();
	});

	it('calculates pages using items per page', async () => {
		loadSermonListData({ count: 75 });

		const { getByText } = await renderPage({ i: '3', language: 'en' });

		expect(() => getByText('4')).toThrow();
	});

	it('handles string page index', async () => {
		loadSermonListData();

		await renderPage({ i: '3', language: 'en' });
	});

	it('links pagination properly', async () => {
		loadSermonListData();

		const { getByText } = await renderPage(),
			link = getByText('1') as HTMLAnchorElement;

		expect(link.href).toContain('/en/sermons/all/page/1');
	});

	it('revalidates static pages', async () => {
		loadSermonListData();

		const props = await getStaticProps({ params: { i: '2', language: 'en' } });

		expect(props.revalidate).toBe(10);
	});

	it('links All button', async () => {
		loadSermonListData();

		const { getByRole } = await renderPage();

		expect(getByRole('link', { name: 'All' })).toHaveAttribute(
			'href',
			'/en/sermons/all/page/1'
		);
	});

	it('links All button using lang', async () => {
		loadSermonListData();

		const { getByRole } = await renderPage({ language: 'es' });

		expect(getByRole('link', { name: 'All' })).toHaveAttribute(
			'href',
			'/es/sermons/all/page/1'
		);
	});

	it('links Video button', async () => {
		loadSermonListData();

		const { getByRole } = await renderPage();

		expect(getByRole('link', { name: 'Video' })).toHaveAttribute(
			'href',
			'/en/sermons/video/page/1'
		);
	});

	it('links Audio button', async () => {
		loadSermonListData();

		const { getByRole } = await renderPage();

		expect(getByRole('link', { name: 'Audio' })).toHaveAttribute(
			'href',
			'/en/sermons/audio/page/1'
		);
	});

	it('does not include video paths', async () => {
		const result = await getStaticPaths();

		expect(result.paths).not.toContain('/en/sermons/video/page/1');
	});

	it('calls createFeed', async () => {
		loadSermonListData();

		await renderPage();

		expect(fs.writeFileSync).toBeCalled();
	});

	it('provides path', async () => {
		loadSermonListData();

		await renderPage();

		const { calls } = (fs.writeFileSync as any).mock;

		expect(calls[0][0]).toEqual(`${PROJECT_ROOT}/public/en/sermons/all.xml`);
	});

	it('calls mikdirSync', async () => {
		loadSermonListData();

		await renderPage();

		expect(fs.mkdirSync).toBeCalled();
	});

	it('only renders feed once per language', async () => {
		loadSermonListData();

		await renderPage({ i: '1', language: 'en' });
		await renderPage({ i: '2', language: 'en' });

		expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
	});

	it('renders feeds for other languages', async () => {
		loadSermonListData();

		await renderPage({ i: '1', language: 'es' });

		const { calls } = (fs.writeFileSync as any).mock;

		expect(calls[0][0]).toEqual(`${PROJECT_ROOT}/public/es/sermons/all.xml`);
	});

	it('adds sermons to feed', async () => {
		const { addItem } = mockFeed();

		loadSermonListData({
			nodes: [
				{
					id: 'the_sermon_id_1',
					audioFiles: [
						{
							url: 'file_url',
						},
					],
				},
				{
					id: 'the_sermon_id_2',
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
		loadSermonListData();

		await renderPage();

		const calls = (feed.Feed as any).mock.calls;

		expect(calls[0][0].title).toEqual('AudioVerse Recent Recordings (English)');
	});

	it('translates feed titles', async () => {
		mockFeed();
		loadSermonListData();

		await renderPage({ i: '1', language: 'es' });

		const calls = (feed.Feed as any).mock.calls;

		expect(calls[0][0].title).toEqual(
			'Grabaciones Recientes de AudioVerse (Español)'
		);
	});

	it('includes feed link', async () => {
		loadSermonListData();

		const { getByRole } = await renderPage();

		expect(getByRole('link', { name: 'RSS' })).toBeInTheDocument();
	});

	it('links to feed', async () => {
		loadSermonListData();

		const { getByRole } = await renderPage();

		expect(getByRole('link', { name: 'RSS' })).toHaveAttribute(
			'href',
			'/en/sermons/all.xml'
		);
	});

	it('targets blank', async () => {
		loadSermonListData();

		const { getByRole } = await renderPage();

		expect(getByRole('link', { name: 'RSS' })).toHaveAttribute(
			'target',
			'_blank'
		);
	});

	it('localizes pagination', async () => {
		loadSermonListData();

		const { getByText } = await renderPage({ language: 'es' }),
			link = getByText('1') as HTMLAnchorElement;

		expect(link.href).toContain('/es/sermons/all/page/1');
	});

	it('sets rss head link', async () => {
		loadSermonListData();

		const { getByTestId } = await renderPage();

		const head = getByTestId('head');

		expect(head.innerHTML).toContain('/en/sermons/all.xml');
	});

	it('does not set title', async () => {
		loadSermonListData();

		const { getByTestId } = await renderPage();

		const head = getByTestId('head');

		expect(head.innerHTML).not.toContain('title');
	});

	it('includes format indicators', async () => {
		mockedFetchApi.mockResolvedValue({
			sermons: {
				nodes: [
					{
						id: 'the_sermon_id',
						title: 'the_sermon_title',
						audioFiles: [{}],
					},
				],
			},
		});

		const { getAllByText } = await renderPage();

		expect(getAllByText('Audio').length).toEqual(2);
	});

	it('includes video format indicator', async () => {
		mockedFetchApi.mockResolvedValue({
			sermons: {
				nodes: [
					{
						id: 'the_sermon_id',
						title: 'the_sermon_title',
						videoFiles: [{}],
					},
				],
			},
		});

		const { getAllByText } = await renderPage();

		expect(getAllByText('Video').length).toEqual(2);
	});

	it('uses speaker widgets', async () => {
		mockedFetchApi.mockResolvedValue({
			sermons: {
				nodes: [
					{
						id: 'the_sermon_id',
						title: 'the_sermon_title',
						persons: [
							{
								id: 'the_id',
								name: 'the_name',
								summary: 'the_summary',
							},
						],
					},
				],
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('the_summary')).toBeInTheDocument();
	});

	it('skips feed creation if invalid language', async () => {
		loadSermonListData();

		await renderPage({ i: '1', language: 'bad' });

		expect(fs.writeFileSync).not.toBeCalled();
	});
});
