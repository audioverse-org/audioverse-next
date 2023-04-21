import { screen } from '@testing-library/react';
import { __loadQuery } from 'next/router';

import { buildLoader } from '~lib/test/buildLoader';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import CustomPageDetail, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/page/[id]/[[...slugs]]';

import {
	GetCustomDetailPageDataDocument,
	GetCustomDetailPageStaticPathsDocument,
} from './__generated__/detail';

const renderPage = buildStaticRenderer(CustomPageDetail, getStaticProps);
const loadData = buildLoader(GetCustomDetailPageDataDocument, {
	page: {
		title: 'the_title',
		body: 'the_body',
		type: 'the_type',
		slug: 'the_slug',
	},
});
const loadStaticPathsData = buildLoader(
	GetCustomDetailPageStaticPathsDocument,
	{
		pages: {
			nodes: [
				{
					id: 'the_id',
					slug: 'the_slug',
					type: 'CUSTOM',
				},
			],
		},
	}
);

describe('CustomPageDetail', () => {
	beforeEach(() => {
		loadData();
		__loadQuery({
			id: 'the_id',
		});
	});

	it('renders correctly', async () => {
		await renderPage();

		expect(screen.getByText('the_title')).toBeInTheDocument();
	});

	it('generates paths', async () => {
		loadStaticPathsData();

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/page/the_id/the_slug');
	});

	it('skips non-custom pages', async () => {
		loadStaticPathsData({
			pages: {
				nodes: [
					{
						id: 'the_id',
						slug: 'the_slug',
						type: 'not_custom',
					},
				],
			},
		});

		const { paths } = await getStaticPaths();

		expect(paths).not.toContain('/en/page/the_id/the_slug');
	});

	it('includes body', async () => {
		await renderPage();

		expect(screen.getByText('the_body')).toBeInTheDocument();
	});

	it('dangerously renders html', async () => {
		loadData({
			page: {
				body: 'this is <b>bold</b>',
			},
		});

		await renderPage();

		expect(screen.getByText('bold')).toBeInTheDocument();
	});
});
