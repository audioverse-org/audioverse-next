import { screen } from '@testing-library/react';

import Topics, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/topics';
import { buildGetTopicListDataLoader } from '~src/__generated__/loaders';
import { makeTopic } from '~src/__generated__/mock-data';
import { buildStaticRenderer } from '~src/lib/test/buildStaticRenderer';

const topic = makeTopic();

const loadPageData = buildGetTopicListDataLoader({
	topics: {
		nodes: [topic],
	},
});

const renderPage = buildStaticRenderer(Topics, getStaticProps);

describe('topic list page', () => {
	beforeEach(() => {
		loadPageData();
	});

	it('renders', async () => {
		await renderPage();

		expect(screen.getByText(topic.title)).toBeInTheDocument();
	});

	it('returns paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain(`/en/topics`);
	});
});
