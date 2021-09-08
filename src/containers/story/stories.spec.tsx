import { when } from 'jest-when';

import {
	GetStoriesPageDataDocument,
	GetStoriesPathDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer, mockedFetchApi } from '@lib/test/helpers';
import Stories, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/stories/page/[i]';

const renderPage = buildStaticRenderer(Stories, getStaticProps);

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetStoriesPageDataDocument, expect.anything())
		.mockResolvedValue({
			stories: {
				nodes: [
					{
						id: 'the_story_id',
						title: 'the_story_title',
					},
				],
			},
		});
}

describe('stories list page', () => {
	it('renders', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(
			GetStoriesPageDataDocument,
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
			.calledWith(GetStoriesPathDataDocument, expect.anything())
			.mockResolvedValue({
				stories: {
					aggregate: {
						count: 1,
					},
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/stories/page/1');
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

		expect(link).toHaveAttribute('href', '/en/stories/page/1');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetStoriesPageDataDocument, expect.anything())
			.mockResolvedValue({
				stories: {
					nodes: [],
				},
			});

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('links stories properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		const link = getByText('the_story_title') as HTMLLinkElement;

		expect(link).toHaveAttribute('href', '/en/stories/albums/the_story_id');
	});
});
