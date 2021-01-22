import { when } from 'jest-when';

import { ENTRIES_PER_PAGE } from '@lib/constants';
import { GetTagDetailPageDataDocument } from '@lib/generated/graphql';
import { loadRouter, mockedFetchApi, renderWithIntl } from '@lib/test/helpers';
import TagDetail, {
	getStaticProps,
} from '@pages/[language]/tags/[slug]/page/[i]';

async function renderPage(parameters = {}) {
	const params = { slug: 'the_tag', language: 'en', i: '1', ...parameters };

	loadRouter({ query: params });

	const { props } = await getStaticProps({ params });

	return renderWithIntl(TagDetail, props);
}

describe('tag detail page', () => {
	it('can render', async () => {
		await renderPage();
	});

	it('gets recordings', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetTagDetailPageDataDocument, {
			variables: {
				language: 'ENGLISH',
				tagName: 'the_tag',
				first: ENTRIES_PER_PAGE,
				offset: 0,
			},
		});
	});

	it('sets offset', async () => {
		await renderPage({ i: '2' });

		expect(mockedFetchApi).toBeCalledWith(GetTagDetailPageDataDocument, {
			variables: {
				language: 'ENGLISH',
				tagName: 'the_tag',
				first: ENTRIES_PER_PAGE,
				offset: ENTRIES_PER_PAGE,
			},
		});
	});

	it('displays pagination', async () => {
		const { getByText } = await renderPage();

		expect(getByText('1')).toBeInTheDocument();
	});

	it('links pagination', async () => {
		const { getByText } = await renderPage();

		const link = getByText('1') as HTMLLinkElement;

		expect(link.href).toContain('/en/tags/the_tag/page/1');
	});

	it('displays recordings', async () => {
		when(mockedFetchApi)
			.calledWith(GetTagDetailPageDataDocument, expect.anything())
			.mockResolvedValue({
				recordings: {
					nodes: [
						{
							title: 'the_recording_title',
						},
					],
				},
			});

		const { getByText } = await renderPage();

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});

	// decodes slug for tagName query param
	// generates RSS feed
	// includes RSS feed
	// generates static paths
	// encodes tagName for static path slug
});
