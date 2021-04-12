import { loadSermonListData } from '@containers/sermon/list.all.spec';
import {
	GetSermonListPagePathsDataDocument,
	GetSermonListStaticPropsDocument,
} from '@lib/generated/graphql';
import {
	buildStaticRenderer,
	loadRouter,
	mockedFetchApi,
} from '@lib/test/helpers';
import { getStaticPaths } from '@pages/[language]/sermons/audio/page/[i]';
import SermonList, {
	getStaticProps,
} from '@pages/[language]/sermons/audio/page/[i]';

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
			i: '1',
			language: 'en',
		});

		expect(mockedFetchApi).toBeCalledWith(GetSermonListStaticPropsDocument, {
			variables: {
				language: 'ENGLISH',
				hasVideo: false,
				first: 25,
				offset: 0,
			},
		});
	});

	it('links to feed in audio list page', async () => {
		mockedFetchApi.mockResolvedValue({
			sermons: {
				nodes: [
					{
						id: '1',
						title: 'the_sermon_title',
						videoFiles: [],
					},
				],
				aggregate: {
					count: 1,
				},
			},
		});

		loadRouter({ pathname: '/[language]/sermons/audio/page/[i]' });

		const { getByRole } = await renderPage();

		expect(getByRole('link', { name: 'RSS' })).toHaveAttribute(
			'href',
			'/en/sermons/audio.xml'
		);
	});

	it('includes filter in pagination', async () => {
		loadSermonListData();

		const { getByText } = await renderPage();
		const link = getByText('1') as HTMLAnchorElement;

		expect(link.href).toContain('/en/sermons/audio/page/1');
	});
});
