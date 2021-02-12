import { getSermonCount } from '@lib/api';
import { GetSermonListStaticPropsDocument } from '@lib/generated/graphql';
import {
	buildRenderer,
	loadSermonListData,
	mockedFetchApi,
	setSermonCount,
} from '@lib/test/helpers';
import { getStaticPaths } from '@pages/[language]/sermons/video/page/[i]';
import SermonList, {
	getStaticProps,
} from '@pages/[language]/sermons/video/page/[i]';

jest.mock('@lib/api/getSermonCount');

const renderPage = buildRenderer(SermonList, getStaticProps, {
	i: '1',
	language: 'en',
});

describe('sermon video list page', () => {
	it('gets video count', async () => {
		await getStaticPaths();

		expect(getSermonCount).toBeCalledWith('ENGLISH', { hasVideo: true });
	});

	it('generates filtered pages', async () => {
		setSermonCount(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/sermons/video/page/1');
	});

	it('gets video filtered sermons', async () => {
		loadSermonListData();

		await renderPage({
			i: '1',
			language: 'en',
		});

		expect(mockedFetchApi).toBeCalledWith(GetSermonListStaticPropsDocument, {
			variables: {
				language: 'ENGLISH',
				hasVideo: true,
				first: 25,
				offset: 0,
			},
		});
	});

	it('links to feed', async () => {
		loadSermonListData();

		const { getByRole } = await renderPage();

		expect(getByRole('link', { name: 'RSS' })).toHaveAttribute(
			'href',
			'/en/sermons/video.xml'
		);
	});

	it('includes filter in pagination', async () => {
		loadSermonListData();

		const { getByText } = await renderPage();
		const link = getByText('1') as HTMLAnchorElement;

		expect(link.href).toContain('/en/sermons/video/page/1');
	});
});
