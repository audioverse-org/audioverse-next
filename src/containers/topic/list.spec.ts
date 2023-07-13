import { screen } from '@testing-library/react';
import { __loadQuery } from 'next/router';

import {
	buildGetTopicListDataLoader,
	buildGetTopicListPathsDataLoader,
} from '~src/__generated__/loaders';
import { makeTopic } from '~src/__generated__/mock-data';
import { buildStaticRenderer } from '~src/lib/test/buildStaticRenderer';
import Topics, {
	getStaticPaths,
	getStaticProps,
} from '~src/pages/[language]/topics/page/[i]';

const topic = makeTopic();

const loadPageData = buildGetTopicListDataLoader({
	topics: {
		aggregate: {
			count: 1,
		},
		nodes: [topic],
	},
});

const loadPathsData = buildGetTopicListPathsDataLoader({
	topics: {
		aggregate: {
			count: 1,
		},
	},
});

const renderPage = buildStaticRenderer(Topics, getStaticProps);

describe('topic list page', () => {
	beforeEach(() => {
		loadPageData();
		loadPathsData();
		__loadQuery({
			i: '1',
			language: 'en',
		});
	});

	it('renders', async () => {
		await renderPage();

		expect(await screen.findByText(topic.title)).toBeInTheDocument();
	});

	it('returns paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain(`/en/topics/page/1`);
	});
});
