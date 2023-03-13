import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import {
	GetStoriesAlbumsPageDataDocument,
	GetStoriesAlbumsPathDataDocument,
	SequenceContentType,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import StoryAlbumsList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/stories/albums/page/[i]';
import { buildLoader } from '@lib/test/buildLoader';
import { screen } from '@testing-library/react';

const renderPage = buildStaticRenderer(StoryAlbumsList, getStaticProps);

const loadData = buildLoader(GetStoriesAlbumsPageDataDocument, {
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

describe('stories list page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
		});
		loadData();
	});

	it('lists stories', async () => {
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
		await renderPage();

		expect(screen.getByText('Stories')).toBeInTheDocument();
	});

	it('includes pagination', async () => {
		await renderPage();

		expect(screen.getByText('1')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		await renderPage();

		const link = screen.getByText('1') as HTMLLinkElement;

		expect(link).toHaveAttribute('href', '/en/stories/albums');
	});

	it('renders empty state message', async () => {
		loadData(
			{
				storySeasons: {
					nodes: [],
				},
			},
			{
				useDefaults: false,
			}
		);

		await renderPage();

		expect(screen.getByText('Nothing here!')).toBeInTheDocument();
	});

	it('links stories properly', async () => {
		await renderPage();

		const link = screen.getByText('the_story_title') as HTMLLinkElement;

		expect(link.parentElement?.parentElement).toHaveAttribute(
			'href',
			'the_story_path'
		);
	});
});
