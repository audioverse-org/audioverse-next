import { when } from 'jest-when';

import {
	GetStoryDetailPageDataDocument,
	GetStoryDetailPathsDataDocument,
} from '@lib/generated/graphql';
import { buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import Story, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/stories/[id]';

const renderPage = buildRenderer(Story, getStaticProps, {
	language: 'en',
	id: 'the_story_id',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetStoryDetailPageDataDocument, expect.anything())
		.mockResolvedValue({
			story: {
				id: 'the_story_id',
				title: 'the_story_title',
				videoStreams: [],
				audioStreams: [],
			},
		});
}

describe('story detail page', () => {
	it('renders', async () => {
		loadData();

		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetStoryDetailPageDataDocument, {
			variables: { id: 'the_story_id' },
		});
	});

	it('includes story title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_story_title')).toBeInTheDocument();
	});

	it('generates paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetStoryDetailPathsDataDocument, expect.anything())
			.mockResolvedValue({
				stories: {
					nodes: [
						{
							id: 'the_story_id',
						},
					],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/stories/the_story_id');
	});

	it('renders 404', async () => {
		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('catches fetch error and renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetStoryDetailPageDataDocument, expect.anything())
			.mockRejectedValue('Oops!');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});
});
