import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import { __loadQuery, useRouter } from 'next/router';

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
import { buildLoader } from '@lib/test/buildLoader';

jest.mock('next/head');

const renderPage = buildStaticRenderer(SermonList, getStaticProps);

const loadPathsData = buildLoader(GetSermonListPagePathsDataDocument, {
	sermons: {
		aggregate: {
			count: 0,
		},
	},
});

const loadPageData = buildLoader(GetSermonListPageDataDocument, {
	sermons: {
		nodes: [
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
			count: 100,
		},
	},
});

describe('sermons list page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			i: '1',
		});
	});

	it('generates static paths', async () => {
		loadPathsData({
			data: {
				sermons: {
					aggregate: {
						count: 1,
					},
				},
			},
		});

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/teachings/all/page/1');
	});

	it('generates in all languages', async () => {
		loadPathsData({
			data: {
				sermons: {
					aggregate: {
						count: 1,
					},
				},
			},
		});

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/teachings/all/page/1');
	});

	it('sets proper fallback strategy', async () => {
		const { fallback } = await getStaticPaths();

		expect(fallback).toBe('blocking');
	});

	it('generates all pages in language', async () => {
		loadPathsData({
			data: {
				sermons: {
					aggregate: {
						count: LIST_PRERENDER_LIMIT * ENTRIES_PER_PAGE,
					},
				},
			},
		});

		const result = await getStaticPaths();

		const expected = LIST_PRERENDER_LIMIT * Object.keys(LANGUAGES).length;
		expect(result.paths.length).toBe(expected);
	});

	it('uses language codes to get sermon counts', async () => {
		await getStaticPaths();

		expect(fetchApi).toBeCalledWith(GetSermonListPagePathsDataDocument, {
			variables: { language: 'ENGLISH', hasVideo: null },
		});
	});

	it('gets sermons for list page', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: undefined,
					},
				},
			},
		});

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
		loadPageData();

		await renderPage();

		expect(screen.getByText('the_sermon_title')).toBeInTheDocument();
	});

	it('renders 404 on api error', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: false });
		when(fetchApi)
			.calledWith(GetSermonListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});

	it('returns 404 on empty data', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: false });

		loadPageData({
			data: {
				sermons: {
					nodes: [],
				},
			},
			merge: false,
		});

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});

	it('includes pagination', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: undefined,
					},
				},
			},
		});

		await renderPage();

		expect(screen.getByText('1')).toBeInTheDocument();
	});

	it('links to last pagination page', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: 75,
					},
				},
			},
		});

		await renderPage();

		expect(screen.getByText('3')).toBeInTheDocument();
	});

	it('calculates pages using items per page', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: 36,
					},
				},
			},
		});

		__loadQuery({ i: '3', language: 'en' });

		await renderPage();

		expect(() => screen.getByText('4')).toThrow();
	});

	it('handles string page index', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: undefined,
					},
				},
			},
		});

		__loadQuery({ i: '3', language: 'en' });

		await expect(renderPage).not.toThrow();
	});

	it('links pagination properly', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: undefined,
					},
				},
			},
		});

		await renderPage();
		expect(screen.getByText('1')).toHaveAttribute(
			'href',
			'/en/teachings/all/page/1'
		);
	});

	it('revalidates static pages', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: undefined,
					},
				},
			},
		});

		const props = (await getStaticProps({
			params: { i: '2', language: 'en' },
		})) as any;

		expect(props.revalidate).toBe(3600);
	});

	it('links All button', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: undefined,
					},
				},
			},
		});

		await renderPage();

		userEvent.click(screen.getByText('Filter'));

		expect(screen.getByRole('link', { name: 'All' })).toHaveAttribute(
			'href',
			'/en/teachings/all/page/1'
		);
	});

	it('links All button using lang', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: undefined,
					},
				},
			},
		});
		__loadQuery({ language: 'es' });

		await renderPage();

		userEvent.click(await screen.findByText('Filtro'));

		expect(screen.getByRole('link', { name: 'Todo' })).toHaveAttribute(
			'href',
			'/es/teachings/all/page/1'
		);
	});

	it('links Video button', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: undefined,
					},
				},
			},
		});

		await renderPage();

		userEvent.click(screen.getByText('Filter'));

		expect(screen.getByRole('link', { name: 'Video' })).toHaveAttribute(
			'href',
			'/en/teachings/video/page/1'
		);
	});

	it('links Audio button', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: undefined,
					},
				},
			},
		});

		await renderPage();

		userEvent.click(screen.getByText('Filter'));

		expect(screen.getByRole('link', { name: 'Audio only' })).toHaveAttribute(
			'href',
			'/en/teachings/audio/page/1'
		);
	});

	it('does not include video paths', async () => {
		const result = await getStaticPaths();

		expect(result.paths).not.toContain('/en/teachings/video/page/1');
	});

	it('localizes pagination', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: undefined,
					},
				},
			},
		});
		__loadQuery({ language: 'es' });

		await renderPage();
		expect(screen.getByText('1')).toHaveAttribute(
			'href',
			'/es/teachings/all/page/1'
		);
	});

	it('sets rss head link', async () => {
		loadPageData({
			data: {
				sermons: {
					nodes: undefined,
					aggregate: {
						count: undefined,
					},
				},
			},
		});

		await renderPage();

		const head = screen.getByTestId('head');

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

		await renderPage();

		expect(screen.getByText('the_name')).toBeInTheDocument();
	});
});
