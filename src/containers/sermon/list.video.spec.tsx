import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import { RecordingContentType } from '@src/__generated__/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import SermonList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/teachings/video/page/[i]';
import { buildLoader } from '@lib/test/buildLoader';
import { screen } from '@testing-library/react';
import {
	GetSermonListPageDataDocument,
	GetSermonListPagePathsDataDocument,
} from '@containers/sermon/__generated__/list';

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

describe('sermon video list page', () => {
	beforeEach(() => {
		__loadQuery({
			i: '1',
			language: 'en',
		});
	});

	it('gets video count', async () => {
		await getStaticPaths();

		expect(fetchApi).toBeCalledWith(GetSermonListPagePathsDataDocument, {
			variables: { language: 'ENGLISH', hasVideo: true },
		});
	});

	it('generates filtered pages', async () => {
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

		expect(result.paths).toContain('/es/teachings/video/page/1');
	});

	it('gets video filtered sermons', async () => {
		__loadQuery({
			i: '1',
			language: 'en',
		});

		loadPageData();

		await renderPage();

		expect(fetchApi).toBeCalledWith(GetSermonListPageDataDocument, {
			variables: {
				language: 'ENGLISH',
				hasVideo: true,
				first: 12,
				offset: 0,
			},
		});
	});

	it('includes filter in pagination', async () => {
		loadPageData();

		await renderPage();

		expect(screen.getByText('1')).toHaveAttribute(
			'href',
			'/en/teachings/video/page/1'
		);
	});
});
