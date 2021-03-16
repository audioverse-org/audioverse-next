import { when } from 'jest-when';

import {
	GetConferenceListPageDataDocument,
	GetConferenceListPathsDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer, mockedFetchApi } from '@lib/test/helpers';
import ConferenceList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/conferences/page/[i]';

const renderPage = buildStaticRenderer(ConferenceList, getStaticProps, {
	language: 'en',
	i: '1',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetConferenceListPageDataDocument, expect.anything())
		.mockResolvedValue({
			conferences: {
				nodes: [
					{
						id: 'the_conference_id',
						title: 'the_conference_title',
						imageWithFallback: {
							url: 'the_conference_image',
						},
						sponsor: {
							title: 'the_conference_sponsor',
						},
					},
				],
			},
		});
}

describe('conference list page', () => {
	it('renders', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(
			GetConferenceListPageDataDocument,
			expect.anything()
		);
	});

	it('lists conferences', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_conference_title')).toBeInTheDocument();
	});

	it('renders conference images', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_conference_title')).toHaveAttribute(
			'src',
			'the_conference_image'
		);
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetConferenceListPathsDataDocument, expect.anything())
			.mockResolvedValue({
				conferences: {
					aggregate: {
						count: 1,
					},
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/conferences/page/1');
	});

	it('displays sponsor titles', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_conference_sponsor')).toBeInTheDocument();
	});

	it('links entries', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_conference_title').parentElement).toHaveAttribute(
			'href',
			'/en/conferences/the_conference_id/page/1'
		);
	});

	it('renders pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute('href', '/en/conferences/page/1');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetConferenceListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('renders page title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Conferences')).toBeInTheDocument();
	});
});
