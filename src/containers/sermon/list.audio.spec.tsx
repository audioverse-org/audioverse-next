import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import {
	GetSermonListPageDataDocument,
	GetSermonListPagePathsDataDocument,
	RecordingContentType,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import SermonList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/teachings/audio/page/[i]';
import { buildLoader } from '@lib/test/buildLoader';

const renderPage = buildStaticRenderer(SermonList, getStaticProps);

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

describe('sermon audio list page', () => {
	beforeEach(() => {
		__loadQuery({
			i: '1',
			language: 'en',
		});
	});

	it('gets audio count', async () => {
		await getStaticPaths();

		expect(fetchApi).toBeCalledWith(GetSermonListPagePathsDataDocument, {
			variables: { language: 'ENGLISH', hasVideo: false },
		});
	});

	it('gets audio filtered sermons', async () => {
		loadPageData();

		await renderPage();

		expect(fetchApi).toBeCalledWith(GetSermonListPageDataDocument, {
			variables: {
				language: 'ENGLISH',
				hasVideo: false,
				first: 12,
				offset: 0,
			},
		});
	});

	it('includes filter in pagination', async () => {
		loadPageData();

		const { getByText } = await renderPage();
		const link = getByText('1') as HTMLAnchorElement;

		expect(link.href).toContain('/en/teachings/audio/page/1');
	});
});
