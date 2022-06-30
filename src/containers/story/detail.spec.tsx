import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import { Language, RecordingContentType } from '@src/__generated__/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import Story, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/stories/[id]/[[...slugs]]';
import { screen } from '@testing-library/react';
import {
	GetStoryDetailDataDocument,
	GetStoryDetailStaticPathsDocument,
} from '@containers/story/__generated__/detail';

const renderPage = buildStaticRenderer(Story, getStaticProps);

function loadData() {
	when(fetchApi)
		.calledWith(GetStoryDetailDataDocument, expect.anything())
		.mockResolvedValue({
			story: {
				id: 'the_story_id',
				title: 'the_story_title',
				contentType: RecordingContentType.Story,
				language: Language.English,
				speakers: [],
				writers: [],
				attachments: [],
				imageWithFallback: { url: '' },
			},
		});
}

describe('story detail page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			id: 'the_story_id',
		});
	});

	it('renders', async () => {
		loadData();

		await renderPage();

		expect(fetchApi).toBeCalledWith(GetStoryDetailDataDocument, {
			variables: { id: 'the_story_id' },
		});
	});

	it('includes story title', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_story_title')).toBeInTheDocument();
	});

	it('generates paths', async () => {
		when(fetchApi)
			.calledWith(GetStoryDetailStaticPathsDocument, expect.anything())
			.mockResolvedValue({
				stories: {
					nodes: [
						{
							canonicalPath: '/the_story_path',
						},
					],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/the_story_path');
	});

	it('catches fetch error and renders 404', async () => {
		when(fetchApi)
			.calledWith(GetStoryDetailDataDocument, expect.anything())
			.mockRejectedValue('Oops!');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});
});
