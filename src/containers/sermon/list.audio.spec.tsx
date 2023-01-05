import { __loadQuery } from 'next/router';

import { loadSermonListData } from '@containers/sermon/list.all.spec';
import { fetchApi } from '@lib/api/fetchApi';
import {
	GetSermonListPageDataDocument,
	GetSermonListPagePathsDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import { getStaticPaths } from '@pages/[language]/teachings/audio/page/[i]';
import SermonList, {
	getStaticProps,
} from '@pages/[language]/teachings/audio/page/[i]';
import { beforeEach, describe, expect, it } from 'vitest';

const renderPage = buildStaticRenderer(SermonList, getStaticProps);

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
		loadSermonListData();

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
		loadSermonListData();

		const { getByText } = await renderPage();
		const link = getByText('1') as HTMLAnchorElement;

		expect(link.href).toContain('/en/teachings/audio/page/1');
	});
});
