import { screen } from '@testing-library/react';

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
	});

	it('renders', async () => {
		await renderPage();

		expect(screen.getByText(topic.title)).toBeInTheDocument();
	});

	it('returns paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain(`/en/topics/page/1`);
	});
});
