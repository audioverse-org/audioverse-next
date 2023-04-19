import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import { useRouter } from 'next/router';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import {
	ENTRIES_PER_PAGE,
	LANGUAGES,
	LIST_PRERENDER_LIMIT,
} from '@lib/constants';
import {
	GetSermonListPageDataDocument,
	GetSermonListPagePathsDataDocument,
	RecordingContentType,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import SermonList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/teachings/all/page/[i]';

jest.mock('next/head');

const renderPage = buildStaticRenderer(SermonList, getStaticProps);

export function loadSermonListPagePathsData(count: number): void {
	when(fetchApi)
		.calledWith(GetSermonListPagePathsDataDocument, expect.anything())
		.mockResolvedValue({
			sermons: {
				aggregate: {
					count,
				},
			},
		});
}

export function loadSermonListData({
	nodes = undefined,
	count = undefined,
}: { nodes?: any[]; count?: number } = {}): void {
	(fetchApi as jest.Mock).mockResolvedValue({
		sermons: {
			nodes: nodes || [
				{
					id: 'the_sermon_id',
					title: 'the_sermon_title',
					canonicalPath: 'the_sermon_path',
					recordingContentType: RecordingContentType.Sermon,
					videoFiles: [],
					persons: [],
				},
			],
			aggregate: {
				count: count || 100,
			},
		},
	});
}

describe('sermons list page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			i: '1',
		});
	});

	it('can be rendered', async () => {
		loadSermonListData();

		await renderPage();
	});

	it('generates static paths', async () => {
		loadSermonListPagePathsData(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/teachings/all/page/1');
	});

	it('generates in all languages', async () => {
		loadSermonListPagePathsData(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/teachings/all/page/1');
	});

	it('sets proper fallback strategy', async () => {
		const { fallback } = await getStaticPaths();

		expect(fallback).toBe('blocking');
	});

	it('generates all pages in language', async () => {
		loadSermonListPagePathsData(LIST_PRERENDER_LIMIT * ENTRIES_PER_PAGE);

		const result = await getStaticPaths();
		const expected =
			LIST_PRERENDER_LIMIT *
			Object.values(LANGUAGES)
				.map((c) => c.base_urls)
				.flat().length;

		expect(result.paths.length).toBe(expected);
	});

	it('uses language codes to get sermon counts', async () => {
		await getStaticPaths();

		expect(fetchApi).toBeCalledWith(GetSermonListPagePathsDataDocument, {
			variables: { language: 'ENGLISH', hasVideo: null },
		});
	});

	it('gets sermons for list page', async () => {
		loadSermonListData();

		await getStaticProps({ params: { i: '2', language: 'en' } });

		await waitFor(() =>
			expect(fetchApi).toBeCalledWith(GetSermonListPageDataDocument, {
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
		when(fetchApi)
			.calledWith(GetSermonListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});

	it('returns 404 on empty data', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: false });
		loadSermonListData({ nodes: [] });

		await renderPage();

		expect(await screen.findByText('Sorry!')).toBeInTheDocument();
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
		loadSermonListData({ count: 36 });

		__loadQuery({ i: '3', language: 'en' });

		const { getByText } = await renderPage();

		expect(() => getByText('4')).toThrow();
	});

	it('handles string page index', async () => {
		loadSermonListData();

		__loadQuery({ i: '3', language: 'en' });

		await renderPage();
	});

	it('links pagination properly', async () => {
		loadSermonListData({
			count: ENTRIES_PER_PAGE * 2,
		});

		const { getByText } = await renderPage(),
			link = getByText('2') as HTMLAnchorElement;

		expect(link.href).toContain('/en/teachings/all/page/2');
	});

	it('revalidates static pages', async () => {
		loadSermonListData();

		const props = (await getStaticProps({
			params: { i: '2', language: 'en' },
		})) as any;

		expect(props.revalidate).toBe(3600);
	});

	it('links All button', async () => {
		loadSermonListData();

		const { getByRole, getByText } = await renderPage();

		userEvent.click(getByText('Filter'));

		expect(getByRole('link', { name: 'All' })).toHaveAttribute(
			'href',
			'/en/teachings/all'
		);
	});

	it('links All button using lang', async () => {
		loadSermonListData();
		__loadQuery({ language: 'es' });

		await renderPage();

		userEvent.click(await screen.findByText('Filtro'));

		expect(screen.getByRole('link', { name: 'Todo' })).toHaveAttribute(
			'href',
			'/es/teachings/all'
		);
	});

	it('links Video button', async () => {
		loadSermonListData();

		const { getByText } = await renderPage();

		userEvent.click(getByText('Filter'));

		const link = await screen.findByRole('link', { name: 'Video' });

		expect(link).toHaveAttribute('href', '/en/teachings/video');
	});

	it('links Audio button', async () => {
		loadSermonListData();

		const { getByText } = await renderPage();

		userEvent.click(getByText('Filter'));

		expect(
			await screen.findByRole('link', { name: 'Audio only' })
		).toHaveAttribute('href', '/en/teachings/audio');
	});

	it('does not include video paths', async () => {
		const result = await getStaticPaths();

		expect(result.paths).not.toContain('/en/teachings/video');
	});

	it('localizes pagination', async () => {
		loadSermonListData();
		__loadQuery({ language: 'es' });

		const { getByText } = await renderPage(),
			link = getByText('1') as HTMLAnchorElement;

		expect(link.href).toContain('/es/teachings/all');
	});

	it('sets rss head link', async () => {
		loadSermonListData();

		const { getByTestId } = await renderPage();

		const head = getByTestId('head');

		expect(head.innerHTML).toContain('/en/teachings/all/feed.xml');
	});

	it('includes speaker name', async () => {
		(fetchApi as jest.Mock).mockResolvedValue({
			sermons: {
				nodes: [
					{
						id: 'the_sermon_id',
						title: 'the_sermon_title',
						canonicalPath: 'the_sermon_path',
						recordingContentType: RecordingContentType.Sermon,
						persons: [
							{
								id: 'the_id',
								name: 'the_name',
								canonicalPath: 'the_path',
								imageWithFallback: {
									url: 'the_image_url',
								},
							},
						],
					},
				],
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('the_name')).toBeInTheDocument();
	});
});
