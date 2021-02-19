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
});

// renders page title
// localizes page title >>
