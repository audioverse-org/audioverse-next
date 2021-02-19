import { when } from 'jest-when';

import { ENTRIES_PER_PAGE } from '@lib/constants';
import createFeed from '@lib/createFeed';
import {
	GetConferenceDetailPageDataDocument,
	GetConferenceDetailPathsDataDocument,
} from '@lib/generated/graphql';
import { buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import ConferenceDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/conferences/[id]/page/[i]';

jest.mock('@lib/createFeed');

const renderPage = buildRenderer(ConferenceDetail, getStaticProps, {
	language: 'en',
	id: 'the_conference_id',
	i: '1',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetConferenceDetailPageDataDocument, expect.anything())
		.mockResolvedValue({
			conference: {
				id: 'the_conference_id',
				title: 'the_conference_title',
				startDate: '2007-12-19',
				endDate: '2007-12-23',
				sponsor: {
					id: 'the_sponsor_id',
					title: 'the_sponsor_title',
				},
				recordings: {
					nodes: [
						{
							id: 'the_recording_id',
							title: 'the_recording_title',
						},
					],
				},
			},
		});
}

describe('conference detail page', () => {
	it('renders', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetConferenceDetailPageDataDocument, {
			variables: {
				id: 'the_conference_id',
				offset: 0,
				first: ENTRIES_PER_PAGE,
			},
		});
	});

	it('lists recordings', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});

	it('renders page title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_conference_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetConferenceDetailPathsDataDocument, expect.anything())
			.mockResolvedValue({
				conferences: {
					nodes: [{ id: 'the_conference_id' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/conferences/the_conference_id/page/1');
	});

	it('renders sponsor link', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id'
		);
	});

	it('renders pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute(
			'href',
			'/en/conferences/the_conference_id/page/1'
		);
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetConferenceDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('renders conference dates', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('2007-12-19 — 2007-12-23')).toBeInTheDocument();
	});

	it('creates RSS feed', async () => {
		loadData();

		await getStaticProps({
			params: { language: 'en', id: 'the_conference_id', i: '1' },
		});

		expect(createFeed).toBeCalledWith({
			recordings: expect.any(Array),
			projectRelativePath: 'public/en/conferences/the_conference_id.xml',
			title: 'the_conference_title : AudioVerse',
		});
	});
});

// modify createFeed with better types to enforce required data on recording nodes
// generates rss feed
// links to rss feed
