import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import { SequenceContentType } from '@src/__generated__/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import StoryAlbumsList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/stories/albums/page/[i]';
import { screen } from '@testing-library/react';
import {
	GetStoriesAlbumsPageDataDocument,
	GetStoriesAlbumsPathDataDocument,
} from '@containers/story/albums/__generated__/list';

const renderPage = buildStaticRenderer(StoryAlbumsList, getStaticProps);

function loadData() {
	when(fetchApi)
		.calledWith(GetStoriesAlbumsPageDataDocument, expect.anything())
		.mockResolvedValue({
			storySeasons: {
				nodes: [
					{
						id: 'the_story_id',
						title: 'the_story_title',
						canonicalPath: 'the_story_path',
						contentType: SequenceContentType.StorySeason,
						speakers: [],
						allRecordings: {
							aggregate: {
								count: 0,
							},
						},
					},
				],
			},
		});
}

describe('stories list page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
		});
	});

	it('renders', async () => {
		await renderPage();

		expect(fetchApi).toBeCalledWith(
			GetStoriesAlbumsPageDataDocument,
			expect.anything()
		);
	});

	it('lists stories', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_story_title')).toBeInTheDocument();
	});

	it('generates paths', async () => {
		when(fetchApi)
			.calledWith(GetStoriesAlbumsPathDataDocument, expect.anything())
			.mockResolvedValue({
				storySeasons: {
					aggregate: {
						count: 1,
					},
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/stories/albums/page/1');
	});

	it('includes page title', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('Stories')).toBeInTheDocument();
	});

	it('includes pagination', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('1')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadData();

		await renderPage();

		const link = screen.getByText('1') as HTMLLinkElement;

		expect(link).toHaveAttribute('href', '/en/stories/albums');
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetStoriesAlbumsPageDataDocument, expect.anything())
			.mockResolvedValue({
				storySeasons: {
					nodes: [],
				},
			});

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});

	it('links stories properly', async () => {
		loadData();

		await renderPage();

		expect(
			screen.getByRole('link', { name: /the_story_title/ })
		).toHaveAttribute('href', 'the_story_path');
	});
});
