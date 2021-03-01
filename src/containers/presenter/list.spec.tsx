import { when } from 'jest-when';

import {
	GetPresenterListPageDataDocument,
	GetPresenterListPathsDataDocument,
} from '@lib/generated/graphql';
import { buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import Presenters, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/presenters/page/[i]';

const renderPage = buildRenderer(Presenters, getStaticProps, {
	language: 'en',
	i: '1',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetPresenterListPageDataDocument, expect.anything())
		.mockReturnValue({
			persons: {
				nodes: [
					{
						id: 'the_person_id',
						name: 'the_person_name',
						summary: 'the_person_summary',
						imageWithFallback: {
							url: 'the_person_image',
						},
					},
				],
			},
		});
}

describe('presenter list page', () => {
	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetPresenterListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('lists presenters', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_person_name')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute('href', '/en/presenters/page/1');
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetPresenterListPathsDataDocument, expect.anything())
			.mockResolvedValue({
				persons: {
					aggregate: {
						count: 1,
					},
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/presenters/page/1');
	});

	it('links presenters', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_person_name').parentElement).toHaveAttribute(
			'href',
			'/en/presenters/the_person_id'
		);
	});

	it('includes presenter images', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_person_name')).toHaveAttribute(
			'src',
			'the_person_image'
		);
	});

	it('includes summaries', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_person_summary')).toBeInTheDocument();
	});

	it('renders page title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Presenters')).toBeInTheDocument();
	});

	// TODO: Consider adding RSS feed
});
