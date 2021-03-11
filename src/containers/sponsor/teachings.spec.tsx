import { when } from 'jest-when';

import {
	GetSponsorTeachingsPageDataDocument,
	GetSponsorTeachingsPathsDataDocument,
} from '@lib/generated/graphql';
import { buildLoader, buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import writeFeedFile from '@lib/writeFeedFile';
import SponsorTeachings, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]/teachings/page/[i]';

jest.mock('@lib/writeFeedFile');

const renderPage = buildRenderer(SponsorTeachings, getStaticProps, {
	language: 'en',
	id: 'the_sponsor_id',
	i: '1',
});

const loadData = buildLoader(GetSponsorTeachingsPageDataDocument, {
	sponsor: {
		id: 'the_sponsor_id',
		title: 'the_sponsor_title',
		imageWithFallback: {
			url: 'the_sponsor_image',
		},
		recordings: {
			nodes: [{ id: 'the_recording_id', title: 'the_recording_title' }],
			aggregate: {
				count: 1,
			},
		},
	},
});

describe('sponsor teachings page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorTeachingsPathsDataDocument, expect.anything())
			.mockResolvedValue({
				sponsors: {
					nodes: [{ id: 'the_sponsor_id' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/sponsors/the_sponsor_id/teachings/page/1');
	});

	it('lists recordings', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});

	it('displays sponsor title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('displays subpage title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Teachings')).toBeInTheDocument();
	});

	it('links back to detail page', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id'
		);
	});

	it('links pagination properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id/teachings/page/1'
		);
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorTeachingsPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('displays sponsor image', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_sponsor_title')).toHaveAttribute(
			'src',
			'the_sponsor_image'
		);
	});

	it('skips image display if sponsor has none', async () => {
		loadData({
			sponsor: {
				imageWithFallback: {
					url: null as any,
				},
			},
		});

		const { queryByAltText } = await renderPage();

		expect(queryByAltText('the_sponsor_title')).not.toBeInTheDocument();
	});

	it('generates rss feed', async () => {
		const data = loadData();
		const params = { language: 'en', id: 'the_sponsor_id', i: '1' };

		await getStaticProps({ params });

		expect(writeFeedFile).toBeCalledWith({
			recordings: data.sponsor.recordings.nodes,
			projectRelativePath: 'public/en/sponsors/the_sponsor_id/teachings.xml',
			title: 'the_sponsor_title | AudioVerse English',
		});
	});

	it('only generates rss on page 1', async () => {
		loadData();

		const params = { language: 'en', id: 'the_sponsor_id', i: '2' };

		await getStaticProps({ params });

		expect(writeFeedFile).not.toBeCalled();
	});

	it('links to rss feed', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('RSS')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id/teachings.xml'
		);
	});
});
