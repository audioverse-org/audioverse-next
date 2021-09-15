import { when } from 'jest-when';
import React from 'react';

import { ENTRIES_PER_PAGE } from '@lib/constants';
import {
	GetTagDetailPageDataDocument,
	GetTagDetailPathsQueryDocument,
} from '@lib/generated/graphql';
import { loadRouter, mockedFetchApi, renderWithIntl } from '@lib/test/helpers';
import TagDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/tags/[slug]/page/[i]';

async function renderPage(parameters = {}) {
	const params = { slug: 'the_tag', language: 'en', i: '1', ...parameters };

	loadRouter({ query: params });

	const { props } = await getStaticProps({ params });

	return renderWithIntl(<TagDetail {...props} />);
}

function loadPageData() {
	when(mockedFetchApi)
		.calledWith(GetTagDetailPageDataDocument, expect.anything())
		.mockResolvedValue({
			recordings: {
				nodes: [
					{
						id: 'the_recording_id',
						title: 'the_recording_title',
						canonicalPath: 'the_recording_path',
					},
				],
			},
		});
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
		loadPageData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toBeInTheDocument();
	});

	it('links pagination', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		const link = getByText('1') as HTMLLinkElement;

		expect(link.href).toContain('/en/tags/the_tag/page/1');
	});

	it('displays recordings', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetTagDetailPathsQueryDocument, expect.anything())
			.mockResolvedValue({
				tags: {
					nodes: [
						{
							name: 'the_tag_name',
						},
					],
				},
			});

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/tags/the_tag_name/page/1');
	});

	it('encodes tag name in static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetTagDetailPathsQueryDocument, expect.anything())
			.mockResolvedValue({
				tags: {
					nodes: [
						{
							name: 'my : tag',
						},
					],
				},
			});

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/tags/my%20%3A%20tag/page/1');
	});

	it('decodes tag name', async () => {
		await renderPage({ slug: 'my%20%3A%20tag' });

		expect(mockedFetchApi).toBeCalledWith(GetTagDetailPageDataDocument, {
			variables: {
				language: 'ENGLISH',
				tagName: 'my : tag',
				first: ENTRIES_PER_PAGE,
				offset: 0,
			},
		});
	});
});
