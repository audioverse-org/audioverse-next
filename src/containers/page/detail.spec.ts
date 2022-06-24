import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import CustomPageDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/page/[id]/[[...slugs]]';
import { buildLoader } from '@lib/test/buildLoader';
import {
	GetCustomDetailPageDataDocument,
	GetCustomDetailPageStaticPathsDocument,
} from '@lib/generated/graphql';
import { screen } from '@testing-library/react';
import { __loadQuery } from 'next/router';

const renderPage = buildStaticRenderer(CustomPageDetail, getStaticProps);
const loadData = buildLoader(GetCustomDetailPageDataDocument, {
	page: {
		title: 'the_title',
		body: 'the_body',
	},
});
const loadStaticPathsData = buildLoader(
	GetCustomDetailPageStaticPathsDocument,
	{
		pages: {
			nodes: [
				{
					type: 'CUSTOM',
					canonicalPath: 'the_canonical_path',
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

		expect(paths).toContain('the_canonical_path');
	});

	it('skips non-custom pages', async () => {
		loadStaticPathsData({
			pages: {
				nodes: [
					{
						type: 'not_custom',
						canonicalPath: 'the_canonical_path'
					},
				],
			},
		});

		const { paths } = await getStaticPaths();

		expect(paths).not.toContain('the_canonical_path');
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
