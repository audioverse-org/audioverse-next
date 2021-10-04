import { loadSermonListData } from '@containers/sermon/list.all.spec';
import {
	GetSermonListPageDataDocument,
	GetSermonListPagePathsDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer, mockedFetchApi } from '@lib/test/helpers';
import { getStaticPaths } from '@pages/[language]/teachings/audio/page/[i]';
import SermonList, {
	getStaticProps,
} from '@pages/[language]/teachings/audio/page/[i]';

const renderPage = buildStaticRenderer(SermonList, getStaticProps, {
	i: '1',
	language: 'en',
});

describe('sermon audio list page', () => {
	it('gets audio count', async () => {
		await getStaticPaths();

		expect(mockedFetchApi).toBeCalledWith(GetSermonListPagePathsDataDocument, {
			variables: { language: 'ENGLISH', hasVideo: false },
		});
	});

	it('gets audio filtered sermons', async () => {
		loadSermonListData();

		await renderPage({
			params: {
				i: '1',
				language: 'en',
			},
		});

		expect(mockedFetchApi).toBeCalledWith(GetSermonListPageDataDocument, {
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
