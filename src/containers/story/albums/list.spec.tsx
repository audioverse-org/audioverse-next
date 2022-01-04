import { when } from 'jest-when';

import {
	GetStoriesAlbumsPageDataDocument,
	GetStoriesAlbumsPathDataDocument,
	SequenceContentType,
} from '@lib/generated/graphql';
import { buildStaticRenderer, mockedFetchApi } from '@lib/test/helpers';
import StoryAlbumsList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/stories/albums/page/[i]';

const renderPage = buildStaticRenderer(StoryAlbumsList, getStaticProps, {
	language: 'en',
});

function loadData() {
	when(mockedFetchApi)
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
	it('renders', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(
			GetStoriesAlbumsPageDataDocument,
			expect.anything()
		);
	});

	it('lists stories', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_story_title')).toBeInTheDocument();
	});

	it('generates paths', async () => {
		when(mockedFetchApi)
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

		const { getByText } = await renderPage();

		expect(getByText('Stories')).toBeInTheDocument();
	});

	it('includes pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		const link = getByText('1') as HTMLLinkElement;

		expect(link).toHaveAttribute('href', '/en/stories/albums');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetStoriesAlbumsPageDataDocument, expect.anything())
			.mockResolvedValue({
				storySeasons: {
					nodes: [],
				},
			});

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});

	it('links stories properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		const link = getByText('the_story_title') as HTMLLinkElement;

		expect(link.parentElement?.parentElement).toHaveAttribute(
			'href',
			'/the_story_path'
		);
	});
});
