import { when } from 'jest-when';

import {
	GetSponsorDetailPageDataDocument,
	GetSponsorDetailPathsDataDocument,
} from '@lib/generated/graphql';
import { buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import Sponsor, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]/page/[i]';

const renderPage = buildRenderer(Sponsor, getStaticProps, {
	language: 'en',
	id: 'the_sponsor_id',
	i: '1',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetSponsorDetailPageDataDocument, expect.anything())
		.mockResolvedValue({
			sponsor: {
				id: 'the_sponsor_id',
				title: 'the_sponsor_title',
				imageWithFallback: {
					url: 'the_sponsor_image',
				},
				recordings: {
					nodes: [
						{
							id: 'the_recording_id',
							title: 'the_recording_title',
						},
					],
					aggregate: {
						count: 1,
					},
				},
			},
		});
}

describe('sponsor detail page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('lists recordings', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorDetailPathsDataDocument, expect.anything())
			.mockResolvedValue({
				sponsors: {
					nodes: [{ id: 'the_sponsor_id' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/sponsors/the_sponsor_id/page/1');
	});

	it('displays sponsor title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toBeInTheDocument();
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
		when(mockedFetchApi)
			.calledWith(GetSponsorDetailPageDataDocument, expect.anything())
			.mockResolvedValue({
				sponsor: {
					title: 'the_sponsor_title',
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

		const { queryByAltText } = await renderPage();

		expect(queryByAltText('the_sponsor_title')).not.toBeInTheDocument();
	});

	it('properly links pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id/page/1'
		);
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});
});

// renders 404
