import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { loadSermonListData } from '~containers/sermon/list.all.spec';
import { fetchApi } from '~lib/api/fetchApi';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import SermonList, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/teachings/audio/page/[i]';

import {
	GetSermonListPageDataDocument,
	GetSermonListPagePathsDataDocument,
} from './__generated__/list';

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

		expect(link.href).toContain('/en/teachings/audio');
	});

	it('renders 404', async () => {
		// Mock console for expected error
		const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
		const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

		when(fetchApi)
			.calledWith(GetSermonListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();

		consoleError.mockRestore();
		consoleLog.mockRestore();
	});
});
