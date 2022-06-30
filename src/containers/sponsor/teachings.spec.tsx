import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import { RecordingContentType } from '@src/__generated__/graphql';
import { buildLoader } from '@lib/test/buildLoader';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import SponsorTeachings, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]/teachings/page/[i]';
import { screen } from '@testing-library/react';
import {
	GetSponsorTeachingsPageDataDocument,
	GetSponsorTeachingsPathsDataDocument,
} from '@containers/sponsor/__generated__/teachings';

const renderPage = buildStaticRenderer(SponsorTeachings, getStaticProps);

const loadData = buildLoader(GetSponsorTeachingsPageDataDocument, {
	sponsor: {
		id: 'the_sponsor_id',
		title: 'the_sponsor_title',
		canonicalPath: '/the_sponsor_path',
		image: {
			url: 'the_sponsor_image',
		},
		recordings: {
			nodes: [
				{
					id: 'the_recording_id',
					title: 'the_recording_title',
					recordingContentType: RecordingContentType.Sermon,
					canonicalPath: 'the_recording_path',
					persons: [],
				},
			],
			aggregate: {
				count: 100,
			},
		},
	},
});

describe('sponsor teachings page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			id: 'the_sponsor_id',
			i: '1',
		});
	});

	it('generates static paths', async () => {
		when(fetchApi)
			.calledWith(GetSponsorTeachingsPathsDataDocument, expect.anything())
			.mockResolvedValue({
				sponsors: {
					nodes: [{ id: 'the_sponsor_id' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/sponsors/the_sponsor_id/teachings/page/1');
	});

	it('lists recordings', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_recording_title')).toBeInTheDocument();
	});

	it('displays sponsor title', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('displays subpage title', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('All Teachings')).toBeInTheDocument();
	});

	it('links back to detail page', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('Back')).toHaveAttribute(
			'href',
			'/the_sponsor_path'
		);
	});

	it('links pagination properly', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('1')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id/teachings'
		);
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetSponsorTeachingsPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});

	it('displays sponsor image', async () => {
		loadData();

		await renderPage();

		expect(screen.getByAltText('the_sponsor_title')).toHaveAttribute(
			'src',
			'the_sponsor_image'
		);
	});

	it('skips image display if sponsor has none', async () => {
		loadData({
			data: {
				sponsor: {
					image: null as any,
				},
			},
		});

		await renderPage();

		expect(screen.queryByAltText('the_sponsor_title')).not.toBeInTheDocument();
	});
});
