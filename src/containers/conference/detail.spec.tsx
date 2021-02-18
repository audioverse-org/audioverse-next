import { buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import ConferenceDetail, {
	getStaticProps,
	getStaticPaths,
} from '@pages/[language]/conferences/[id]/page/[i]';
import {
	GetConferenceDetailPageDataDocument,
	GetConferenceDetailPathsDataDocument,
} from '@lib/generated/graphql';
import { ENTRIES_PER_PAGE } from '@lib/constants';
import { when } from 'jest-when';

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
				title: 'the_conference_title',
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
});

// generates rss feed
// links to rss feed
// renders 404 page
// renders pagination
// links pagination properly
// renders conference dates
