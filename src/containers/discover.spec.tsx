import { waitFor } from '@testing-library/react';

import { storeRequest } from '@lib/api';
import {
	GetDiscoverPageDataDocument,
	GetDiscoverPageDataQuery,
} from '@lib/generated/graphql';
import { buildLoader, buildServerRenderer } from '@lib/test/helpers';
import Discover, { getServerSideProps } from '@pages/[language]/discover';

const renderPage = buildServerRenderer(Discover, getServerSideProps);
const loadData = buildLoader<GetDiscoverPageDataQuery>(
	GetDiscoverPageDataDocument,
	{
		sermons: {
			nodes: [
				{
					title: 'the_sermon_title',
					canonicalPath: 'the_sermon_path',
					persons: [],
				},
			],
		},
	}
);

describe('discover page', () => {
	it('stores request', async () => {
		await getServerSideProps({
			req: 'the_request',
			query: { language: 'en' },
		} as any);

		expect(storeRequest).toBeCalledWith('the_request');
	});

	it('renders titles', async () => {
		loadData();

		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('the_sermon_title')).toBeInTheDocument();
		});
	});
});
