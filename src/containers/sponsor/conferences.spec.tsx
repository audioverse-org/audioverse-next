import { when } from 'jest-when';

import {
	GetSponsorConferencesPageDataDocument,
	GetSponsorConferencesPathsDataDocument,
} from '@lib/generated/graphql';
import { buildLoader, buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import SponsorConferences, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]/conferences/page/[i]';

const renderPage = buildRenderer(SponsorConferences, getStaticProps, {
	language: 'en',
	id: 'the_sponsor_id',
	i: '1',
});

const loadData = buildLoader(GetSponsorConferencesPageDataDocument, {
	sponsor: {
		title: 'the_sponsor_title',
	},
	conferences: {
		nodes: [
			{
				id: 'the_conference_id',
				title: 'the_conference_title',
			},
		],
		aggregate: {
			count: 1,
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

		expect(getByText('the_sponsor_title')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id'
		);
	});

	it('renders page subtitle', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Conferences')).toBeInTheDocument();
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

		expect(getByText('404')).toBeInTheDocument();
	});
});

// renders 404
