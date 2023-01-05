import { __loadQuery, __mockedRouter } from 'next/router';

import {
	loadSermonListData,
	loadSermonListPagePathsData,
} from '@/containers/sermon/list.all.spec';
import { fetchApi } from '@/lib/api/fetchApi';
import {
	GetSermonListPageDataDocument,
	GetSermonListPagePathsDataDocument,
} from '@/lib/generated/graphql';
import { buildStaticRenderer } from '@/lib/test/buildStaticRenderer';
import { getStaticPaths } from '@/pages/[language]/teachings/video/page/[i]';
import SermonList, {
	getStaticProps,
} from '@/pages/[language]/teachings/video/page/[i]';
import { beforeEach, describe, expect, it } from 'vitest';

const renderPage = buildStaticRenderer(SermonList, getStaticProps);

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
		loadSermonListPagePathsData(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/teachings/video/page/1');
	});

	it('gets video filtered sermons', async () => {
		__loadQuery({
			i: '1',
			language: 'en',
		});

		loadSermonListData();

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
		loadSermonListData();

		const { getByText } = await renderPage();
		const link = getByText('1') as HTMLAnchorElement;

		expect(link.href).toContain('/en/teachings/video/page/1');
	});
});
