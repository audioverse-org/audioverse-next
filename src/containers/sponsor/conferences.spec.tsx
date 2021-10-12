import { when } from 'jest-when';

import {
	GetSponsorConferencesPageDataDocument,
	GetSponsorConferencesPathsDataDocument,
} from '@lib/generated/graphql';
import {
	buildLoader,
	buildStaticRenderer,
	mockedFetchApi,
} from '@lib/test/helpers';
import SponsorConferences, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]/conferences/page/[i]';

const renderPage = buildStaticRenderer(SponsorConferences, getStaticProps, {
	language: 'en',
	id: 'the_sponsor_id',
	i: '1',
});

const loadData = buildLoader(GetSponsorConferencesPageDataDocument, {
	sponsor: {
		id: 'the_sponsor_id',
		title: 'the_sponsor_title',
		imageWithFallback: {
			url: 'sponsor_image',
		},
	},
	conferences: {
		nodes: [
			{
				id: 'the_conference_id',
				title: 'the_conference_title',
				canonicalPath: 'the_conference_path',
				allSequences: {
					aggregate: {
						count: 0,
					},
				},
			},
		],
		aggregate: {
			count: 100,
		},
	},
});

describe('sponsor conferences page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorConferencesPathsDataDocument, expect.anything())
			.mockResolvedValue({
				sponsors: {
					nodes: [
						{
							id: 'the_sponsor_id',
						},
					],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/sponsors/the_sponsor_id/conferences/page/1');
	});

	it('lists conferences', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_conference_title')).toBeInTheDocument();
	});

	it('renders sponsor title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('renders page subtitle', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('All Conferences')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id/conferences/page/1'
		);
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorConferencesPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});

// renders 404
