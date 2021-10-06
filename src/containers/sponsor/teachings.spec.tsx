import { when } from 'jest-when';

import {
	GetSponsorTeachingsPageDataDocument,
	GetSponsorTeachingsPathsDataDocument,
	RecordingContentType,
} from '@lib/generated/graphql';
import {
	buildLoader,
	buildStaticRenderer,
	mockedFetchApi,
} from '@lib/test/helpers';
import SponsorTeachings, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]/teachings/page/[i]';

const renderPage = buildStaticRenderer(SponsorTeachings, getStaticProps, {
	language: 'en',
	id: 'the_sponsor_id',
	i: '1',
});

const loadData = buildLoader(GetSponsorTeachingsPageDataDocument, {
	sponsor: {
		id: 'the_sponsor_id',
		title: 'the_sponsor_title',
		canonicalPath: '/the_sponsor_path',
		imageWithFallback: {
			url: 'the_sponsor_image',
		},
		recordings: {
			nodes: [
				{
					id: 'the_recording_id',
					title: 'the_recording_title',
					recordingContentType: RecordingContentType.Sermon,
					canonicalPath: 'the_recording_path',
					persons: [],
				},
			],
			aggregate: {
				count: 100,
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

		expect(getByText('All Teachings')).toBeInTheDocument();
	});

	it('links back to detail page', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Back')).toHaveAttribute('href', '/the_sponsor_path');
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
});
